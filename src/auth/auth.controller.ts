import {
    Body,
    Controller,
    Get,
    Post,
    Headers,
    UnauthorizedException,
    Req,
    Param
} from '@nestjs/common'

import { CreateUserDto } from '../users/dto/createUserInterface'

import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto)
    }

    @Post('/login')
    async login(@Body() data: { email: string; password: string }) {
        return this.authService.login(data.email, data.password)
    }

    @Get()
    async getData(@Headers('Authorization') authorization: string) {
        if (!authorization) {
            return null
        }

        const token = authorization.replace('Bearer ', '')

        const user = await this.authService.verify(token)

        if (user) {
            return user
        } else {
            return null
        }
    }
}
