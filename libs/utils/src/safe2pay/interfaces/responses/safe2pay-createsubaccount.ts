export interface Safe2PayCreateAccountResponse {
  responseDetail: {
    Id: number;
    Name: string;
    Identity: string;
    Token: string;
  };
  hasError: boolean;
}
