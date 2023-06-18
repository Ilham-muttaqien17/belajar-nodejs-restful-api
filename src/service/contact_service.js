import { prismaClient } from "../app/database"
import { createContactValidation } from "../validation/contact_validation.js"
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

export default {
    createContact
}