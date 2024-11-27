import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from '../enums/error-code.enum';

export class InvalidDistanceException extends HttpException {
  constructor(description: string = 'Invalid distance for driver') {
    super(
      {
        error_code: ErrorCode.invalid_distance,
        error_description: description,
      },
      HttpStatus.NOT_ACCEPTABLE,
    );
  }
}

export class DriverNotFoundException extends HttpException {
  constructor(description: string = 'Motorista não encontrado') {
    super(
      {
        error_code: ErrorCode.driver_not_found,
        error_description: description,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class CustomerNotFoundException extends HttpException {
  constructor(description: string = 'Customer not found') {
    super(
      {
        error_code: ErrorCode.driver_not_found,
        error_description: description,
      },
      HttpStatus.NOT_FOUND,
    );
  }
}

export class InvalidDataException extends HttpException {
  constructor(
    description: string = 'Os dados fornecidos no corpo da requisição são inválidos',
  ) {
    super(
      {
        error_code: ErrorCode.invalid_data,
        error_description: description,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class NoRidesFoundException extends HttpException {
  constructor(description: string) {
    super(
      {
        error_code: ErrorCode.no_rides_found,
        error_description: description,
      },
      HttpStatus.NOT_FOUND,//404
    );
  }
}

export class InvalidDriverException extends HttpException {
  constructor(description: string) {
    super(
      {
        error_code: ErrorCode.invalid_driver,
        error_description: description,
      },
      HttpStatus.BAD_REQUEST,//400
    );
  }
}

export class InvalidDriverDistanceException extends HttpException {
  constructor(description: string) {
    super(
      {
        error_code: ErrorCode.invalid_distance,
        error_description: description,
      },
      HttpStatus.NOT_ACCEPTABLE,//406
    );
  }
}
