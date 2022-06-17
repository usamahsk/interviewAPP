import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  timeStamp: Date;

  @IsNotEmpty()
  @IsString()
  categoryName: string;
}

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  message: string;

  @IsOptional()
  @IsString()
  categoryName: string;
}
