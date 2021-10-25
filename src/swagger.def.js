import {swUserRouter} from './routes/user'
import {swUsersRouter} from './routes/users'
const swagger = {
    openapi: '3.0.0',
    info: {
        title: 'Express API',
        version: '1.0.0',
        description: 'The REST API test service'
    },
    servers: [
        {
            url: 'http://localhost:3001',
            description: 'Development server'
        }
    ],
    paths: {
        ...swUserRouter,
        ...swUsersRouter
    }
}
export default swagger