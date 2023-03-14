import { Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { Result } from './results.entity'

import { User } from '../users/users.entity'

import { SaveResultDto } from './dto/saveResultInterface'
import { CreateResultDto } from './dto/createResultInterface'

import { UsersService } from '../users/users.service'

@Injectable()
export class ResultsService {
    constructor(
        private readonly usersService: UsersService,
        @InjectRepository(Result)
        private readonly resultRepository: Repository<Result>
    ) {}

    async get() {
        const results = await this.resultRepository.find({
            relations: ['user']
        })

        return results
    }

    async getByEmail(email) {
        console.log(email)
        const user = await this.usersService.getOne(email)

        console.log(user)

        const results = await this.resultRepository.find({
            relations: ['user'],
            where: { user }
        })

        return results
    }

    async save(saveResultDto: SaveResultDto) {
        const user = await this.usersService.getOne(saveResultDto.email)

        if (!user) {
            return null
        }

        for (const createResultDto of saveResultDto.results) {
            const existing = await this.resultRepository.findOne({
                where: { user, word: createResultDto.word }
            })

            if (existing) {
                existing.attempts += createResultDto.attempts
                existing.correct += createResultDto.correct
                existing.wrong += createResultDto.wrong

                await this.resultRepository.save(existing)
            } else {
                const result = new Result()

                result.word = createResultDto.word
                result.attempts = createResultDto.attempts
                result.correct = createResultDto.correct
                result.wrong = createResultDto.wrong

                result.user = user

                await this.resultRepository.save(result)
            }
        }

        return true
    }
}
