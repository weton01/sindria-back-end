import { BadRequestException } from '@nestjs/common';
import axios from 'axios';
import {
  AsaasCreateChargeBoleto,
  AsaasCreateChargeCredit,
  AsaasCreateChargePix,
} from '../inputs/create-charge';
import { AsaasOptions } from '../option';
import { AsaasCreateChargeOutput } from '../outputs/create-charge';
import { AsaasGetBarcodeOutput } from '../outputs/get-barcode';
import { AsaasGetQRCodeOutput } from '../outputs/get-pix';

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
      console.log('deu erro na criação do boleto');
      if (err?.response?.data)
        throw new BadRequestException(err?.response?.data);
      else if (err?.response) throw new BadRequestException(err?.response);
      else throw new BadRequestException(err);
    }
  }

  public async createChargeCredit(
    body: AsaasCreateChargeCredit,
  ): Promise<AsaasCreateChargeOutput> {
    try {
      console.log(body)

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

  public async createChargeDebit(
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

  public async createChargePix(
    body: AsaasCreateChargePix,
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
      console.log('deu erro na criação do pix');

      if (err?.response?.data)
        throw new BadRequestException(err?.response?.data);
      else if (err?.response) throw new BadRequestException(err?.response);
      else throw new BadRequestException(err);
    }
  }

  public async getBoletoBarcode(
    chargeId: string,
  ): Promise<AsaasGetBarcodeOutput> {
    try {
      const { data }: { data: AsaasGetBarcodeOutput } = await axios.get(
        `${this.URL}/api/v3/payments/${chargeId}/identificationField`,
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

  public async getPixQRCode(chargeId: string): Promise<AsaasGetQRCodeOutput> {
    try {
      const { data }: { data: AsaasGetQRCodeOutput } = await axios.get(
        `${this.URL}/api/v3/payments/${chargeId}/pixQrCode`,
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
