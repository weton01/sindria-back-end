import { AsaasChargeStatusWebhook } from '../enums/charge';
import { AsaasCreateChargeOutput } from './create-charge';

export interface AsaasCreateWebhookCbOutput {
  event: AsaasChargeStatusWebhook;
  payment: AsaasCreateChargeOutput;
}
