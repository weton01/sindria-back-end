import { Injectable, Inject } from '@nestjs/common';
import axios from 'axios';
import { JunoEnvMode, OptionsJuno } from './juno.module';
import qs from 'qs'

@Injectable()
export class JunoService {
  private CLIENT_ID: string;
  private CLIENT_SECRET: string;
  private MODE: JunoEnvMode;
  private TOKEN: string;
  private URL: string;

  constructor(
    @Inject('CONFIG_OPTIONS')
    options: OptionsJuno,
  ) {
    if (!options.CLIENT_ID) throw new Error('CLIENT_ID of Juno is required');
    if (!options.CLIENT_SECRET) throw new Error('CLIENT_SECRET of Juno is required');
    if (!options.MODE) throw new Error('MODE of Juno is required');
    if (!options.TOKEN) throw new Error('TOKEN of Juno is required');

    this.CLIENT_ID = options.CLIENT_ID;
    this.CLIENT_SECRET = options.CLIENT_SECRET;
    this.MODE = options.MODE;
    this.TOKEN = options.TOKEN;

    if (options.MODE === JunoEnvMode.dev)
      this.URL = "https://sandbox.boletobancario.com"
    else
      this.URL = "https://api.juno.com.br"
  }

  public async createAuthToken() {
    const credentials = `${this.CLIENT_ID}:${this.CLIENT_SECRET}`
    const body = qs.stringify({ grant_type: "client_credentials" })
    
    return await axios.post(
      `${this.URL}/authorization-server/oauth/token`,
      body,
      {
        headers: {
          "Authorization": `Basic ${Buffer.from(credentials).toString('base64')}`,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )
  }

  public createDigitalAccount(data: string) {

  }
}
