import { ObjectId } from "mongodb";
import { getDatabase } from "../mongodb";

export interface IProduct {
  _id?: ObjectId;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  unit: string;
  stock: number;
  featured?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductModel {
  private static collectionName = "products";

  static async getCollection() {
    const db = await getDatabase();
    return db.collection<IProduct>(this.collectionName);
  }

  static async create(
    productData: Omit<IProduct, "_id" | "createdAt" | "updatedAt">,
  ): Promise<IProduct> {
    const collection = await this.getCollection();

    const product: Omit<IProduct, "_id"> = {
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(product as IProduct);
    return { ...product, _id: result.insertedId };
  }

  static async findAll(filters?: {
    category?: string;
    featured?: boolean;
  }): Promise<IProduct[]> {
    const collection = await this.getCollection();
    const query: any = {};

    if (filters?.category) {
      query.category = filters.category;
    }
    if (filters?.featured !== undefined) {
      query.featured = filters.featured;
    }

    return await collection.find(query).toArray();
  }

  static async findById(id: string | ObjectId): Promise<IProduct | null> {
    const collection = await this.getCollection();
    const objectId = typeof id === "string" ? new ObjectId(id) : id;
    return await collection.findOne({ _id: objectId });
  }

  static async findByCategory(category: string): Promise<IProduct[]> {
    const collection = await this.getCollection();
    return await collection.find({ category }).toArray();
  }

  static async updateStock(
    id: string | ObjectId,
    quantity: number,
  ): Promise<boolean> {
    const collection = await this.getCollection();
    const objectId = typeof id === "string" ? new ObjectId(id) : id;

    const result = await collection.updateOne(
      { _id: objectId },
      {
        $inc: { stock: -quantity },
        $set: { updatedAt: new Date() },
      },
    );

    return result.modifiedCount > 0;
  }

  static async getCategories(): Promise<string[]> {
    const collection = await this.getCollection();
    return await collection.distinct("category");
  }
}
