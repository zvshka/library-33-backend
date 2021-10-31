import express from "express";
import {swUserController, UserController} from "../../controllers/UserController";
// here the our swagger info
export const swUserRouter = {
    "/user/register": {
        "post": {
            ...swUserController.register
        }
    },
    "/user/login": {
        "post": {
            ...swUserController.login
        }
    },
    "/user/logout": {
        "post": {
            ...swUserController.logout
        }
    },
    "/user/refresh": {
        "get": {
            ...swUserController.refresh
        }
    }
}
// here the routes
const router = express.Router()
    .post("/login", UserController.login)
    .post("/register", UserController.registration)
    .post("/logout", UserController.logout)
    .get("/refresh", UserController.refresh)
export default router