import { Collection, Db, MongoClient } from 'mongodb';
import { User } from './models/schemas/users.schemas';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Product } from './models/schemas/products.schemas';
@Injectable()
export class DatabaseService {
  private client: MongoClient;
  private db: Db;
  private uri: string;
  constructor(private configService: ConfigService) {
    this.uri = `mongodb+srv://${configService.get('DB_USERNAME')}:${configService.get('DB_PASSWORD')}@shoppingcartcluster.z2tjc.mongodb.net/?retryWrites=true&w=majority&appName=ShoppingCartCluster`;
    this.client = new MongoClient(this.uri);
    this.db = this.client.db('ShoppingCartDB_clone');
  }

  async connect() {
    await this.client.connect();
    await this.db.command({ ping: 1 });
    console.log('Connected to database');
  }

  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION);
  }

  get products(): Collection<Product> {
    return this.db.collection(process.env.DB_PRODUCTS_COLLECTION);
  }
}
