import { Test, TestingModule } from '@nestjs/testing';
import { CreditCardController } from './credit-card.controller';
import { CreditCardService } from './credit-card.service';

describe('CreditCardController', () => {
  let creditCardController: CreditCardController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CreditCardController],
      providers: [CreditCardService],
    }).compile();

    creditCardController = app.get<CreditCardController>(CreditCardController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(creditCardController.getHello()).toBe('Hello World!');
    });
  });
});
