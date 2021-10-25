import schema, {joiSchema} from './user.spec/user.schema'
import prisma from "../../lib/prisma";
export const swPostUser = {
    "summary": "Create the new user",
    "tags": [
        "User"
    ],
    "requestBody": {
        "content": {
            "application/json": {
                "schema": {
                    ...schema
                }
            }
        }
    },
    "responses": {
        "200": {
            "description": "User created"
        },
        "default": {
            "description": "Error message"
        }
    }
}
export default async (req, res) => {
    try {
        await joiSchema.validateAsync(req.body)
        const user = await prisma.user.create({
            data: req.body,
            include: {
                role: true
            }
        })
        res.send(user)
    } catch(err) {
        res.send(err)
    }
}