import axios from 'axios';
import { Safe2PayPaymentMethod } from '../enums/safe2pay-subaccount-paymentcode';
import { Safe2PayPaymentBoleto } from '../interfaces/payment/safe2pay-payment-boleto';
import { Safe2PayPaymentCredit } from '../interfaces/payment/safe2pay-payment-credit';
import { Safe2PayPaymentDebit } from '../interfaces/payment/safe2pay-payment-debit';
import { Safe2PayPaymentDynamicPix } from '../interfaces/payment/safe2pay-payment-dynamicpix';
import { Safe2PayPaymentPixStatic } from '../interfaces/payment/safe2pay-payment-pixstatic';
import {
  Safe2PayUpdatePaymentMethodAntecipation,
  Safe2PayUpdatePaymentMethodAntFraud,
  Safe2PayUpdatePaymentMethodBoleto,
  Safe2PayUpdatePaymentMethodCredit,
  Safe2PayUpdatePaymentMethodCrypt,
  Safe2PayUpdatePaymentMethodDebit,
  Safe2PayUpdatePaymentMethodPix,
  Safe2PayUpdatePaymentMethodTed,
} from '../interfaces/payment/safe2pay-updatepaymentmethods';
import { Safe2PayCreateAccountResponse } from '../interfaces/responses/safe2pay-createsubaccount';
import { Safe2PayPaymentResponse } from '../interfaces/responses/safe2pay-payment';
import {
  Safe2PayPaymentMethodList2Response,
  Safe2PayPaymentMethodResponse,
} from '../interfaces/responses/safe2pay-paymentmethod';
import {
  Safe2PayUpdatePaymentMethodAntecipationResponse,
  Safe2PayUpdatePaymentMethodAntFraudResponse,
  Safe2PayUpdatePaymentMethodBoletoResponse,
  Safe2PayUpdatePaymentMethodCreditResponse,
  Safe2PayUpdatePaymentMethodCryptResponse,
  Safe2PayUpdatePaymentMethodDebitResponse,
  Safe2PayUpdatePaymentMethodPixResponse,
  Safe2PayUpdatePaymentMethodTedResponse,
} from '../interfaces/responses/safe2pay-updatepaymentmethods';

import { Safe2PayService } from '../safe2pay.service';

export class Safe2PayPaymentEntity extends Safe2PayService {
  public async createDynamicPix(
    safe2payPayment: Safe2PayPaymentDynamicPix,
  ): Promise<Safe2PayPaymentResponse> {
    const { data }: { data: Safe2PayPaymentResponse } = await axios.post(
      `${this.URL}/Payment`,
      { ...safe2payPayment, PaymentMethod: Safe2PayPaymentMethod.pix },
    );

    return data;
  }

  public async createStaticPix(
    safe2payPayment: Safe2PayPaymentPixStatic,
  ): Promise<Safe2PayCreateAccountResponse> {
    const { data }: { data: Safe2PayCreateAccountResponse } = await axios.post(
      `${this.URL}/StaticPix`,
      { safe2payPayment },
    );

    return data;
  }

  public async createBoleto(
    safe2payPayment: Safe2PayPaymentBoleto,
  ): Promise<Safe2PayPaymentResponse> {
    const { data }: { data: Safe2PayPaymentResponse } = await axios.post(
      `${this.URL}/Payment`,
      { ...safe2payPayment, PaymentMethod: Safe2PayPaymentMethod.boleto },
    );

    return data;
  }

  public async createCredit(
    safe2payPayment: Safe2PayPaymentCredit,
  ): Promise<Safe2PayPaymentResponse> {
    const { data }: { data: Safe2PayPaymentResponse } = await axios.post(
      `${this.URL}/Payment`,
      { ...safe2payPayment, PaymentMethod: Safe2PayPaymentMethod.credit },
    );

    return data;
  }

  public async createDebit(
    safe2payPayment: Safe2PayPaymentDebit,
  ): Promise<Safe2PayPaymentResponse> {
    const { data }: { data: Safe2PayPaymentResponse } = await axios.post(
      `${this.URL}/Payment`,
      { ...safe2payPayment, PaymentMethod: Safe2PayPaymentMethod.debit },
    );

    return data;
  }

