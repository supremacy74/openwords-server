import { Module } from '@nestjs/common'

import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module'

import { ResultsModule } from './results/results.module'
import { Result } from './results/results.entity'

import { UsersModule } from './users/users.module'
import { User } from './users/users.entity'

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'root',
            database: 'openwords',
            entities: [User, Result],
            synchronize: true
        }),
        AuthModule,
        UsersModule,
        ResultsModule
    ]
})
export class AppModule {}
