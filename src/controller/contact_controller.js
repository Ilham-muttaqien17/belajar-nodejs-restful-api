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

const getContact = async(req, res , next) => {
    try {
        const { username } = req.user
        const contactId = req.params.contactId
        const result = await contactService.getContact(username, contactId)
        res.status(200).json({
            data: result
        })
    } catch(err) {
        next(err)
    }
}

const updateContact = async(req, res, next) => {
    try {
        const { username } = req.user 
        const contactId = req.params.contactId
        const request = req.body
        request.id = contactId
        
        const result = await contactService.updateContact(username, request)
        res.status(200).json({
            data: result
        })

    } catch(err) {
        next(err)
    }
}

export default {
    createContact,
    getContact,
    updateContact
}