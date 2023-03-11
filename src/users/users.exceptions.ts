import { NotFoundException } from '@nestjs/common'

export class DuplicateEmailException extends NotFoundException {
    constructor() {
        super(`User with this email already exists`)
    }
}
