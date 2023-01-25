import { Body, Controller, Post } from '@nestjs/common';
import { LoginDTO, UserModel } from 'src/data/contract/user.contract';
import { AuthService } from 'src/infrastructure/services/auth.service';

@Controller('auth')
export class AuthController  {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  login(@Body() params: LoginDTO) {
    return this.authService.login(params);
  }
}
