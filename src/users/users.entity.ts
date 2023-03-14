import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Result } from '../results/results.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    surname: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    @Column()
    code: string

    @Column()
    isConfirmed: boolean

    @OneToMany(() => Result, (result) => result.user)
    result: Array<Result>
}
