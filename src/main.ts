import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule)
    const port = 5000

    app.enableCors()
    app.setGlobalPrefix('api')

    await app.listen(port, () =>
        console.log(`The server has been started. Port: ${port}.`)
    )
}

bootstrap()
