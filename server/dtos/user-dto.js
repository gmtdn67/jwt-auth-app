module.exports = class UserDto {
    email;
    id;
    isaActivated;

    constructor(model) {
        this.email = model.email
        this.id = model._id
        this.isaActivated = model.isaActivated
}
}