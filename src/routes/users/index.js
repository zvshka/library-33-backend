import express from "express";
import getUsersList, {swGetUsers} from './users-get.route'

// here the our swagger info
export const swUsersRouter = {
    "/users": {
        "get": {
            ...swGetUsers
        },
    }
}
// here the routes
const router = express.Router()
    .get('/', getUsersList)
export default router