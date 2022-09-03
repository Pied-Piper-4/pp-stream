import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Public } from '../../common';
import {
  ActivateDeactivateUserDto,
  CreateUserNormal,
  GoogleAuthDto,
  LoginUserNormalDto,
  UpdateUserDto,
} from './dto';
import { LoginUserResponse, UserSignupResponse } from './user.interface';
import { UserDocument } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/signup')
  @Public()
  async createUser(
    @Body() signupDto: CreateUserNormal,
  ): Promise<UserSignupResponse> {
    return this.userService.createUserNormal(signupDto);
  }

  @Post('/google-auth')
  @Public()
  async googleAuth(
    @Body() googleAuthDto: GoogleAuthDto,
  ): Promise<LoginUserResponse> {
    return this.userService.googleAuthentication(googleAuthDto);
  }

  @Post('/login')
  @Public()
  async loginUser(
    @Body() userLoginDto: LoginUserNormalDto,
  ): Promise<LoginUserResponse> {
    return this.userService.login(userLoginDto);
  }

  @Get('/me/:id')
  async getUser(@Param('id') id: string): Promise<UserDocument> {
    return this.userService.getUserById(id);
  }

  @Patch('/me/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Patch('/me/deactivate-activate/:id')
  async deactivateActivateUser(
    @Param('id') id: string,
    @Body() activateDeactivateDto: ActivateDeactivateUserDto,
  ): Promise<UserDocument> {
    return this.userService.deactivateOrActivateAccount(
      id,
      activateDeactivateDto,
    );
  }
}
