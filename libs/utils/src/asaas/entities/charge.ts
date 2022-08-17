import { BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { AsaasCreateChargeBoleto, AsaasCreateChargeCredit } from '../inputs/create-charge';
import { AsaasOptions } from '../option';
import { AsaasCreateChargeOutput } from '../outputs/create-charge';

export class AsaasChargeEntity {
  protected X_API_KEY: string;
  protected URL: string;

  constructor(options: AsaasOptions) {
    this.X_API_KEY = options.X_API_KEY;
    this.URL = options.MODE;
  }

  public async createChargeBoleto(
    body: AsaasCreateChargeBoleto,
  ): Promise<AsaasCreateChargeOutput> {
    try {
      const { data }: { data: AsaasCreateChargeOutput } = await axios.post(
        `${this.URL}/api/v3/payments`,
        body,
        {
          headers: {
            access_token: this.X_API_KEY,
          },
        },
      );

      return data;
    } catch (err) {
      throw new BadRequestException(err?.response?.data);
    }
  }

  public async createChargeCredit(
    body: AsaasCreateChargeCredit,
  ): Promise<AsaasCreateChargeOutput> {
    try {
      const { data }: { data: AsaasCreateChargeOutput } = await axios.post(
        `${this.URL}/api/v3/payments`,
        body,
        {
          headers: {
            access_token: this.X_API_KEY,
          },
        },
      );

      return data;
    } catch (err) {
      throw new BadRequestException(err?.response?.data);
    }
  }
}
