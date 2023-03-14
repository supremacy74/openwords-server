import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'

import { SaveResultDto } from './dto/saveResultInterface'

import { ResultsService } from './results.service'

@Controller('results')
export class ResultsController {
    constructor(private readonly resultsService: ResultsService) {}

    @Get()
    async get() {
        return await this.resultsService.get()
    }

    @Get('/byEmail')
    async getByEmail(@Query('email') email: string) {
        return await this.resultsService.getByEmail(email)
    }

    @Post()
    async save(@Body() saveResultDto: SaveResultDto) {
        return await this.resultsService.save(saveResultDto)
    }
}
