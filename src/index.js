import express from "express"
import swagger from "./swagger.def";
import swaggerUI from "swagger-ui-express"
import userRouter from './routes/user'
import usersRouter from './routes/users'

const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger))
app.use('/user', userRouter)
app.use('/users', usersRouter)

app.listen(3001, () => console.log("Server is Up!"))