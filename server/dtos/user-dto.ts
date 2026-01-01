import { IUser, IUserDto } from '../types';

export class UserDto implements IUserDto {
  email: string;
  id: string;
  isActivated: boolean;

  constructor(model: IUser) {
    this.email = model.email;
    this.id = model._id.toString();
    this.isActivated = model.isActivated;
  }
}

