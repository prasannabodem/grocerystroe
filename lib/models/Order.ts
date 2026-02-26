import { ObjectId } from 'mongodb';
import { getDatabase } from '../mongodb';

export interface IOrderItem {
  productId: ObjectId;
  productName: string;
  price: number;
  quantity: number;
  unit: string;
}

export interface IOrder {
  _id?: ObjectId;
  userId?: ObjectId;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  items: IOrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  orderNotes?: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export class OrderModel {
  private static collectionName = 'orders';

  static async getCollection() {
    const db = await getDatabase();
    return db.collection<IOrder>(this.collectionName);
  }

  static async create(orderData: Omit<IOrder, '_id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<IOrder> {
    const collection = await this.getCollection();
    
    const order: Omit<IOrder, '_id'> = {
      ...orderData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(order as IOrder);
    return { ...order, _id: result.insertedId };
  }

  static async findById(id: string | ObjectId): Promise<IOrder | null> {
    const collection = await this.getCollection();
    const objectId = typeof id === 'string' ? new ObjectId(id) : id;
    return await collection.findOne({ _id: objectId });
  }

  static async findByUserId(userId: string | ObjectId): Promise<IOrder[]> {
    const collection = await this.getCollection();
    const objectId = typeof userId === 'string' ? new ObjectId(userId) : userId;
    return await collection.find({ userId: objectId }).sort({ createdAt: -1 }).toArray();
  }

  static async findByEmail(email: string): Promise<IOrder[]> {
    const collection = await this.getCollection();
    return await collection.find({ customerEmail: email }).sort({ createdAt: -1 }).toArray();
  }

  static async updateStatus(id: string | ObjectId, status: IOrder['status']): Promise<boolean> {
    const collection = await this.getCollection();
    const objectId = typeof id === 'string' ? new ObjectId(id) : id;
    
    const result = await collection.updateOne(
      { _id: objectId },
      { 
        $set: { 
          status,
          updatedAt: new Date()
        }
      }
    );

    return result.modifiedCount > 0;
  }

  static async findAll(limit?: number): Promise<IOrder[]> {
    const collection = await this.getCollection();
    const query = collection.find({}).sort({ createdAt: -1 });
    
    if (limit) {
      query.limit(limit);
    }
    
    return await query.toArray();
  }
}
