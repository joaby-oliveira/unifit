import { S3 } from 'aws-sdk';
export declare class S3ManagerService {
    private readonly s3;
    constructor(s3: S3);
    private bucket;
    putObject({ key, stream }: {
        key: any;
        stream: any;
    }): Promise<import("aws-sdk/lib/request").PromiseResult<S3.PutObjectOutput, import("aws-sdk").AWSError>>;
}
