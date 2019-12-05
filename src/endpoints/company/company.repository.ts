import { EntityRepository, Repository } from "typeorm";
import Company from "../../entity/Company";

@EntityRepository(Company)
export default class CompanyRepository extends Repository<Company> {
  findCompanyByCompanyNumber(companyNumber: string) {
    return this.findOne({ where: { companyNumber } });
  }
}
