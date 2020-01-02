import { Injectable, HttpService } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class FireDangerService {
    constructor(private readonly httpService: HttpService) { }
    getCurrentFireDanger(): Promise<string> {
        return this.httpService.get('http://weather.gfc.state.ga.us/Current2/GARAWS-OUT.aspx').toPromise().then(response => {
            const $ = cheerio.load(response.data);
            return $("a[name='Camp Merrill'] > table > tbody > tr:nth-child(3) > td:nth-child(4) > font").text();
        });
    }
}
