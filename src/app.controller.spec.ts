import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { FireDangerService } from './firedanger.service';

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [FireDangerService],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return "Hello World!"', () => {
            expect(appController.getCurrentFireDanger()).toBe('Hello World!');
        });
    });
});
