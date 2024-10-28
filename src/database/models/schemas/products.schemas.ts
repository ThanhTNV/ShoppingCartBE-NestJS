import { ObjectId } from 'mongodb';

interface ProductType {
  _id?: ObjectId;
  name: string;
  description: string;
  price: number;
  quantity: number;
  created_at?: Date;
  updated_at?: Date;
}

export class Product {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;

  constructor(product: ProductType) {
    this._id = product._id || new ObjectId();
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.quantity = product.quantity;
    this.created_at = product.created_at || new Date();
    this.updated_at = product.updated_at || new Date();
  }
}
