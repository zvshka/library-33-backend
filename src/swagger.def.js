import {swUserRouter} from './routes/user'

const swagger = {
    openapi: '3.0.0',
    info: {
        title: 'Library 33 API',
        version: '1.0.0',
        description: 'The REST API test service'
    },
    servers: [
        {
            url: 'http://localhost:3001',
            description: 'Development server'
        }
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
    security: {
        bearerAuth: []
    },
    paths: {
        ...swUserRouter,
    }
}
export default swagger