import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptAdapter {
  public async hash(value: string) {
    return await bcrypt.hash(value, 10);
  }

  public async compare(value: string, toCompare: string) {
    return await bcrypt.compare(value, toCompare);
  }
}
