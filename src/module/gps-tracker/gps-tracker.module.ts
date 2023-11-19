import { Module } from '@nestjs/common';
import { Ygt92Module } from './ygt92/ygt92.module';
import { Es353module } from './es353/es353.module';


@Module({
  imports: [Ygt92Module, Es353module]
})
export class GpsTrackerModule {}
