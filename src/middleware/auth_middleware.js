import { prismaClient } from "../app/database"

export const authMiddleware = async(req, res, next) => {
    const token = req.get("Authorization").split(" ")[1]
    if(!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end()
    }

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