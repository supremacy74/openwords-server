import { Injectable, NotFoundException } from '@nestjs/common'

import { InjectRepository } from '@nestjs/typeorm'

import { v4 } from 'uuid'

import * as bcrypt from 'bcrypt'

import { Repository } from 'typeorm'

import { User } from './users.entity'

import { CreateUserDto } from './dto/createUserInterface'

import { DuplicateEmailException } from './users.exceptions'

import confirm from './lib/confirm'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    async get(): Promise<Array<User>> {
        return this.userRepository.find()
    }

    async getOne(email: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } })

        if (!user) {
            return null
        }

        return user
    }

    async create(createUserDto: any): Promise<User> {
        const { email } = createUserDto

        const existingUser = await this.userRepository.findOne({
            where: { email }
        })

        if (existingUser) {
            if (existingUser.isConfirmed) {
                return null
            } else {
                await this.userRepository.remove(existingUser)
            }
        }

        // const code = v4()
        let code = String(Math.floor(Math.random() * 90000) + 10000)

        const isConfirmed = false

        const user = new User()

        user.name = createUserDto.name
        user.surname = createUserDto.surname
        user.email = createUserDto.email

        user.password = await bcrypt.hash(createUserDto.password, 10)

        await confirm(email, code)

        code = await bcrypt.hash(code, 10)

        return this.userRepository.save({ ...user, code, isConfirmed })
    }

    async confirm(email: string, code: string) {
        try {
            const user = await this.userRepository.findOne({ where: { email } })

            if (!user) {
                return null
            }

            const isMatched = await bcrypt.compare(code, user.code)

            if (!isMatched) {
                return null
            }

            user.isConfirmed = true

            await this.userRepository.save(user)

            return {
                user,
                message: 'The account has been successfully verified'
            }
        } catch (error) {
            return null
        }
    }

    // async confirm(code: string) {
    //     try {
    //         const user = await this.userRepository.findOne({ where: { code } })
    //
    //         if (!user) {
    //             return null
    //         }
    //
    //         user.isConfirmed = true
    //
    //         await this.userRepository.save(user)
    //
    //         return {
    //             user,
    //             message: 'The account has been successfully verified'
    //         }
    //     } catch (error) {
    //         return null
    //     }
    // }
}
