import { BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { AsaasCreateWebhook } from '../inputs/create-webhook';
import { AsaasOptions } from '../option';
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
  ): Promise<AsaasCreateWebhookOutput[]> {
    try {
      const [p1, p2, p3]: [
        { data: AsaasCreateWebhookOutput },
        { data: AsaasCreateWebhookOutput },
        { data: AsaasCreateWebhookOutput },
      ] = await Promise.all([
        axios.post(`${this.URL}/api/v3/webhook`, body, {
          headers: {
            access_token: this.X_API_KEY,
          },
        }),
        axios.post(`${this.URL}/api/v3/webhook/transfer`, body, {
          headers: {
            access_token: this.X_API_KEY,
          },
        }),
        axios.post(`${this.URL}/api/v3/webhook/invoice`, body, {
          headers: {
            access_token: this.X_API_KEY,
          },
        }),
      ]);
      return [p1.data, p2.data, p3.data];
    } catch (err) {
      if (err?.response?.data)
        throw new BadRequestException(err?.response?.data);
      else if (err?.response) throw new BadRequestException(err?.response);
      else throw new BadRequestException(err);
    }
  }
}
