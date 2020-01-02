import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { FireDangerService } from './firedanger.service';

@Module({
    imports: [HttpModule],
    controllers: [AppController],
    providers: [FireDangerService],
})
export class AppModule { }
