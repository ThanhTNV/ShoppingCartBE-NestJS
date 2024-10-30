import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongodb';
import { DatabaseService } from 'src/database/database.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from 'src/database/models/schemas/categories.schemas';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private databaseService: DatabaseService) {}

  async findAllCategories() {
    return await this.databaseService.categories.find().toArray();
  }

  async findCategory(id: string) {
    return await this.databaseService.categories.findOne({
      _id: new ObjectId(id),
    });
  }

  async findNameOfCategory(name: string) {
    return await this.databaseService.categories.findOne({ name });
  }

  async insertCategory(createCategoryDto: CreateCategoryDto) {
    const { parents } = createCategoryDto;
    return await this.databaseService.categories.insertOne(
      new Category({
        ...createCategoryDto,
        parents: parents ? new ObjectId(parents) : null,
      }),
    );
  }

  async updateCategory({
    id,
    updateCategoryDto,
  }: {
    id: string;
    updateCategoryDto: UpdateCategoryDto;
  }) {
    const { parents } = updateCategoryDto;
    const parents_id = parents ? new ObjectId(parents) : null;
    return await this.databaseService.categories.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateCategoryDto,
          parents: parents_id,
        },
      },
      { returnDocument: 'after' },
    );
  }

  async deleteCategory(id: string) {
    return await this.databaseService.categories.findOneAndDelete({
      _id: new ObjectId(id),
    });
  }
}
