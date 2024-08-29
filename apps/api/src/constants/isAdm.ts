import { SetMetadata } from '@nestjs/common';

export const IS_ADM = 'isAdm';
export const IsAdm = () => SetMetadata(IS_ADM, true);
