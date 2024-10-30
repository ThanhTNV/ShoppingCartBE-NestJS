import { ObjectId } from 'mongodb';

interface CategoryType {
  _id?: ObjectId;
  name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
  parents?: ObjectId;
}

export class Category {
  _id: ObjectId;
  name: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  parents: ObjectId;

  constructor(category: CategoryType) {
    this._id = category._id || new ObjectId();
    this.name = category.name;
    this.description = category.description;
    this.created_at = category.created_at || new Date();
    this.updated_at = category.updated_at || new Date();
    this.parents = category.parents;
  }
}
