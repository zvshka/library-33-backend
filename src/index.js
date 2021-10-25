import express from "express"
import swagger from "./swagger.def";
import swaggerUI from "swagger-ui-express"
import loginRouter from './routes/login'

const app = express()
app.use(express.json())

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger))
app.use('/login', loginRouter)

app.listen(3001, () => console.log("Server is Up!"))