import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response_error.js"
import { createContactValidation, getContactValidation } from "../validation/contact_validation.js"
import { validate } from "../validation/validation.js"

const createContact = async(username, request) => {
    const contact = validate(createContactValidation, request)
    contact.username = username

    return await prismaClient.contact.create({
        data: contact,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })
}

const getContact = async(username, contactId) => {
    contactId = validate(getContactValidation, contactId)

    const contact = await prismaClient.contact.findFirst({
        where: {
            id: contactId,
            username: username
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })

    if (!contact) throw new ResponseError(404, "Contact is not found")

    return contact
}

export default {
    createContact,
    getContact
}