  public async createCripto(
    safe2payPayment: Safe2PayPaymentDebit,
  ): Promise<Safe2PayPaymentResponse> {
    const { data }: { data: Safe2PayPaymentResponse } = await axios.post(
      `${this.URL}/Payment`,
      { ...safe2payPayment, PaymentMethod: Safe2PayPaymentMethod.cripto },
    );

    return data;
  }

  public async findPaymentMethod(
    codePaymentMethod: number,
  ): Promise<Safe2PayPaymentMethodResponse> {
    const { data }: { data: Safe2PayPaymentMethodResponse } = await axios.get(
      `${this.URL}/PaymentMethod/Get?codePaymentMethod=${codePaymentMethod}`,
    );

    return data;
  }

  public async listPaymentMethod(
    codePaymentMethod: number,
  ): Promise<Safe2PayPaymentMethodList2Response> {
    const { data }: { data: Safe2PayPaymentMethodList2Response } =
      await axios.get(
        `${this.URL}/PaymentMethod/Get?codePaymentMethod=${codePaymentMethod}`,
      );

    return data;
  }

  public async updateBoleto(
    payload: Safe2PayUpdatePaymentMethodBoleto,
  ): Promise<Safe2PayUpdatePaymentMethodBoletoResponse> {
    const { data }: { data: Safe2PayUpdatePaymentMethodBoletoResponse } =
      await axios.put(`${this.URL}/PaymentMethod/Update`, {
        ...payload,
        PaymentMethod: { Code: 1 },
      });

    return data;
  }

  public async updateCredit(
    payload: Safe2PayUpdatePaymentMethodCredit,
  ): Promise<Safe2PayUpdatePaymentMethodCreditResponse> {
    const { data }: { data: Safe2PayUpdatePaymentMethodCreditResponse } =
      await axios.put(`${this.URL}/PaymentMethod/Update`, {
        ...payload,
        PaymentMethod: { Code: 2 },
      });

    return data;
  }

  public async updateDebit(
    payload: Safe2PayUpdatePaymentMethodDebit,
  ): Promise<Safe2PayUpdatePaymentMethodDebitResponse> {
    const { data }: { data: Safe2PayUpdatePaymentMethodDebitResponse } =
      await axios.put(`${this.URL}/PaymentMethod/Update`, {
        ...payload,
        PaymentMethod: { Code: 4 },
      });

    return data;
  }

  public async updateCripto(
    payload: Safe2PayUpdatePaymentMethodCrypt,
  ): Promise<Safe2PayUpdatePaymentMethodCryptResponse> {
    const { data }: { data: Safe2PayUpdatePaymentMethodCryptResponse } =
      await axios.put(`${this.URL}/PaymentMethod/Update`, {
        ...payload,
        PaymentMethod: { Code: 1 },
      });

    return data;
  }

  public async updatePix(
    payload: Safe2PayUpdatePaymentMethodPix,
  ): Promise<Safe2PayUpdatePaymentMethodPixResponse> {
    const { data }: { data: Safe2PayUpdatePaymentMethodPixResponse } =
      await axios.put(`${this.URL}/PaymentMethod/Update`, {
        ...payload,
        PaymentMethod: { Code: 1 },
      });

    return data;
  }

  public async updateTed(
    payload: Safe2PayUpdatePaymentMethodTed,
  ): Promise<Safe2PayUpdatePaymentMethodTedResponse> {
    const { data }: { data: Safe2PayUpdatePaymentMethodTedResponse } =
      await axios.put(`${this.URL}/PaymentMethod/Update`, {
        ...payload,
        PaymentMethod: { Code: 1 },
      });

    return data;
  }

  public async updateAntecipacao(
    payload: Safe2PayUpdatePaymentMethodAntecipation,
  ): Promise<Safe2PayUpdatePaymentMethodAntecipationResponse> {
    const { data }: { data: Safe2PayUpdatePaymentMethodAntecipationResponse } =
      await axios.put(`${this.URL}/PaymentMethod/Update`, {
        ...payload,
        PaymentMethod: { Code: 1 },
      });

    return data;
  }

  public async updateAntFraud(
    payload: Safe2PayUpdatePaymentMethodAntFraud,
  ): Promise<Safe2PayUpdatePaymentMethodAntFraudResponse> {
    const { data }: { data: Safe2PayUpdatePaymentMethodAntFraudResponse } =
      await axios.put(`${this.URL}/PaymentMethod/Update`, {
        ...payload,
        PaymentMethod: { Code: 1 },
      });

    return data;
  }
}
