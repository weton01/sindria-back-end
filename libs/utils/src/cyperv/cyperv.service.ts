import { Injectable, Inject } from '@nestjs/common';
import { OptionsCyperv } from './cyperv.module';
import crypto from 'crypto';

@Injectable()
export class CypervService {
  private ALGORITHM: string;
  private ENCODING: BufferEncoding;
  private IV_LENGTH: number;
  private KEY: string;

  constructor(
    @Inject('CONFIG_OPTIONS')
    options: OptionsCyperv,
  ) {
    if (!options.ALGORITHM) throw new Error('ALGORITHM of cyperv is required');
    if (!options.ENCODING) throw new Error('ENCODING of cyperv is required');
    if (!options.IV_LENGTH) throw new Error('IV_LENGTH of cyperv is required');
    if (!options.KEY) throw new Error('KEY of cyperv is required');

    this.ALGORITHM = options.ALGORITHM;
    this.ENCODING = options.ENCODING;
    this.IV_LENGTH = options.IV_LENGTH;
    this.KEY = options.KEY;
  }

  public encrypt(data: string) {
    const sha256 = crypto.createHash('sha256');
    sha256.update(this.KEY);
    const iv = crypto.randomBytes(this.IV_LENGTH);
    const cipher = crypto.createCipheriv(
      this.ALGORITHM,
      Buffer.from(sha256.digest()),
      iv,
    );
    return Buffer.concat([cipher.update(data), cipher.final(), iv]).toString(
      this.ENCODING,
    );
  }

  public decrypt(data: string) {
    const sha256 = crypto.createHash('sha256');
    sha256.update(this.KEY);
    const binaryData = new Buffer(data, this.ENCODING);
    const iv = binaryData.slice(-this.IV_LENGTH);
    const encryptedData = binaryData.slice(
      0,
      binaryData.length - this.IV_LENGTH,
    );
    const decipher = crypto.createDecipheriv(
      this.ALGORITHM,
      Buffer.from(sha256.digest()),
      iv,
    );

    return Buffer.concat([
      decipher.update(encryptedData),
      decipher.final(),
    ]).toString();
  }
}
