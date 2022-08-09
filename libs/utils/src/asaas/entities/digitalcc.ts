import axios from 'axios';
import { AsaasCreateDigitalCC } from '../inputs/create-digitalcc';
import { AsaasOptions } from '../option';
import { AsaasCreateDigitalCCOutput } from '../outputs/create-digitalcc';

export class AsaasAccEntity {
  protected X_API_KEY: string;
  protected URL: string;

  constructor(options: AsaasOptions) {
    this.X_API_KEY = options.X_API_KEY;
    this.URL = options.MODE;
  }

  public async createDigitalAccount(
    body: AsaasCreateDigitalCC
  ): Promise<AsaasCreateDigitalCCOutput> {
    const { data }: { data: AsaasCreateDigitalCCOutput } = await axios.post(
      `${this.URL}/api/v3/accounts`,
      body,
      {
        headers: {
          access_token: this.X_API_KEY
        }
      }
    );

    return data;
  }
}
