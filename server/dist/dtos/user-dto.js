"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    constructor(model) {
        this.email = model.email;
        this.id = model._id.toString();
        this.isActivated = model.isActivated;
    }
}
exports.UserDto = UserDto;
//# sourceMappingURL=user-dto.js.map