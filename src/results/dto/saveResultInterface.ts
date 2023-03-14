import { CreateResultDto } from './createResultInterface'

export interface SaveResultDto {
    readonly email: string
    readonly results: Array<CreateResultDto>
}
