import Address from "../Address";

export default class AddressTransformers {
  public static from(value: string): Address {
    const split = value.split(",").map((val: string) => val.replace(/"/g, ""));

    //   state: split[5], Not required by contract
    //   extra: split[7].substring(0, split[7].length - 1) Not required by contract
    return new Address(
      split[0].substring(1),
      split[1],
      split[2],
      split[3],
      split[4],
      split[6]
    );
  }

  public static to(value: Address) {
    const {
      street,
      bus,
      number,
      zip,
      city,
      state = "",
      country,
      extra = ""
    } = value;

    return `(${street}, ${bus}, ${number}, ${zip}, ${city}, ${state}, ${country}, ${extra})`;
  }
}
