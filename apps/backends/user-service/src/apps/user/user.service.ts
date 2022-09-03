import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ActivateDeactivateUserDto,
  CreateUserNormal,
  GoogleAuthDto,
  LoginUserNormalDto,
  UpdateUserDto,
} from './dto';
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
    return this.userModel.findOne({ email }).lean();
  }

  async createUserNormal(
    userDto: CreateUserNormal,
  ): Promise<UserSignupResponse> {
    const user = await this.findUserByEmail(userDto.email);

    if (user) {
      throw new HttpException('User already exists', 400);
    }

    const newUser = new this.userModel(userDto);
    await newUser.save();
    const savedUser = await this.findUserByEmail(userDto.email);
    // Publish to all connected services

    delete savedUser.password;
    const token = this.jwtService.sign(savedUser);
    return {
      message: 'User created successfully',
      data: savedUser,
      token,
      status: 'success',
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
      data: user,
      token,
      status: 'success',
    };
  }

  async getUserById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).lean();
  }

  async googleAuthentication(
    userDto: GoogleAuthDto,
  ): Promise<LoginUserResponse> {
    let user = await this.findUserByEmail(userDto.email);

    if (!user) {
      user = new this.userModel(userDto);
      await user.save();
      const newUser = await this.findUserByEmail(userDto.email);

      const token = this.jwtService.sign(newUser);

      return {
        message: 'User logged in successfully',
        data: newUser,
        token,
        status: 'success',
      };
    }

    const newUser = await this.findUserByEmail(userDto.email);

    const token = this.jwtService.sign(newUser);

    return {
      message: 'User logged in successfully',
      data: user,
      token,
      status: 'success',
    };
  }

  async updateUser(id: string, userDto: UpdateUserDto): Promise<UserDocument> {
    let user = await this.userModel.findById(id);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    user = await this.userModel.findByIdAndUpdate(id, userDto, {
      new: true,
    });

    return user;
  }

  async deactivateOrActivateAccount(
    id: string,
    isActive: ActivateDeactivateUserDto,
  ): Promise<UserDocument> {
    let user = await this.userModel.findById(id);

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    user = await this.userModel.findByIdAndUpdate(
      id,
      { isActive },
      { new: true },
    );

    return user;
  }
}
