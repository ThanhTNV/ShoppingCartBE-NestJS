import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto, CreateOrderItemDto } from './create-order.dto';
import { IsNotEmpty, IsNumber, IsOptional, Matches } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({
    required: true,
    example: '60f1c9e6e2e4e6f9b6f0d5d6',
    description: 'Order ID of the order to be updated',
    format: 'MongoDB ObjectId',
    type: String,
  })
  @IsNotEmpty()
  @Matches(/^[0-9a-fA-F]{24}$/, {
    message: 'Invalid user_id, user_id must be a MongoDB ObjectId',
  })
  _id: string;

  @ApiProperty({
    required: false,
    example: '60f1c9e6e2e4e6f9b6f0d5d6',
    description: 'User ID of the user who made the order',
    format: 'MongoDB ObjectId',
    type: String,
  })
  @IsOptional()
  @Matches(/^[0-9a-fA-F]{24}$/, {
    message: 'Invalid user_id, user_id must be a MongoDB ObjectId',
  })
  user_id?: string;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {
  @ApiProperty({
    required: true,
    example: '60f1c9e6e2e4e6f9b6f0d5d6',
    description: 'ID of the order item to be updated',
    format: 'MongoDB ObjectId',
    type: String,
  })
  @IsNotEmpty()
  @Matches(/^[0-9a-fA-F]{24}$/, {
    message: 'Invalid order_id, order_id must be a MongoDB ObjectId',
  })
  _id: string;

  @ApiProperty({
    required: false,
    example: '60f1c9e6e2e4e6f9b6f0d5d6',
    description: 'Order ID of the order to which the item belongs',
    format: 'MongoDB ObjectId',
    type: String,
  })
  @IsOptional()
  @Matches(/^[0-9a-fA-F]{24}$/, {
    message: 'Invalid order_id, order_id must be a MongoDB ObjectId',
  })
  order_id?: string;

  @ApiProperty({
    required: false,
    example: '60f1c9e6e2e4e6f9b6f0d5d6',
    description: 'Product ID of the product in the order',
    format: 'MongoDB ObjectId',
    type: String,
  })
  @IsOptional()
  @Matches(/^[0-9a-fA-F]{24}$/, {
    message: 'Invalid product_id, product_id must be a MongoDB ObjectId',
  })
  product_id?: string;

  @ApiProperty({
    required: false,
    example: 5,
    description: 'Quantity of the product in the order',
    type: Number,
  })
  @IsOptional()
  @IsNumber(
    { maxDecimalPlaces: 0 },
    { message: 'Invalid quantity, quantity must be an integer' },
  )
  quantity?: number;
}
