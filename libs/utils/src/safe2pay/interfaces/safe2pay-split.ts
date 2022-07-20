import { Safe2PaySplitReceiverType } from '../enums/safe2pay-receivertype';

export interface Safe2PaySplit {
  CodeTaxType: number;
  CodeReceiverType: Safe2PaySplitReceiverType;
  IdReceiver?: number;
  identity?: string;
  Name: string;
  isPayTax: boolean;
  Amount: number;
}
