import { ObjectId } from 'mongodb';

interface OrderType {
  _id?: ObjectId;
  user_id: ObjectId;
  created_at?: Date;
  updated_at?: Date;
}

export class Order {
  _id: ObjectId;
  user_id: ObjectId;
  created_at: Date;
  updated_at: Date;

  constructor(order: OrderType) {
    this._id = order._id || new ObjectId();
    this.user_id = order.user_id;
    this.created_at = order.created_at || new Date();
    this.updated_at = order.updated_at || new Date();
  }
}

interface OrderItemType {
  _id?: ObjectId;
  order_id: ObjectId;
  product_id: ObjectId;
  quantity: number;
  create_at?: Date;
  updated_at?: Date;
}

export class OrderItem {
  _id: ObjectId;
  order_id: ObjectId;
  product_id: ObjectId;
  quantity: number;
  created_at: Date;
  updated_at: Date;

  constructor(orderItem: OrderItemType) {
    this._id = orderItem._id || new ObjectId();
    this.order_id = orderItem.order_id;
    this.product_id = orderItem.product_id;
    this.quantity = orderItem.quantity;
    this.created_at = orderItem.create_at || new Date();
    this.updated_at = orderItem.updated_at || new Date();
  }
}