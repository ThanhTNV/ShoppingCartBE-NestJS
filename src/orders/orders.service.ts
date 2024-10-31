import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { DatabaseService } from 'src/database/database.service';
import { CreateOrderDto, CreateOrderItemDto } from './dto/create-order.dto';
import { Order, OrderItem } from 'src/database/models/schemas/orders.schemas';
import { UpdateOrderDto, UpdateOrderItemDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getOrders() {
    return await this.databaseService.orders.find().toArray();
  }

  async getOrder(id: string) {
    return await this.databaseService.orders.findOne({ _id: new ObjectId(id) });
  }

  async createOrder(order: CreateOrderDto) {
    return await this.databaseService.orders.insertOne(
      new Order({
        user_id: new ObjectId(order.user_id),
      }),
    );
  }

  async getOrderItem(id: string) {
    return await this.databaseService.order_items.findOne({
      _id: new ObjectId(id),
    });
  }

  async getOrderItems(order_id: string) {
    return await this.databaseService.order_items
      .find({ order_id: new ObjectId(order_id) })
      .toArray();
  }

  async getOrdersOfUser(user_id: string) {
    return await this.databaseService.orders
      .find({ user_id: new ObjectId(user_id) })
      .toArray();
  }

  async createOrderItems(orderItems: CreateOrderItemDto[]) {
    return await this.databaseService.order_items.insertMany(
      orderItems.map(
        (orderItem) =>
          new OrderItem({
            order_id: new ObjectId(orderItem.order_id),
            product_id: new ObjectId(orderItem.product_id),
            quantity: orderItem.quantity,
          }),
      ),
    );
  }

  async updateOrder(order: UpdateOrderDto) {
    return await this.databaseService.orders.findOneAndUpdate(
      { _id: new ObjectId(order._id) },
      {
        $set: {
          user_id: new ObjectId(order.user_id),
        },
      },
    );
  }

  async updateOrderItem(orderItem: UpdateOrderItemDto) {
    return await this.databaseService.order_items.findOneAndUpdate(
      { _id: new ObjectId(orderItem._id) },
      {
        $set: {
          order_id: new ObjectId(orderItem.order_id),
          product_id: new ObjectId(orderItem.product_id),
          quantity: orderItem.quantity,
        },
      },
      { returnDocument: 'after' },
    );
  }
}
