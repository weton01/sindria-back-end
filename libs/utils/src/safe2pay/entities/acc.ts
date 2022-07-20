import axios from 'axios';
import { Safe2PayAccBalanceResponse } from '../interfaces/responses/safe2pay-accbalance';
import { Safe2PayDepositDetailResponse } from '../interfaces/responses/safe2pay-depositdetails';
import { Safe2PayGetCreditResponse } from '../interfaces/responses/safe2pay-getcredit';
import { Safe2PayListDepositsResponse } from '../interfaces/responses/safe2pay-listdeposits';
import { Safe2PayService } from '../safe2pay.service';

export class Safe2PayAccEntity extends Safe2PayService {
  public async listDeposits(
    month: number,
    year: number,
  ): Promise<Safe2PayListDepositsResponse> {
    const { data }: { data: Safe2PayListDepositsResponse } = await axios.get(
      `${this.URL}/CheckingAccount/GetListDeposits?month={${month}}&year=${year}`,
    );

    return data;
  }

  public async depositsDetails(
    day: number,
    month: number,
    year: number,
    page: number,
    rowsPerPage: number,
  ): Promise<Safe2PayDepositDetailResponse> {
    const { data }: { data: Safe2PayDepositDetailResponse } = await axios.get(
      `${this.URL}/CheckingAccount/GetListDetailsDeposits?day=${day}&month=${month}&year=${year}&page=${page}&rowsPerPage=${rowsPerPage}`,
    );

    return data;
  }

  public async findBankData(): Promise<Safe2PayGetCreditResponse> {
    const { data }: { data: Safe2PayGetCreditResponse } = await axios.get(
      `${this.URL}/MerchantBankData/Get`,
    );

    return data;
  }

  public async findBalance(
    initialDate: string,
    endDate: string,
  ): Promise<Safe2PayAccBalanceResponse> {
    const { data }: { data: Safe2PayAccBalanceResponse } = await axios.get(
      `${this.URL}/CheckingAccount/GetBalance?InitialDate=${initialDate}&EndDate=${endDate}`,
    );

    return data;
  }
}
