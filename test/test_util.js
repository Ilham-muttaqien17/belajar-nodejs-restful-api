import { prismaClient } from "../src/app/database.js"
import bcrypt from 'bcrypt'

const removeTestUser = async() => {
    await prismaClient.user.deleteMany({
        where: {
            username: "test"
        }
    })
}

const createTestUser = async() => {
    await prismaClient.user.create({
        data: {
            username: "test",
            password: await bcrypt.hash("123123", 10),
            name: "test",
            token: "test"
        }
    })
}

const getTestUser = async() => {
    return prismaClient.user.findUnique({
        where: {
            username: "test"
        }
    })
}

const removeTestContact = async() => {
    await prismaClient.contact.deleteMany({
        where: {
            username: "test"
        }
    })
}

const createTestContact = async() => {
    await prismaClient.contact.create({
        data: {
            first_name: "test",
            last_name: "contact",
            email: "test@gmail.com",
            phone: "0822",
            username: "test"
        },
        select: {
            id: true
        }
    })
}

const getTestContact = async() => {
    return await prismaClient.contact.findFirst({
        where: {
            username: "test"
        }
    })
}

export {
    removeTestUser,
    createTestUser,
    getTestUser,
    removeTestContact,
    createTestContact,
    getTestContact
}