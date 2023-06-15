import userService from "../service/user_service.js"

const register = async(req, res, next) => {
    try {
        const result = await userService.register(req.body);
        res.status(201).json({
            data: result
        });
    } catch(err) {
        next(err);
    }
}

const login = async(req, res, next) => {
    try {
        const result = await userService.login(req.body)
        res.status(200).json({
            data: result
        })
    } catch(err) {
        next(err);
    }
}

const getUser = async(req, res, next) => {
    try {
        const { username } = req.user
        const result = await userService.getUser(username);
        res.status(200).json({
            data: result
        })
    } catch(err) {
        next(err)
    }
}

const updateUser = async(req, res, next) => {
    try {
        const { username } = req.user
        const request = req.body
        request.username = username
        const result = await userService.updateUser(request)
        res.status(200).json({
            data: result
        })
    } catch(err) {
        next(err)
    }
}

const logout = async(req, res, next) => {
    try {
        const { username } = req.user
        const result = await userService.logout(username)
        res.status(200).json({
            data: "OK"
        })
    } catch(err) {
        next(err)
    }
}

export default {
    register,
    login,
    getUser,
    updateUser,
    logout
}