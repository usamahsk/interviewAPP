import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './category.schema';
import { CategoryDto } from './category-dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  async create(createCategoryPayload: CategoryDto): Promise<Category> {
    createCategoryPayload.uuid = uuidv4();
    const createdCategory = new this.categoryModel(createCategoryPayload);
    return createdCategory.save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async deleteOne(options: CategoryDto): Promise<any> {
    return this.categoryModel.deleteOne(options);
  }
  async findOne(categoryName: string): Promise<Category> {
    return this.categoryModel.findOne({ uuid: categoryName });
  }
}
