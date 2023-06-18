import contactService from '../service/contact_service.js'

const createContact = async(req, res, next) => {
    try {
        const { username } = req.user 
        const request = req.body
        const result = await contactService.createContact(username, request)
        res.status(201).json({
            data: result
        })
    } catch(err) {
        next(err)
    }
}

export default {
    createContact
}