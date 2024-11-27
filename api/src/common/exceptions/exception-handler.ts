import {
  CustomerNotFoundException,
  DriverNotFoundException,
  InvalidDataException,
  InvalidDistanceException,
  InvalidDriverDistanceException,
  InvalidDriverException,
  NoRidesFoundException,
} from './exception';

export class ExceptionHandler {
  static driverNotFound(description: string) {
    throw new DriverNotFoundException(description || 'DriverNotFoundException');
  }

  static customerNotFound(description: string) {
    throw new CustomerNotFoundException(
      description || 'CustomerNotFoundException',
    );
  }

  static invalidDistance(description?: string) {
    throw new InvalidDistanceException(
      description ||
        'Os endereços de origem e destino recebidos não podem estar em branco ou serem o mesmo',
    );
  }

  static invalidData(description?: string) {
    throw new InvalidDataException(
      description || 'Os dados fornecidos no corpo da requisição são inválidos',
    );
  }

  static noRidesFound(description?: string) {
    throw new NoRidesFoundException(description || 'Nenhum registro encontrado');
  }

  static invalidDriver(description?: string) {
    throw new InvalidDriverException(description || 'Motorista invalido');
  }

  static invalidDriverDistance(description?: string) {
    throw new InvalidDriverDistanceException(description || 'Quilometragem inválida para o motorista');
  }
}
