import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoryDto } from '../entity/category-dto';
import { CategoryService } from '../entity/category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createCategory(@Body() createCategoryPayoad: CategoryDto) {
    return await this.categoryService.create(createCategoryPayoad);
  }

  @Get('list')
  async listCategory() {
    return await this.categoryService.findAll();
  }
}
