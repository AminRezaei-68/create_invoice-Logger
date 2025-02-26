import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
// import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // const appMicro = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.TCP,
  //     options: { port: 5555 },
  //   },
  // );

  // const appRabbit = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.RMQ,
  //     options: {
  //       urls: ['amqp://localhost:5672'],
  //       queue: 'logger_res',
  //       queueOptions: { durable: false },
  //     },
  //   },
  // );

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     transform: true,
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transformOptions: { enableImplicitConversion: true },
  //   }),
  // );

  app.use(cookieParser());

  await app.startAllMicroservices();

  const port = process.env.PORT || 5550;
  await app.listen(port);
  // await appMicro.listen();
  // await appRabbit.listen();
  console.log(`Application is running on: http://localhost:${port}/api`);
}
bootstrap();
