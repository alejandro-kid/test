import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3030;
  await app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port} 🚀`);
  });
}
bootstrap();
