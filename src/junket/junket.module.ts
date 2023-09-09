import { Module } from '@nestjs/common';
import { JunketController } from './junket.controller';
import { JunketService } from './junket.service';

@Module({
  controllers: [JunketController],
  providers: [JunketService],
})
export class JunketModule {}
