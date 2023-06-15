import { prismaClient } from "../app/database.js"

export const authMiddleware = async(req, res, next) => {
    let token = req.get("Authorization")
    if(!token) {
        return res.status(401).json({
            errors: "Unauthorized"
        }).end()
    }

    token = token.split(" ")

    if(token[0] !== "Bearer") {
        return res.status(401).json({
            errors: "Unauthorized"
        }).end()
    }

    const user = await prismaClient.user.findFirst({
        where: {
            token: token[1]
        }
    })

    if(!user) {
        return res.status(401).json({
            errors: "Unauthorized"
        }).end()
    } else {
        req.user = user;
        next()
    } 

}