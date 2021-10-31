export default class UserDTO {
    id;
    name;
    email;
    firstName;
    lastName;
    constructor({lastName, name, email, id, firstName}) {
        this.id = id
        this.name = name
        this.email = email
        this.firstName = firstName
        this.lastName = lastName
    }
}