import { prismaClient } from "../app/database.js"

export const authMiddleware = async(req, res, next) => {
    let token = req.get("Authorization")
    if(!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end()
        return;
    }

    token = token.split(" ")[1]

    const user = await prismaClient.user.findFirst({
        where: {
            token: token
        }
    })

    if(!user) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end()
    } else {
        req.user = user;
        next()
    } 

}