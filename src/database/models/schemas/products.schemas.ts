import { ObjectId } from 'mongodb';

interface ProductType {
  _id?: ObjectId;
  model: string;
  category_id: ObjectId[];
  created_at?: Date;
  updated_at?: Date;
  description: string;
}

export class Product {
  _id: ObjectId;
  model: string;
  category_id: ObjectId[];
  created_at: Date;
  updated_at: Date;
  description: string;

  constructor(product: ProductType) {
    this._id = product._id || new ObjectId();
    this.model = product.model;
    this.category_id = product.category_id;
    this.created_at = product.created_at || new Date();
    this.updated_at = product.updated_at || new Date();
    this.description = product.description;
  }
}

interface ProductInstanceType {
  _id?: ObjectId;
  product_id: ObjectId;
  name: string;
  price: number;
  color: string;
  stock: number;
  created_at?: Date;
  updated_at?: Date;
}

export class ProductInstance {
  _id: ObjectId;
  product_id: ObjectId;
  name: string;
  price: number;
  color: string;
  stock: number;
  created_at: Date;
  updated_at: Date;

  constructor(productInstance: ProductInstanceType) {
    this._id = productInstance._id || new ObjectId();
    this.product_id = productInstance.product_id;
    this.name = productInstance.name;
    this.price = productInstance.price;
    this.color = productInstance.color;
    this.stock = productInstance.stock;
    this.created_at = productInstance.created_at || new Date();
    this.updated_at = productInstance.updated_at || new Date();
  }
}
