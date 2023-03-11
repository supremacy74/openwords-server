import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { User } from '../users/users.entity'

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
