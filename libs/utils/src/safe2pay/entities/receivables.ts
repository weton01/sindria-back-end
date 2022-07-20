import axios from 'axios';
import { Safe2PayDepositDetailResponse } from '../interfaces/responses/safe2pay-depositdetails';
import { Safe2PaySimulatePrepaymentResponse } from '../interfaces/responses/safe2pay-simulateprepayment';
import { Safe2PayService } from '../safe2pay.service';

export class Safe2PayReceivablesEntity extends Safe2PayService {
  public async simulatePrepaymentReceivables(): Promise<Safe2PaySimulatePrepaymentResponse> {
    const { data }: { data: Safe2PaySimulatePrepaymentResponse } =
      await axios.get(`${this.URL}/AdvancePayment/Simulation`);

    return data;
  }

  public async prepaymentReceivables(): Promise<Safe2PayDepositDetailResponse> {
    const { data }: { data: Safe2PayDepositDetailResponse } = await axios.get(
      `${this.URL}/AdvancePayment/Require`,
    );

    return data;
  }
}
