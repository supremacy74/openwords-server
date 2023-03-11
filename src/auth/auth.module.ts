import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

import { UsersModule } from '../users/users.module'

@Module({
    imports: [
        UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '10m' }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}
