import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const cxt = host.switchToHttp();
    const msg = exception.message;
    const status = exception.getStatus();
    const response = cxt.getResponse();
    console.error(exception);
    response.status(status).json({
      statusCode: status,
      message: msg,
    });
  }
}
