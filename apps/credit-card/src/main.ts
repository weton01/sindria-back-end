import { NestFactory } from '@nestjs/core';
import { CreditCardModule } from './credit-card.module';

async function bootstrap() {
  const app = await NestFactory.create(CreditCardModule);
  await app.listen(3000);
}
bootstrap();
