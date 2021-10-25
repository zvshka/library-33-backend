export const swGetUser = {
    "summary": "Retrieve the list with all of the users",
    "tags": [
        "User"
    ],
    "responses": {
        "200": {
            "description": "Object with user info"
        }
    }
}
// the route
export default async (req, res) => {
    res.send("TODO find by id/username")
}