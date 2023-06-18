import supertest from "supertest"
import { createTestUser, removeTestContact, removeTestUser } from "./test_util.js"
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