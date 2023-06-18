import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response_error.js"
import { createContactValidation, getContactValidation, updateContactValidation } from "../validation/contact_validation.js"
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

const updateContact = async(username, request) => {
    const updateRequest = validate(updateContactValidation, request)

    const contact = await prismaClient.contact.findFirst({
        where: {
            id: updateRequest.id,
            username: username
        }
    })

    if(!contact) throw new ResponseError(404, "Contact not found")

    return await prismaClient.contact.update({
        where: {
            id: contact.id,
        },
        data: {
            first_name: updateRequest.first_name,
            last_name: updateRequest.last_name,
            email: updateRequest.email,
            phone: updateRequest.phone
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone: true
        }
    })

}

export default {
    createContact,
    getContact,
    updateContact
}