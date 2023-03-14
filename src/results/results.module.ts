import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ResultsController } from './results.controller'
import { ResultsService } from './results.service'
import { Result } from './results.entity'

import { UsersModule } from '../users/users.module'

@Module({
    imports: [TypeOrmModule.forFeature([Result]), UsersModule],
    controllers: [ResultsController],
    providers: [ResultsService]
})
export class ResultsModule {}
