import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'

import { CreateUserDto } from '../users/dto/createUserInterface'

import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async verify(token: string) {
        try {
            const decoded = await this.jwtService.verify(token)
            const user = await this.usersService.getOne(decoded.email)
            return user
        } catch (error) {
            return null
        }
    }

    async login(email: string, password: string): Promise<any> {
        const user = await this.usersService.getOne(email)

        if (!user.isConfirmed) {
            return null
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { email: user.email, id: user.id }

            return {
                accessToken: this.jwtService.sign(payload, {
                    expiresIn: '30d'
                })
            }
        }

        return null
    }

    async register(createUserDto: CreateUserDto): Promise<any> {
        const user = await this.usersService.create(createUserDto)

        if (user) {
            return { user, message: 'User created successfully' }
        }
    }
}
