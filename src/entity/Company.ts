import { Entity, PrimaryColumn, Column } from "typeorm";

import Form from "./Form";
import AddressTransformers from "./Transformers/AddressTransformers";

@Entity({ name: "company" })
export default class Company {
  @PrimaryColumn()
  id: number;

  @Column()
  entitynumber: string;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: Form,
    default: Form.other
  })
  form: Form;

  @Column({
    transformer: {
      from(value) {
        return AddressTransformers.from(value);
      },
      to(value) {
        return AddressTransformers.to(value);
      }
    }
  })
  seat: string;
}
