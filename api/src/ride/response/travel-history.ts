export class Driver {
  id: number;
  name: string;
}

export class Rides {
  id: number;
  date: Date;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: Driver;
  value: number;
}

export class TravelsDone {
  customer_id: string;
  rides: Rides[];
}
