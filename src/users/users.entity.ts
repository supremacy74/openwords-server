import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

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
}
