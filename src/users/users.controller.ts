import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Redirect,
    Res
} from '@nestjs/common'

import { UsersService } from './users.service'
import { User } from './users.entity'

import { CreateUserDto } from './dto/createUserInterface'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async get() {
        return this.usersService.get()
    }

    // @Get('/confirm/:code')
    // @Redirect('http://localhost:3000/activation')
    // async confirm(@Param('code') code: string) {
    //     return this.usersService.confirm(code)
    // }

    // @Get(':id')
    // async getOne(@Param('id') id: string) {
    //     return this.usersService.getOne(Number(id))
    // }

    @Post('/confirm')
    async confirm(@Body() user: any) {
        return this.usersService.confirm(user.email, user.code)
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }
}
