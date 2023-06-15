import { prismaClient } from "../app/database.js";
import { ResponseError } from "../error/response_error.js";
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/user_validation.js";
import { validate } from "../validation/validation.js";
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

const register = async(request) => {
    const user = validate(registerUserValidation, request);

    const countUser = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if(countUser === 1) throw new ResponseError(400, "Username already exists");

    user.password = await bcrypt.hash(user.password, 10)

    return prismaClient.user.create({
        data: user,
        select: {
            username: true,
            name: true
        }
    })
}

const login = async(request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            password: true,

        }
    })

    if(!user) throw new ResponseError(401, "Username or password is invalid")

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)

    if(!isPasswordValid) throw new ResponseError(401, "Username or password is invalid")

    const token = uuid().toString()

    return await prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true
        }
    })
}

const getUser = async(username) => {
    username = validate(getUserValidation, username)

    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            name: true
        }
    })

    if(!user) throw new ResponseError(404, "User is not found")

    return user
}

const updateUser = async(request) => {
    const updateRequest = validate(updateUserValidation, request)

    const user = await prismaClient.user.findUnique({
        where: {
            username: updateRequest.username
        }
    })

    if(!user) throw new ResponseError(404, "User not found")

    const data = {}

    if(updateRequest.name) {
        data.name = updateRequest.name
    }

    if(updateRequest.password) {
        data.password = await bcrypt.hash(updateRequest.password, 10)
    }

    return await prismaClient.user.update({
        where: {
            username: user.username
        },
        data: data,
        select: {
            username: true,
            name: true
        }
    })
}

const logout = async(username) => {
    username = validate(getUserValidation, username)

    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        }
    })

    if(!user) throw new ResponseError(404, "User is not found")

    await prismaClient.user.update({
        where: {
            username: username
        },
        data: {
            token: null
        }
    })
}

export default {
    register,
    login,
    getUser,
    updateUser,
    logout
}