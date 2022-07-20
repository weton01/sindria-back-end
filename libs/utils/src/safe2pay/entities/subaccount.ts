import axios from 'axios';
import { Safe2PayCreateAccountResponse } from '../interfaces/responses/safe2pay-createsubaccount';
import { Safe2PayDeleteResponse } from '../interfaces/responses/safe2pay-delete';
import { Safe2PaySubAccount } from '../interfaces/subaccount/safe2pay-subaccount';
import { Safe2PayService } from '../safe2pay.service';

export class Safe2PaySubAccountEntity extends Safe2PayService {
  public async create(
    safe2PaySubAccount: Safe2PaySubAccount,
  ): Promise<Safe2PayCreateAccountResponse> {
    const { data }: { data: Safe2PayCreateAccountResponse } = await axios.post(
      `${this.URL}/Marketplace/Add`,
      safe2PaySubAccount,
    );

    return data;
  }

  public async update(
    id: string,
    safe2PaySubAccount: Safe2PaySubAccount,
  ): Promise<Safe2PayCreateAccountResponse> {
    const { data }: { data: Safe2PayCreateAccountResponse } = await axios.put(
      `${this.URL}/Marketplace/Update?id=${id}`,
      safe2PaySubAccount,
    );

    return data;
  }

  public async list(
    PageNumber: string,
    RowsPerPage: string,
  ): Promise<Safe2PaySubAccount[]> {
    const { data }: { data: Safe2PaySubAccount[] } = await axios.get(
      `${this.URL}/Marketplace/List?PageNumber=${PageNumber}&RowsPerPage=${RowsPerPage}`,
    );

    return data;
  }

  public async filter(id: string): Promise<Safe2PaySubAccount> {
    const { data }: { data: Safe2PaySubAccount } = await axios.get(
      `${this.URL}/Marketplace/Get?id=${id}?`,
    );

    return data;
  }

  public async delete(id: string): Promise<Safe2PayDeleteResponse> {
    const { data }: { data: Safe2PayDeleteResponse } = await axios.delete(
      `${this.URL}/Marketplace/Delete?id=${id}?`,
    );

    return data;
  }
}
