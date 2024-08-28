// s3-manager.module.ts
import { Module } from '@nestjs/common';
import { S3ManagerService } from '../services/s3-manager.service';

export
@Module({
  imports: [],
  providers: [S3ManagerService],
  exports: [S3ManagerService],
})
class S3ManagerModule {}
