import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../entities/user';
import { Model } from 'mongoose';
import { SignUpDto } from '../dtos/user/signup';
import { UpdateUserDto } from '../dtos/user/update';
import { SignUpSocialDto } from '../dtos/user/signin-social';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: SignUpDto | SignUpSocialDto): Promise<User> {
    const rdm = 1000 + Math.random() * 9000;
    const activationCode = Math.floor(rdm).toString();

    createUserDto.cellphone = `+55${createUserDto.cellphone}`;

    const createdUser = new this.userModel({
      ...createUserDto,
      activationCode,
    });

    return await createdUser.save();
  }

  async update(_id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userModel.findByIdAndUpdate(_id, updateUserDto);
    return await this.userModel.findById(_id);
  }

  async delete(_id: string): Promise<any> {
    return await this.userModel.findByIdAndDelete(_id);
  }

  async findOne(value: any): Promise<User> {
    return await this.userModel.findOne({ ...value }).lean();
  }

  async findById(_id: string): Promise<User> {
    return await this.userModel.findById(_id).lean();
  }

  async changePassword(_id: string, password: string): Promise<any> {
    return await this.userModel.findByIdAndUpdate(_id, { password: password });
  }

  async activeUser(_id: string): Promise<any> {
    return await this.userModel.findByIdAndUpdate(_id, { active: true });
  }

  async passportLogin(req): Promise<any> {
    return req.user;
  }
}
