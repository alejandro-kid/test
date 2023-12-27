import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../user.entity';

export interface IUserRepository {
  addUser(user: User): Promise<User>;
  getAllUsers(): Promise<User[]>;
  getOneUser(id: number): Promise<User>;
  updateUser(id: number, changes: UpdateUserDto): Promise<User>;
  deleteUser(id: number): Promise<User>;
}
