import { Pool, ResultSetHeader } from 'mysql2/promise';
import User from '../interfaces/Users';

const enum QUERY {
  GETALL = 'SELECT * FROM Trybesmith.Users',
  GET_USER = 'SELECT * FROM Trybesmith.Users WHERE username = ? AND password = ?',
  CREATE = 'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
  UPDATE = 'UPDATE Users SET name = ?, email = ?, password = ? WHERE id = ?',
  REMOVE = 'DELETE FROM Users WHERE id = ?',
}

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<User[]> {
    const [users] = await this.connection.execute(QUERY.GETALL);
    return users as User[];
  }

  public async getUser({ username, password } : User): Promise<User[]> {
    const [users] = await this.connection.execute(QUERY.GET_USER, [username, password]);
    console.log('ASDFASDFASD', users);
    return users as User[];
  }

  public async create(user: User) {
    const { username, classe, level, password } = user;
    const [{ insertId: id }] = await this.connection
      .execute<ResultSetHeader>(QUERY.CREATE, [username, classe, level, password]);

    return {
      id,
      ...user,
    };
  }
}