import express from "express";
import getUsersList, {swGetUser} from './login-get.route'
import createTheUser, {swPostUser} from './login-post.route'
// here the our swagger info
export const swLoginRouter = {
    "/login": {
        "get": {
            ...swGetUser
        },
        "post": {
            ...swPostUser
        }
    }
}
// here the routes
const router = express.Router()
    .get('/', getUsersList)
    .post('/', createTheUser)
export default router