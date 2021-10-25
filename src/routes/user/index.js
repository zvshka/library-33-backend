import express from "express";
import getUsersList, {swGetUser} from './user-get.route'
import createTheUser, {swPostUser} from './user-post.route'
// here the our swagger info
export const swUserRouter = {
    "/user": {
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