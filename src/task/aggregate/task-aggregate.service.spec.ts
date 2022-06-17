import { Test, TestingModule } from '@nestjs/testing';
import { TaskAggregateService } from './task-aggregate.service';

describe('TaskAggregateService', () => {
  let service: TaskAggregateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskAggregateService],
    }).compile();

    service = module.get<TaskAggregateService>(TaskAggregateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
