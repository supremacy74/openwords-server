import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from '../users/users.entity'

@Entity()
export class Result {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    word: string

    @Column()
    attempts: number

    @Column()
    correct: number

    @Column()
    wrong: number

    @ManyToOne(() => User, (user) => user.result)
    user: User
}
