import prisma from "../../lib/prisma";

export const swGetUsers = {
    "summary": "Retrieve the list with all of the users",
    "tags": [
        "users"
    ],
    "responses": {
        "200": {
            "description": "Object with users info"
        }
    }
}
// the route
export default async (req, res) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            Role: true
        },
    })
    res.send(users)
}