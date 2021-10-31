import express from "express"
import swagger from "./swagger.def";
import swaggerUI from "swagger-ui-express"
import userRouter from './routes/user'
import cookieParser from "cookie-parser"
import prisma from "./lib/prisma";
import ErrorMiddleware from "./exceptions/ErrorMiddleware";

const app = express()
app.use(express.json())
    .use(cookieParser())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger))
app.use('/user', userRouter)
app.use(ErrorMiddleware)
try {
    app.listen(3001, () => console.log("Server is Up!"))
} catch (e) {
    console.log(e)
}