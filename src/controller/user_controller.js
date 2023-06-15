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

export default {
    register
}