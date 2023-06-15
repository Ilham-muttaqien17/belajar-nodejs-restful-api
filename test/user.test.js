import supertest from 'supertest'
import { web } from '../src/app/web.js'
import { logger } from '../src/app/logging.js'
import { createTestUser, getTestUser, removeTestUser } from './test_util.js'
import bcrypt from 'bcrypt'

describe('POST /api/users', () => {

    afterEach(async() => {
        await removeTestUser()
    })

    it('should can register new user', async() => {
        const result = await supertest(web)
                        .post('/api/users')
                        .send({
                            username: "test",
                            password: "123123",
                            name: "test"
                        })

        logger.info(result.body)
        
        expect(result.status).toBe(201);
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("test");
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
                            username: "test",
                            password: "123123",
                            name: "test"
                        })
        
        expect(result.status).toBe(201);
        expect(result.body.data.username).toBe("test")
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web)
                        .post('/api/users')
                        .send({
                            username: "test",
                            password: "123123",
                            name: "test"
                        })

        logger.info(result.body)
        
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined()
    })
})

describe('POST /api/users/login', () => {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async() => {
        await removeTestUser()
    })

    it('should can login', async () => {
        const result = await supertest(web)
                        .post('/api/users/login')
                        .send({
                            username: "test",
                            password: "123123"
                        })
        logger.info(result.body);

        expect(result.status).toBe(200)
        expect(result.body.data.token).toBeDefined()
        expect(result.body.data.token).not.toBe("test")
    })

    it('should reject if request is invalid', async () => {
        let result = await supertest(web)
                            .post('/api/users/login')
                            .send({
                                username: "",
                                password: ""
                            })

        logger.info(result.body)

        expect(result.status).toBe(400)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject if username is not found', async() => {
        let result = await supertest(web)
                            .post('/api/users/login')
                            .send({
                                username: "tester",
                                password: "123123"
                            })
        logger.info(result.body)

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

    it('should reject if password is incorrect', async() => {
        let result = await supertest(web)
                            .post('/api/users/login')
                            .send({
                                username: "test",
                                password: "123321"
                            })
        logger.info(result.body)

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
})

describe('GET /api/users/current', () => {
    beforeEach(async() => {
        await createTestUser()
    })

    afterEach(async() => {
        await removeTestUser()
    })

    it('should can get current user', async() => {
        let result = await supertest(web)
                            .get('/api/users/current')
                            .set('Authorization', 'Bearer test')
        
        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test')
    })

    it('should reject if token is invalid', async() => {
        let result = await supertest(web)
                            .get('/api/users/current')
                            .set('Authorization', 'asd')
        
        logger.info(result.body)

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
})

describe('PATCH /api/users/current', () => {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can update user name and password', async() => {
        let result = await supertest(web)
                            .patch('/api/users/current')
                            .send({
                                name: "tester",
                                password: "123321"
                            })
                            .set('Authorization', 'Bearer test')
                            
        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('tester')

        const user = await getTestUser()
        expect(await bcrypt.compare("123321", user.password)).toBe(true)
    })

    it('should can update user name', async() => {
        let result = await supertest(web)
                            .patch('/api/users/current')
                            .send({
                                name: "tester",
                            })
                            .set('Authorization', 'Bearer test')
                            
        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('tester')
    })

    it('should can update user password', async() => {
        let result = await supertest(web)
                            .patch('/api/users/current')
                            .send({
                                password: "123321"
                            })
                            .set('Authorization', 'Bearer test')
                            
        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data.username).toBe('test')
        expect(result.body.data.name).toBe('test')

        const user = await getTestUser()
        expect(await bcrypt.compare("123321", user.password)).toBe(true)
    })

    it('should reject if user is not authorized', async() => {
        let result = await supertest(web)
                            .patch('/api/users/current')
                            .send({
                                name: "tester",
                                password: "123123"
                            })
                            
        logger.info(result.body)

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })

})

describe('DELETE /api/users/logout', () => {
    beforeEach(async () => {
        await createTestUser()
    })

    afterEach(async () => {
        await removeTestUser();
    })

    it('should can logout', async() => {
        const result = await supertest(web)
                                .delete('/api/users/logout')
                                .set('Authorization', 'Bearer test')
                        
        logger.info(result.body)

        expect(result.status).toBe(200)
        expect(result.body.data).toBe("OK")

        const user = await getTestUser()
        expect(user.token).toBe(null)
    })

    it('should reject if user is not authorized', async() => {
        const result = await supertest(web)
                                .delete('/api/users/logout')
                                .set('Authorization', 'Bearer asd')
                        
        logger.info(result.body)

        expect(result.status).toBe(401)
        expect(result.body.errors).toBeDefined()
    })
})