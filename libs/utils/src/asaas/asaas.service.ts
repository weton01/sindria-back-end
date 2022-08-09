import { Injectable, Inject } from '@nestjs/common';   
import { AsaasAccEntity } from './entities/digitalcc';
import { AsaasOptions } from './option';

@Injectable()
export class AsaasService {
  protected X_API_KEY: string;
  protected URL: string; 
  public digitalAccount: AsaasAccEntity;

  constructor(
    @Inject('CONFIG_OPTIONS')
    options: AsaasOptions,
  ) {
    if (!options.X_API_KEY) {
      throw new Error('X_API_KEY of Asaas is required');
    }

    if (!options.MODE) {
      throw new Error('MODE of Asaas is required');
    }
 
    this.X_API_KEY = options.X_API_KEY;
    this.URL = options.MODE;

    this.digitalAccount = new AsaasAccEntity(options)
  }
}
