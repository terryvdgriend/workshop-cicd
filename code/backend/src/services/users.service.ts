import { CreateUserDto } from '../dtos/users.dto';
import HttpException from '../exceptions/HttpException';
import { User } from '../interfaces/users.interface';
import  { userModel } from '../models/users.model';
import { isEmptyObject } from '../utils/util';

interface UserService {
  findAllUser(): Promise<User[]>;
  findUserById(userId: string): Promise<User>;
  createUser(userData: CreateUserDto): Promise<User>;
  updateUser(userId: string, userData: User): Promise<User>;
  deleteUserData(userId: string): Promise<User>;
}

class UserService {
  private users = userModel;

  public async findAllUser(): Promise<User[]> {
    return this.users;
  }

  public async findUserById(userId: string): Promise<User> {
    const findUser =  this.users.find(user => user._id === userId);
    if (findUser) return findUser;
    throw new HttpException(409, "You're not user");
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");
    const createUserData = { _id: `${this.users.length + 1}`, ...userData };
    this.users = this.users.concat(createUserData);
    return createUserData;
  }

  public async updateUser(userId: string, userData: User): Promise<User> {
    if (isEmptyObject(userData)) throw new HttpException(400, "You're not userData");

    const findUser =  this.users.find(user => user._id === userId);
    if (!findUser) throw new HttpException(409, "You're not user");

    const newUsers: User[] = this.users.filter(user => user !== findUser);

    const updatedUser = { _id: findUser._id, ...userData };

    this.users = newUsers.concat(updatedUser);

    return updatedUser;
  }

  public async deleteUserData(userId: string): Promise<User> {
    const findUser =  this.users.find(user => user._id === userId);
    if (!findUser) throw new HttpException(409, "You're not user");
    this.users = this.users.filter(user => user !== findUser);

    return findUser;
  }
}

export default UserService;
