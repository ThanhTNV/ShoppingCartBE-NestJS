import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  UnprocessableEntityException,
} from '@nestjs/common';

const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;
@Injectable()
export class ValidateParamsPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'param') {
      if (metadata.data === 'id') {
        if (!value.match(ObjectIdRegex)) {
          throw new UnprocessableEntityException(
            'Invalid ID',
            'ID must be a valid MongoDB ObjectId',
          );
        }
      }
    }
    return value;
  }
}
