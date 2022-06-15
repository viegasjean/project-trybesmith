import User from '../interfaces/Users';
import connection from '../models/connection';
import UserModel from '../models/User.model';

export default class UserService {
  public userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);
  }

  public async getAll(): Promise<User[]> {
    const users = await this.userModel.getAll();
    return users;
  }

  public create(user: User): Promise<User> {
    return this.userModel.create(user);
  }
}