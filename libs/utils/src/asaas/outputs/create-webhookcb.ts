import { AsaasChargeStatus } from '../enums/charge';
import { AsaasCreateChargeOutput } from './create-charge';

export interface AsaasCreateWebhookCbOutput {
  event: AsaasChargeStatus;
  payment: AsaasCreateChargeOutput;
}
