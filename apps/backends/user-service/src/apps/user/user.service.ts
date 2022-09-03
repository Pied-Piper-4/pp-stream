import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserNormal, LoginUserNormalDto } from './dto';
import { LoginUserResponse, UserSignupResponse } from './user.interface';
import { User as UserModel, UserDocument } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async findUserByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email });
  }

  async createUserNormal(
    userDto: CreateUserNormal,
  ): Promise<UserSignupResponse> {
    const user = await this.findUserByEmail(userDto.email);

    if (user) {
      throw new HttpException('User already exists', 400);
    }

    const newUser = new this.userModel(userDto);
    const savedUser = await newUser.save();

    // Publish to all connected services

    delete savedUser.password;
    const token = this.jwtService.sign(savedUser);
    return {
      message: 'User created successfully',
      user: savedUser,
      token,
    };
  }

  async login(userDto: LoginUserNormalDto): Promise<LoginUserResponse> {
    const user = await this.findUserByEmail(userDto.email);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const isPasswordValid = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', 400);
    }

    delete user.password;

    const token = this.jwtService.sign(user);
    return {
      message: 'User logged in successfully',
      user,
      token,
    };
  }

  async getUserById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id);
  }
}
