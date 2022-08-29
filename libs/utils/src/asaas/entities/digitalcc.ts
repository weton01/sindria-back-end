import { BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { AsaasCreateDigitalCC } from '../inputs/create-digitalcc';
import { AsaasOptions } from '../option';
import { AsaasCreateDigitalCCOutput } from '../outputs/create-digitalcc';
import { AsaasAccBalance } from '../outputs/get-balance';

export class AsaasAccEntity {
  protected X_API_KEY: string;
  protected URL: string;

  constructor(options: AsaasOptions) {
    this.X_API_KEY = options.X_API_KEY;
    this.URL = options.MODE;
  }

  public async createDigitalAccount(
    body: AsaasCreateDigitalCC,
  ): Promise<AsaasCreateDigitalCCOutput> {
    try {
      const { data }: { data: AsaasCreateDigitalCCOutput } = await axios.post(
        `${this.URL}/api/v3/accounts`,
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

  public async getBalance(token: string): Promise<AsaasAccBalance> {
    try {
      const { data }: { data: AsaasAccBalance } = await axios.get(
        `${this.URL}/api/v3/finance/balance`,
        {
          headers: {
            access_token: token
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
