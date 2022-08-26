import { BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { AsaasCustomer } from '../inputs/create-customer';
import { AsaasOptions } from '../option';
import { AsaasCreateCustomerOutput } from '../outputs/create-customer';

export class AsaasCustomerEntity {
  protected X_API_KEY: string;
  protected URL: string;

  constructor(options: AsaasOptions) {
    this.X_API_KEY = options.X_API_KEY;
    this.URL = options.MODE;
  }

  public async createCustomer(
    body: AsaasCustomer,
  ): Promise<AsaasCreateCustomerOutput> {
    try {
      const { data }: { data: AsaasCreateCustomerOutput } = await axios.post(
        `${this.URL}/api/v3/customers`,
        body,
        {
          headers: {
            access_token: this.X_API_KEY,
          },
        },
      );

      return data;
    } catch (err) {
      if (err?.response?.data)
        throw new BadRequestException(err?.response?.data);
      else if (err?.response) throw new BadRequestException(err?.response);
      else throw new BadRequestException(err);
    }
  }
}
