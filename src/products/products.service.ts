import { Injectable } from '@nestjs/common';
import {
  CreateProductDto,
  CreateProductInstanceDto,
} from './dto/create-product.dto';
import {
  UpdateProductDto,
  UpdateProductInstanceDto,
} from './dto/update-product.dto';
import { DatabaseService } from 'src/database/database.service';
import {
  Product,
  ProductInstance,
} from 'src/database/models/schemas/products.schemas';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProductsService {
  constructor(private database: DatabaseService) {}

  async insertProduct(createProductDto: CreateProductDto) {
    const result = await this.database.products.insertOne(
      new Product({
        ...createProductDto,
        category_id: createProductDto.category_id.map((id) => new ObjectId(id)),
      }),
    );
    return result;
  }

  async findAllProducts() {
    return await this.database.products.find().toArray();
  }

  async findProduct(id: string) {
    return await this.database.products.findOne({ _id: new ObjectId(id) });
  }

  async findModelOfProduct(model: string) {
    return await this.database.products.findOne({ model });
  }

  async updateProduct({
    id,
    updateProductDto,
  }: {
    id: string;
    updateProductDto: UpdateProductDto;
  }) {
    const { category_id } = updateProductDto;
    const result = await this.database.products.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateProductDto,
          category_id: category_id.map((id) => new ObjectId(id)),
          updated_at: new Date(),
        },
      },
      { returnDocument: 'after' },
    );
    return result;
  }

  async insertProductInstance({
    product_id,
    productInstance,
  }: {
    product_id: string;
    productInstance: CreateProductInstanceDto;
  }) {
    const result = await this.database.product_instances.insertOne(
      new ProductInstance({
        ...productInstance,
        product_id: new ObjectId(product_id),
      }),
    );

    return result;
  }

  async findAllProductInstances(product_id: string) {
    const result = await this.database.product_instances
      .find({ product_id: new ObjectId(product_id) })
      .toArray();

    return result;
  }

  async findProductInstance({
    product_id,
    product_instance_id,
  }: {
    product_id: string;
    product_instance_id: string;
  }) {
    const result = await this.database.product_instances.findOne({
      _id: new ObjectId(product_instance_id),
      product_id: new ObjectId(product_id),
    });

    return result;
  }

  async findNameOfProductInstance({
    product_id,
    name,
  }: {
    product_id: string;
    name: string;
  }) {
    const result = await this.database.product_instances.findOne({
      name,
      product_id: new ObjectId(product_id),
    });

    return result;
  }

  async updateProductInstance({
    id,
    updateProductInstanceDto,
  }: {
    id: string;
    updateProductInstanceDto: UpdateProductInstanceDto;
  }) {
    const result = await this.database.product_instances.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        ...updateProductInstanceDto,
        updated_at: new Date(),
      },
      { returnDocument: 'after' },
    );

    return result;
  }
}
