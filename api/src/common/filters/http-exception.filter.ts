import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorCode } from '../enums/error-code.enum';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

    // Extraia o objeto de resposta da exceção
    const exceptionResponse: any =
      exception.getResponse() instanceof Object
        ? exception.getResponse()
        : { message: exception.message };

    // Garante que os campos de erro estejam presentes
    const error_code = exceptionResponse.error_code || ErrorCode.invalid_data;
    const errors_description =
      exceptionResponse.error_description || exceptionResponse.message || 'Unexpected error occurred.';
    const error_description = (typeof errors_description === 'string'? errors_description : errors_description[0] );

    response.status(status).json({
      error_code: error_code,
      error_description: error_description,
      // errors_description: errors_description,
    });
  }
}
