// s3-manager.service.ts
import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';

@Injectable()
export class S3ManagerService {
  constructor(@InjectAwsService(S3) private readonly s3: S3) {}

  private bucket = process.env['AWS_BUCKET_NAME'] ?? 'ichacara-dev';

  async putObject({ key, stream }) {
    return await this.s3
      .putObject({ Bucket: this.bucket, Key: key, Body: stream })
      .promise();
  }
}
