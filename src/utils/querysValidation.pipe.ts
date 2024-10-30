import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Request } from 'express';

const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;
@Injectable()
export class ValidateQueryPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'query') {
      if (!value) {
        return value;
      }
      if (!ObjectIdRegex.test(value.id)) {
        throw new UnprocessableEntityException(
          'Invalid Query ID. ID must be a valid MongoDB ObjectId',
        );
      }
      return value;
    }
  }
}
