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

export default {
    register,
    login,
    getUser
}