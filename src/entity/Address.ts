export default class Address {
  constructor(
    street: string,
    bus: string,
    number: string,
    zip: string,
    city: string,
    country: string
  ) {
    this.street = street;
    this.bus = bus;
    this.number = number;
    this.zip = zip;
    this.city = city;
    this.country = country;
  }

  id: number;

  street: string;

  bus: string;

  number: string;

  zip: string;

  city: string;

  state: string;

  country: string;

  extra: string;
}
