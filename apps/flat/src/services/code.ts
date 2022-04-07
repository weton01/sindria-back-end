import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { Code, CodeDocument } from '../entities/code';
import { User } from '../entities/user';
import { ObjectId } from 'mongodb';
import { envs } from '../utils/envs/envs';

@Injectable()
export class CodeService {
  constructor(
    @InjectTwilio()
    private readonly twilio: TwilioClient,
    @InjectModel(Code.name)
    private model: Model<CodeDocument>,
  ) {}

  public async create(user: User): Promise<Code> {
    const rdm = 1000 + Math.random() * 9000;
    const code = Math.floor(rdm).toString();

    const createdCode = new this.model({ code, user: { ...user } });
    await createdCode.save();
    await this.sendCode(user);
    return createdCode;
  }

  public async validate(user: User, code: number): Promise<Code> {
    const foundCode = await this.model
      .find({
        'user._id': user._id,
      })
      .sort({ createdAt: -1 });

    if (
      foundCode &&
      foundCode[0] &&
      !foundCode[0].used &&
      foundCode[0].code === code
    )
      this.inutilize(foundCode[0]);

    if (foundCode && foundCode[0]) return foundCode[0];
    return null;
  }

  public async sendCode(user: User) {
    const foundCodes = await this.model
      .find({
        'user._id:': new ObjectId(user._id),
      })
      .sort({ createdAt: -1 });

    await this.twilio.messages.create({
      body: foundCodes[0].code.toString(),
      from: envs.TWSENDER,
      to: user.cellphone,
    });
  }

  private async inutilize(code: Code): Promise<any> {
    return await this.model.findByIdAndUpdate(code._id, { used: true });
  }
}
