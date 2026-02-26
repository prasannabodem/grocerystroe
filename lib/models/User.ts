import { ObjectId } from 'mongodb';
import { getDatabase } from '../mongodb';
import bcrypt from 'bcryptjs';

export interface IUser {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  address?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class UserModel {
  private static collectionName = 'users';

  static async getCollection() {
    const db = await getDatabase();
    return db.collection<IUser>(this.collectionName);
  }

  static async create(userData: Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>): Promise<IUser> {
    const collection = await this.getCollection();
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const user: Omit<IUser, '_id'> = {
      ...userData,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(user as IUser);
    return { ...user, _id: result.insertedId };
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ email });
  }

  static async findById(id: string | ObjectId): Promise<IUser | null> {
    const collection = await this.getCollection();
    const objectId = typeof id === 'string' ? new ObjectId(id) : id;
    return await collection.findOne({ _id: objectId });
  }

  static async verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async updateById(id: string | ObjectId, updateData: Partial<IUser>): Promise<boolean> {
    const collection = await this.getCollection();
    const objectId = typeof id === 'string' ? new ObjectId(id) : id;
    
    const result = await collection.updateOne(
      { _id: objectId },
      { $set: { ...updateData, updatedAt: new Date() } }
    );

    return result.modifiedCount > 0;
  }
}
