import supertest from 'supertest'
import { prismaClient } from '../src/app/database.js'
import { web } from '../src/app/web.js'
import { logger } from '../src/app/logging.js'

describe('POST /api/users', () => {

    afterEach(async() => {
        await prismaClient.user.deleteMany({
            where: {
                username: "tester"
            }
        })
    })

    it('should can register new user', async() => {
        const result = await supertest(web)
                        .post('/api/users')
                        .send({
                            username: "tester",
                            password: "test123",
                            name: "Tester"
                        })

        logger.info(result.body)
        
        expect(result.status).toBe(201);
        expect(result.body.data.username).toBe("tester")
        expect(result.body.data.name).toBe("Tester");
        expect(result.body.data.password).toBeUndefined();
    })

    it('should reject if request is invalid', async() => {
        const result = await supertest(web)
                        .post('/api/users')
                        .send({
                            username: "",
                            password: "",
                            name: ""
                        })
        
        logger.info(result.body)
        
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined()
    })

    it('should reject if username already registered', async() => {
        let result = await supertest(web)
                        .post('/api/users')
                        .send({
                            username: "tester",
                            password: "test123",
                            name: "Tester"
                        })
        
        expect(result.status).toBe(201);
        expect(result.body.data.username).toBe("tester")
        expect(result.body.data.name).toBe("Tester");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
                        .post('/api/users')
                        .send({
                            username: "tester",
                            password: "test123",
                            name: "Tester"
                        })

        logger.info(result.body)
        
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined()
    })
})