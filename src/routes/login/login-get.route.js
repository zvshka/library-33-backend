export const swGetUser = {
    "summary": "Retrieve the list with all of the users",
    "tags": [
        "login"
    ],
    "responses": {
        "200": {
            "description": "Object with users info"
        }
    }
}
// the route
export default async (req, res) => {
    res.send('This is a login GET service')
}