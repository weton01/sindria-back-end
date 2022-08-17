export interface AsaasCreateWebhook {
  url: string;
  email: string;
  interrupted: boolean;
  enabled: boolean;
  apiVersion: number;
  authToken: string;
}
