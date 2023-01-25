import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO, RegisterUserDTO } from 'src/data/contract/user.contract';
import { AuthService } from 'src/infrastructure/services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  login(@Body() params: LoginDTO) {
    return this.authService.login(params);
  }
  @Post('/register')
  register(@Body() params: RegisterUserDTO) {
    return this.authService.register(params);
  }
}
