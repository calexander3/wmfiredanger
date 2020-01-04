import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { FireDangerService } from './firedanger.service';
import { HttpModule } from '@nestjs/common';

class FireDangerServiceMock {
    getCurrentFireDanger() {
        return Promise.resolve('Very High');
    }
}

describe('AppController', () => {
    let appController: AppController;

    beforeEach(async () => {
        const FireDangerServiceProvider = {
            provide: FireDangerService,
            useClass: FireDangerServiceMock,
        };
        const app: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            controllers: [AppController],
            providers: [FireDangerServiceProvider],
        }).compile();

        appController = app.get<AppController>(AppController);
    });

    describe('root', () => {
        it('should return object for template"', async () => {
            expect(await appController.getCurrentFireDanger())
                .toStrictEqual({ cssClass: 'veryhigh', rating: 'Very High' });
        });
    });
});
