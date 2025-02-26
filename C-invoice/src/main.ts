import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.TCP,
        options: { port: 5557 },
    });

    // const appM = await NestFactory.create(AppModule);
    // const appRabbit = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    //     transport: Transport.RMQ,
    //     options: {
    //         urls: ['amqp://localhost:5672'],
    //         queue: 'invoice_queue',
    //         queueOptions: { durable: false },
    //     },
    // });

    // app.useGlobalPipes(
    //   new ValidationPipe({
    //     transform: true,
    //     whitelist: true,
    //     forbidNonWhitelisted: true,
    //     transformOptions: { enableImplicitConversion: true },
    //   }),
    // );

    // app.use(cookieParser());

    // await app.startAllMicroservices();

    // const port = process.env.PORT || 5550;
    // await appM.listen(port);
    await app.listen();
    // await appRabbit.listen();

    console.log(`Application is running.`);
}
bootstrap();
