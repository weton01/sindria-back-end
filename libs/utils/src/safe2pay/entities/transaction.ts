import axios from 'axios';
import { Safe2PayTransactionStatus } from '../enums/safe2pay-transactionstatus';
import { Safe2PayPayment } from '../interfaces/payment/safe2pay-payment';
import { Safe2PayPaymentDebit } from '../interfaces/payment/safe2pay-payment-debit';
import { Safe2PayChangeTransactionStatusResponse } from '../interfaces/responses/safe2pay-changetransactionstatus';
import { Safe2PayDeleteResponse } from '../interfaces/responses/safe2pay-delete';
import { Safe2PayListTransactionsResponse } from '../interfaces/responses/safe2pay-listtransactions';
import { Safe2PayPaymentResponse } from '../interfaces/responses/safe2pay-payment';
import { Safe2PayPaymentMethodListResponse } from '../interfaces/responses/safe2pay-payment-methodlist';
import { Safe2PayPaymentInstallmentValueList } from '../interfaces/responses/safe2pay-payment-methodsvalue';
import { Safe2PayListTransactions } from '../interfaces/transactions/safe2pay-listtransactions';

import { Safe2PayService } from '../safe2pay.service';

export class Safe2PayTransactionEntity extends Safe2PayService {
  public async findPaymentOptions(): Promise<Safe2PayPaymentMethodListResponse> {
    const { data }: { data: Safe2PayPaymentMethodListResponse } =
      await axios.get(`${this.URL}/MerchantPaymentMethod/List`);

    return data;
  }

  public async findInstallmentValue(
    amount: number,
  ): Promise<Safe2PayPaymentInstallmentValueList> {
    const { data }: { data: Safe2PayPaymentInstallmentValueList } =
      await axios.get(`${this.URL}/CreditCard/InstallmentValue/`, {
        params: { amount },
      });

    return data;
  }

  public async deleteBoleto(id: number): Promise<Safe2PayDeleteResponse> {
    const { data }: { data: Safe2PayDeleteResponse } = await axios.delete(
      `${this.URL}/BankSlip/WriteOffBankSlip`,
      {
        params: { id },
      },
    );
    return data;
  }

  public async deletePix(id: number): Promise<Safe2PayDeleteResponse> {
    const { data }: { data: Safe2PayDeleteResponse } = await axios.delete(
      `${this.URL}/Pix/Cancel/${id}`,
    );

    return data;
  }

  public async deleteCredit(
    id: number,
    amount: number,
  ): Promise<Safe2PayDeleteResponse> {
    const { data }: { data: Safe2PayDeleteResponse } = await axios.delete(
      `${this.URL}/CreditCard/Cancel/${id}/${amount ? amount : ''}`,
    );

    return data;
  }

  public async deleteDebit(id: number): Promise<Safe2PayDeleteResponse> {
    const { data }: { data: Safe2PayDeleteResponse } = await axios.delete(
      `${this.URL}/DebitCard/Cancel/${id}`,
    );

    return data;
  }

  public async getCredit(
    id: number,
    amount: number,
  ): Promise<Safe2PayPaymentResponse> {
    const { data }: { data: Safe2PayPaymentResponse } = await axios.put(
      `${this.URL}/CreditCard/Capture/${id}/${amount}`,
    );

    return data;
  }

  public async updateTransaction(
    safe2payPayment: Safe2PayPaymentDebit,
  ): Promise<any> {
    return;
  }

  public async updateTransactionStatus(
    idTransaction: number,
    idTransactionStatus: Safe2PayTransactionStatus,
  ): Promise<Safe2PayChangeTransactionStatusResponse> {
    const { data }: { data: Safe2PayChangeTransactionStatusResponse } =
      await axios.put(
        `${this.URL}/Transaction/UpdateSandboxTransaction?idTransaction=${idTransaction}&idTransactionStatus=${idTransactionStatus}`,
      );

    return data;
  }

  public async findTransaction(IdTransaction: any): Promise<Safe2PayPayment> {
    const { data }: { data: Safe2PayPayment } = await axios.get(
      `${this.URL}/transaction/Get?Id=${IdTransaction}`,
    );

    return data;
  }

  public async findByReference(Reference: string): Promise<Safe2PayPayment> {
    const { data }: { data: Safe2PayPayment } = await axios.get(
      `${this.URL}/transaction/Reference?reference=${Reference}`,
    );

    return data;
  }

  public async listTransactions(
    safe2payPayment: Safe2PayListTransactions,
  ): Promise<Safe2PayListTransactionsResponse> {
    const { data }: { data: Safe2PayListTransactionsResponse } =
      await axios.get(`${this.URL}/Transaction/List`, {
        params: safe2payPayment,
      });

    return data;
  }
}
