import { BadRequestException } from '@nestjs/common';
import axios from 'axios';
import {
  AsaasCreateChargeCredit,
} from '../inputs/create-charge';
import { AsaasCreateWebhook } from '../inputs/create-webhook';
import { AsaasOptions } from '../option';
import { AsaasCreateChargeOutput } from '../outputs/create-charge';
import { AsaasCreateWebhookOutput } from '../outputs/create-webhook';

export class AsaasWebookEntity {
  protected X_API_KEY: string;
  protected URL: string;

  constructor(options: AsaasOptions) {
    this.X_API_KEY = options.X_API_KEY;
    this.URL = options.MODE;
  }

  public async createWebhook(
    body: AsaasCreateWebhook,
  ): Promise<AsaasCreateWebhookOutput> {
    try {
      const { data }: { data: AsaasCreateWebhookOutput } = await axios.post(
        `${this.URL}/api/v3/webhook`,
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
