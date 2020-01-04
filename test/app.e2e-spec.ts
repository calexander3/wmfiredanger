import { Test, TestingModule } from '@nestjs/testing';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as request from 'supertest';
import { join } from 'path';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
    let app: NestExpressApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.useStaticAssets(join(__dirname, '..', 'public'));
        app.setBaseViewsDir(join(__dirname, '..', 'views'));
        app.setViewEngine('hbs');
        await app.init();
    });

    it('/ (GET)', () => {
        return request(app.getHttpServer())
            .get('/')
            .expect(200)
            .expect(/Fire Danger/gm);
    });
});
