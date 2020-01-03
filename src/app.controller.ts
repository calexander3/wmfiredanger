import { Controller, Get, Render } from '@nestjs/common';
import { FireDangerService } from './firedanger.service';

@Controller()
export class AppController {
    constructor(private readonly fireDangerService: FireDangerService) { }

    @Get()
    @Render('index')
    async getCurrentFireDanger() {
        const rating = await this.fireDangerService.getCurrentFireDanger();
        const cssClass = rating.split(' ').join('').toLowerCase();
        return { rating, cssClass };
    }
}
