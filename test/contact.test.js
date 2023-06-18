import supertest from "supertest"
import { createTestContact, createTestUser, getTestContact, removeTestContact, removeTestUser } from "./test_util.js"
import { web } from "../src/app/web.js"
import { logger } from "../src/app/logging.js"
import e from "express"

describe('POST /api/contacts', () => {

    beforeEach(async() => {
        await createTestUser()
    })

    afterEach(async() => {
        await removeTestContact()
        await removeTestUser()
    })

    it('should can create contact', async() => {
        const result = await supertest(web)
                                .post('/api/contacts')
                                .send({
                                    first_name: "first",
                                    last_name: "contact",
                                    email: "first@gmail.com",
                                    phone: "08222"
                                })
                                .set('Authorization', 'Bearer test')
        
        logger.info(result.body)

        expect(result.status).toBe(201)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.first_name).toBe("first")
        expect(result.body.data.last_name).toBe("contact")
        expect(result.body.data.email).toBe("first@gmail.com")
        expect(result.body.data.phone).toBe("08222")
    })

    it('should reject if user is not authorized', async() => {
        const result = await supertest(web)
                                .post('/api/contacts')
                                .send({
                                    first_name: "first",
                                    last_name: "contact",
                                    email: "first@gmail.com",
                                    phone: "08222"
                                })
        
        logger.info(result.body)

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject if request is not valid', async() => {
        const result = await supertest(web)
                                .post('/api/contacts')
                                .send({
                                    first_name: "",
                                    last_name: "contact",
                                    email: "first.com",
                                    phone: "08222123123123123123123123"
                                })
                                .set('Authorization', 'Bearer test')
        
        logger.info(result.body)

        expect(result.status).toBe(400 )
        expect(result.body.errors).toBeDefined()
    })
})

describe('GET /api/contacts/:contactId', () => {

    beforeEach(async() => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async() => {
        await removeTestContact()
        await removeTestUser()
    })

    it('should can get contact', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
                            .get(`/api/contacts/${testContact.id}`)
                            .set('Authorization', 'Bearer test')

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.first_name).toBe(testContact.first_name)
        expect(result.body.data.last_name).toBe(testContact.last_name)
        expect(result.body.data.email).toBe(testContact.email)
        expect(result.body.data.phone).toBe(testContact.phone)
    })

    it('should reject if contact is not found', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
                            .get(`/api/contacts/${testContact.id + 1}`)
                            .set('Authorization', 'Bearer test')

        logger.info(result.body)

        expect(result.status).toBe(404)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject if user is not authorized', async () => {
        const testContact = await getTestContact()

        const result = await supertest(web)
                            .get(`/api/contacts/${testContact.id}`)

        logger.info(result.body)

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
})

describe('PUT /api/contacts/:contactId', () => {
    beforeEach(async() => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async() => {
        await removeTestContact()
        await removeTestUser()
    })

    it('should can update contact', async() => {
        const testContact = await getTestContact()

        const result = await supertest(web)
                            .put(`/api/contacts/${testContact.id}`)
                            .send({
                                first_name: "second",
                                last_name: "second",
                                email: "second@gmail.com",
                                phone: "08111"
                            })
                            .set('Authorization', 'Bearer test')

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.id).toBe(testContact.id)
        expect(result.body.data.first_name).toBe("second")
        expect(result.body.data.last_name).toBe("second")
        expect(result.body.data.email).toBe("second@gmail.com")
        expect(result.body.data.phone).toBe("08111")
    })

    it('should reject if user is not authorized', async() => {
        const testContact = await getTestContact()

        const result = await supertest(web)
                            .put(`/api/contacts/${testContact.id}`)
                            .send({
                                first_name: "second",
                                last_name: "second",
                                email: "second@gmail.com",
                                phone: "08111"
                            })

        logger.info(result.body)

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

    it('should return 404 if contact is not found', async() => {
        const testContact = await getTestContact()

        const result = await supertest(web)
                            .put(`/api/contacts/${testContact.id + 1}`)
                            .send({
                                first_name: "second",
                                last_name: "second",
                                email: "second@gmail.com",
                                phone: "08111"
                            })
                            .set('Authorization', 'Bearer test')

        logger.info(result.body)

        expect(result.status).toBe(404)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject if request in not valid', async() => {
        const testContact = await getTestContact()

        const result = await supertest(web)
                            .put(`/api/contacts/${testContact.id}`)
                            .send({
                                first_name: "",
                                last_name: "second",
                                email: "second",
                                phone: "08111123123123123123123"
                            })
                            .set('Authorization', 'Bearer test')

        logger.info(result.body)

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })
}) 

describe('DELETE /api/contacts/:contactId', () => {
    beforeEach(async() => {
        await createTestUser()
        await createTestContact()
    })

    afterEach(async() => {
        await removeTestContact()
        await removeTestUser()
    })

    it('should can delete contact', async() => {
        const testContact = await getTestContact()

        const result = await supertest(web)
                                .delete(`/api/contacts/${testContact.id}`)
                                .set('Authorization', 'Bearer test')

        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")
    })

    it('should reject if user is not authorized', async() => {
        const testContact = await getTestContact()

        const result = await supertest(web)
                                .delete(`/api/contacts/${testContact.id}`)

        logger.info(result.body)

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

    it('should return 404 if contact is not found', async() => {
        const testContact = await getTestContact()

        const result = await supertest(web)
                                .delete(`/api/contacts/${testContact.id + 1}`)
                                .set('Authorization', 'Bearer test')

        logger.info(result.body)

        expect(result.status).toBe(404)
        expect(result.body.errors).toBeDefined()
    })
})