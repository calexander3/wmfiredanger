import { FireDangerService } from './firedanger.service';
import { HttpService } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';

describe('FireDangerService', () => {
    it('should return low danger', async () => {
        const httpResponse: AxiosResponse = {
            data: `
            <html><body bgcolor="#C0C0C0" leftmargin="5" topmargin="5">
           <TABLE CELLSPACING="0" BORDER="1" CELLPADDING="2" WIDTH="100%" ALIGN="center"
                bordercolor="#000000" bgcolor="#FFFFFF">
           <TR><TD ALIGN="center">
           <A NAME="Camp Merrill">
           <table CELLSPACING="0" BORDER="1" CELLPADDING="2" WIDTH="600">
           <tr>
           <th colspan=3>Camp Merrill, Ga                  </th>
           <th colspan=6> Observed NFDRS-88 at 1300 EST Jan  2 2020</th>
           </tr>
           <tr>
           <td bgcolor="#C0C0C0" WIDTH=50><b><font size=2> RH (%)   </td>
           <td bgcolor="#C0C0C0" WIDTH=60><b><font size=2> IC    </td>
           <td bgcolor="#C0C0C0" WIDTH=60><b><font size=2> BI    </td>
           <td bgcolor="#C0C0C0" WIDTH=100><b><font size=2> Class Day </td>
           <td bgcolor="#C0C0C0" WIDTH=55><b><font size=2> KBDI  </td>
           <td bgcolor="#C0C0C0" WIDTH=80><b><font size=2> Wind (mph) </td>
           <td bgcolor="#C0C0C0" WIDTH=80><b><font size=2> Mx_Wind<br> (mph) </td>
           <td bgcolor="#C0C0C0" WIDTH=40><b><font size=2> Rn24<br> (inch) </td>
           <td bgcolor="#C0C0C0" WIDTH=50><b><font size=2> Dur<br> (Hr) </td>
           </tr>
           <tr>
           <td align=center><font size=2>         100</td>
           <td align=center><font size=2>           0</td>
           <td align=center><font size=2>           0</td>
           <td align=center><font size=2>1
               Low</TD>
           <td align=center><font size=2>          12</td>
           <td align=center><font size=2>E              2</td>
           <td align=center><font size=2>E              3</td>
           <td align=center><font size=2> 0.11</td>
           <td align=center><font size=2>           3</td>
           </tr>
           <tr>
           <td bgcolor="#C0C0C0"><b><font size=2> Sow  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Temp  (°F)  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Td  (°F) </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Tmax  (°F)  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Tmin  (°F) </td>
           <td bgcolor="#C0C0C0"><b><font size=2> RHMax (%)</td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> RHMin (%)</td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> HrbGF</td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> WdyGF</td>
           </tr>
           <tr>
           <td align=center><font size=2>           6</td>
           <td align=center><font size=2>          43</td>
           <td align=center><font size=2>          43</td>
           <td align=center><font size=2>          55</td>
           <td align=center><font size=2>          40</td>
           <td align=center><font size=2>         100</td>
           <td colspan=1 align=center><font size=2>          22</td>
           <td colspan=1 align=center><font size=2>           0</td>
           <td colspan=1 align=center><font size=2>           0</td>
           </tr>
           <tr>
           <td bgcolor="#C0C0C0"><b><font size=2>1-Hour</td>
           <td bgcolor="#C0C0C0"><b><font size=2> 10-Hour  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> 100-Hour </td>
           <td bgcolor="#C0C0C0"><b><font size=2> 1000-Hour</td>
           <td bgcolor="#C0C0C0"><b><font size=2> X1000 </td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> Herbaceous</td>
           <td bgcolor="#C0C0C0" colspan=1><b> <font size=2>Woody</td>
           <td bgcolor="#C0C0C0"><b><font size=2> SC</td>
           <td bgcolor="#C0C0C0"><b><font size=2> EC</td>
           </tr>
           <tr>
           <td align=center><font size=2> 18.3</td>
           <td align=center><font size=2> 18.3</td>
           <td align=center><font size=2> 18.0</td>
           <td align=center><font size=2> 28.7</td>
           <td align=center><font size=2> 28.7</td>
           <td colspan=1 align=center> <font size=2> 18.3</td>
           <td colspan=1 align=center> <font size=2> 70.0</td>
           <td align=center><font size=2>           0</td>
           <td align=center ><font size=2>            1</td>
           </tr>
           </TABLE><P>
           <table CELLSPACING="0" BORDER="0" CELLPADDING="2" WIDTH="600">
           <tr>
           <th> <Font size="4"><b><a href="http://weather.gfc.state.ga.us">
           Back to Fire Weather Home</a></th>
           </tr>
           <tr>
           <th> <Font size="4"><b><a href="http://www.gfc.state.ga.us">
           Back to Georgia Forestry Commission Home</a></th>
           </tr>
           <table>
           </TD></TR></TABLE></BODY></html>
          `,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
        const httpService = new HttpService();
        jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(httpResponse));
        const fds = new FireDangerService(httpService);
        const result = await fds.getCurrentFireDanger();
        expect(result).toBe('Low');
    });
    it('should return moderate danger', async () => {
        const httpResponse: AxiosResponse = {
            data: `
            <html><body bgcolor="#C0C0C0" leftmargin="5" topmargin="5">
           <TABLE CELLSPACING="0" BORDER="1" CELLPADDING="2" WIDTH="100%" ALIGN="center"
                bordercolor="#000000" bgcolor="#FFFFFF">
           <TR><TD ALIGN="center">
           <A NAME="Camp Merrill">
           <table CELLSPACING="0" BORDER="1" CELLPADDING="2" WIDTH="600">
           <tr>
           <th colspan=3>Camp Merrill, Ga                  </th>
           <th colspan=6> Observed NFDRS-88 at 1300 EST Jan  2 2020</th>
           </tr>
           <tr>
           <td bgcolor="#C0C0C0" WIDTH=50><b><font size=2> RH (%)   </td>
           <td bgcolor="#C0C0C0" WIDTH=60><b><font size=2> IC    </td>
           <td bgcolor="#C0C0C0" WIDTH=60><b><font size=2> BI    </td>
           <td bgcolor="#C0C0C0" WIDTH=100><b><font size=2> Class Day </td>
           <td bgcolor="#C0C0C0" WIDTH=55><b><font size=2> KBDI  </td>
           <td bgcolor="#C0C0C0" WIDTH=80><b><font size=2> Wind (mph) </td>
           <td bgcolor="#C0C0C0" WIDTH=80><b><font size=2> Mx_Wind<br> (mph) </td>
           <td bgcolor="#C0C0C0" WIDTH=40><b><font size=2> Rn24<br> (inch) </td>
           <td bgcolor="#C0C0C0" WIDTH=50><b><font size=2> Dur<br> (Hr) </td>
           </tr>
           <tr>
           <td align=center><font size=2>         100</td>
           <td align=center><font size=2>           0</td>
           <td align=center><font size=2>           0</td>
           <td align=center><font size=2>2
               Moderate</TD>
           <td align=center><font size=2>          12</td>
           <td align=center><font size=2>E              2</td>
           <td align=center><font size=2>E              3</td>
           <td align=center><font size=2> 0.11</td>
           <td align=center><font size=2>           3</td>
           </tr>
           <tr>
           <td bgcolor="#C0C0C0"><b><font size=2> Sow  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Temp  (°F)  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Td  (°F) </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Tmax  (°F)  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Tmin  (°F) </td>
           <td bgcolor="#C0C0C0"><b><font size=2> RHMax (%)</td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> RHMin (%)</td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> HrbGF</td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> WdyGF</td>
           </tr>
           <tr>
           <td align=center><font size=2>           6</td>
           <td align=center><font size=2>          43</td>
           <td align=center><font size=2>          43</td>
           <td align=center><font size=2>          55</td>
           <td align=center><font size=2>          40</td>
           <td align=center><font size=2>         100</td>
           <td colspan=1 align=center><font size=2>          22</td>
           <td colspan=1 align=center><font size=2>           0</td>
           <td colspan=1 align=center><font size=2>           0</td>
           </tr>
           <tr>
           <td bgcolor="#C0C0C0"><b><font size=2>1-Hour</td>
           <td bgcolor="#C0C0C0"><b><font size=2> 10-Hour  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> 100-Hour </td>
           <td bgcolor="#C0C0C0"><b><font size=2> 1000-Hour</td>
           <td bgcolor="#C0C0C0"><b><font size=2> X1000 </td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> Herbaceous</td>
           <td bgcolor="#C0C0C0" colspan=1><b> <font size=2>Woody</td>
           <td bgcolor="#C0C0C0"><b><font size=2> SC</td>
           <td bgcolor="#C0C0C0"><b><font size=2> EC</td>
           </tr>
           <tr>
           <td align=center><font size=2> 18.3</td>
           <td align=center><font size=2> 18.3</td>
           <td align=center><font size=2> 18.0</td>
           <td align=center><font size=2> 28.7</td>
           <td align=center><font size=2> 28.7</td>
           <td colspan=1 align=center> <font size=2> 18.3</td>
           <td colspan=1 align=center> <font size=2> 70.0</td>
           <td align=center><font size=2>           0</td>
           <td align=center ><font size=2>            1</td>
           </tr>
           </TABLE><P>
           <table CELLSPACING="0" BORDER="0" CELLPADDING="2" WIDTH="600">
           <tr>
           <th> <Font size="4"><b><a href="http://weather.gfc.state.ga.us">
           Back to Fire Weather Home</a></th>
           </tr>
           <tr>
           <th> <Font size="4"><b><a href="http://www.gfc.state.ga.us">
           Back to Georgia Forestry Commission Home</a></th>
           </tr>
           <table>
           </TD></TR></TABLE></BODY></html>
          `,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
        const httpService = new HttpService();
        jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(httpResponse));
        const fds = new FireDangerService(httpService);
        const result = await fds.getCurrentFireDanger();
        expect(result).toBe('Moderate');
    });
    it('should return high danger', async () => {
        const httpResponse: AxiosResponse = {
            data: `
            <html><body bgcolor="#C0C0C0" leftmargin="5" topmargin="5">
           <TABLE CELLSPACING="0" BORDER="1" CELLPADDING="2" WIDTH="100%" ALIGN="center"
                bordercolor="#000000" bgcolor="#FFFFFF">
           <TR><TD ALIGN="center">
           <A NAME="Camp Merrill">
           <table CELLSPACING="0" BORDER="1" CELLPADDING="2" WIDTH="600">
           <tr>
           <th colspan=3>Camp Merrill, Ga                  </th>
           <th colspan=6> Observed NFDRS-88 at 1300 EST Jan  2 2020</th>
           </tr>
           <tr>
           <td bgcolor="#C0C0C0" WIDTH=50><b><font size=2> RH (%)   </td>
           <td bgcolor="#C0C0C0" WIDTH=60><b><font size=2> IC    </td>
           <td bgcolor="#C0C0C0" WIDTH=60><b><font size=2> BI    </td>
           <td bgcolor="#C0C0C0" WIDTH=100><b><font size=2> Class Day </td>
           <td bgcolor="#C0C0C0" WIDTH=55><b><font size=2> KBDI  </td>
           <td bgcolor="#C0C0C0" WIDTH=80><b><font size=2> Wind (mph) </td>
           <td bgcolor="#C0C0C0" WIDTH=80><b><font size=2> Mx_Wind<br> (mph) </td>
           <td bgcolor="#C0C0C0" WIDTH=40><b><font size=2> Rn24<br> (inch) </td>
           <td bgcolor="#C0C0C0" WIDTH=50><b><font size=2> Dur<br> (Hr) </td>
           </tr>
           <tr>
           <td align=center><font size=2>         100</td>
           <td align=center><font size=2>           0</td>
           <td align=center><font size=2>           0</td>
           <td align=center><font size=2>3
               High</TD>
           <td align=center><font size=2>          12</td>
           <td align=center><font size=2>E              2</td>
           <td align=center><font size=2>E              3</td>
           <td align=center><font size=2> 0.11</td>
           <td align=center><font size=2>           3</td>
           </tr>
           <tr>
           <td bgcolor="#C0C0C0"><b><font size=2> Sow  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Temp  (°F)  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Td  (°F) </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Tmax  (°F)  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Tmin  (°F) </td>
           <td bgcolor="#C0C0C0"><b><font size=2> RHMax (%)</td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> RHMin (%)</td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> HrbGF</td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> WdyGF</td>
           </tr>
           <tr>
           <td align=center><font size=2>           6</td>
           <td align=center><font size=2>          43</td>
           <td align=center><font size=2>          43</td>
           <td align=center><font size=2>          55</td>
           <td align=center><font size=2>          40</td>
           <td align=center><font size=2>         100</td>
           <td colspan=1 align=center><font size=2>          22</td>
           <td colspan=1 align=center><font size=2>           0</td>
           <td colspan=1 align=center><font size=2>           0</td>
           </tr>
           <tr>
           <td bgcolor="#C0C0C0"><b><font size=2>1-Hour</td>
           <td bgcolor="#C0C0C0"><b><font size=2> 10-Hour  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> 100-Hour </td>
           <td bgcolor="#C0C0C0"><b><font size=2> 1000-Hour</td>
           <td bgcolor="#C0C0C0"><b><font size=2> X1000 </td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> Herbaceous</td>
           <td bgcolor="#C0C0C0" colspan=1><b> <font size=2>Woody</td>
           <td bgcolor="#C0C0C0"><b><font size=2> SC</td>
           <td bgcolor="#C0C0C0"><b><font size=2> EC</td>
           </tr>
           <tr>
           <td align=center><font size=2> 18.3</td>
           <td align=center><font size=2> 18.3</td>
           <td align=center><font size=2> 18.0</td>
           <td align=center><font size=2> 28.7</td>
           <td align=center><font size=2> 28.7</td>
           <td colspan=1 align=center> <font size=2> 18.3</td>
           <td colspan=1 align=center> <font size=2> 70.0</td>
           <td align=center><font size=2>           0</td>
           <td align=center ><font size=2>            1</td>
           </tr>
           </TABLE><P>
           <table CELLSPACING="0" BORDER="0" CELLPADDING="2" WIDTH="600">
           <tr>
           <th> <Font size="4"><b><a href="http://weather.gfc.state.ga.us">
           Back to Fire Weather Home</a></th>
           </tr>
           <tr>
           <th> <Font size="4"><b><a href="http://www.gfc.state.ga.us">
           Back to Georgia Forestry Commission Home</a></th>
           </tr>
           <table>
           </TD></TR></TABLE></BODY></html>
          `,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
        const httpService = new HttpService();
        jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(httpResponse));
        const fds = new FireDangerService(httpService);
        const result = await fds.getCurrentFireDanger();
        expect(result).toBe('High');
    });
    it('should return very high danger', async () => {
        const httpResponse: AxiosResponse = {
            data: `
            <html><body bgcolor="#C0C0C0" leftmargin="5" topmargin="5">
           <TABLE CELLSPACING="0" BORDER="1" CELLPADDING="2" WIDTH="100%" ALIGN="center"
                bordercolor="#000000" bgcolor="#FFFFFF">
           <TR><TD ALIGN="center">
           <A NAME="Camp Merrill">
           <table CELLSPACING="0" BORDER="1" CELLPADDING="2" WIDTH="600">
           <tr>
           <th colspan=3>Camp Merrill, Ga                  </th>
           <th colspan=6> Observed NFDRS-88 at 1300 EST Jan  2 2020</th>
           </tr>
           <tr>
           <td bgcolor="#C0C0C0" WIDTH=50><b><font size=2> RH (%)   </td>
           <td bgcolor="#C0C0C0" WIDTH=60><b><font size=2> IC    </td>
           <td bgcolor="#C0C0C0" WIDTH=60><b><font size=2> BI    </td>
           <td bgcolor="#C0C0C0" WIDTH=100><b><font size=2> Class Day </td>
           <td bgcolor="#C0C0C0" WIDTH=55><b><font size=2> KBDI  </td>
           <td bgcolor="#C0C0C0" WIDTH=80><b><font size=2> Wind (mph) </td>
           <td bgcolor="#C0C0C0" WIDTH=80><b><font size=2> Mx_Wind<br> (mph) </td>
           <td bgcolor="#C0C0C0" WIDTH=40><b><font size=2> Rn24<br> (inch) </td>
           <td bgcolor="#C0C0C0" WIDTH=50><b><font size=2> Dur<br> (Hr) </td>
           </tr>
           <tr>
           <td align=center><font size=2>         100</td>
           <td align=center><font size=2>           0</td>
           <td align=center><font size=2>           0</td>
           <td align=center><font size=2>4
               Very High</TD>
           <td align=center><font size=2>          12</td>
           <td align=center><font size=2>E              2</td>
           <td align=center><font size=2>E              3</td>
           <td align=center><font size=2> 0.11</td>
           <td align=center><font size=2>           3</td>
           </tr>
           <tr>
           <td bgcolor="#C0C0C0"><b><font size=2> Sow  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Temp  (°F)  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Td  (°F) </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Tmax  (°F)  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Tmin  (°F) </td>
           <td bgcolor="#C0C0C0"><b><font size=2> RHMax (%)</td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> RHMin (%)</td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> HrbGF</td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> WdyGF</td>
           </tr>
           <tr>
           <td align=center><font size=2>           6</td>
           <td align=center><font size=2>          43</td>
           <td align=center><font size=2>          43</td>
           <td align=center><font size=2>          55</td>
           <td align=center><font size=2>          40</td>
           <td align=center><font size=2>         100</td>
           <td colspan=1 align=center><font size=2>          22</td>
           <td colspan=1 align=center><font size=2>           0</td>
           <td colspan=1 align=center><font size=2>           0</td>
           </tr>
           <tr>
           <td bgcolor="#C0C0C0"><b><font size=2>1-Hour</td>
           <td bgcolor="#C0C0C0"><b><font size=2> 10-Hour  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> 100-Hour </td>
           <td bgcolor="#C0C0C0"><b><font size=2> 1000-Hour</td>
           <td bgcolor="#C0C0C0"><b><font size=2> X1000 </td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> Herbaceous</td>
           <td bgcolor="#C0C0C0" colspan=1><b> <font size=2>Woody</td>
           <td bgcolor="#C0C0C0"><b><font size=2> SC</td>
           <td bgcolor="#C0C0C0"><b><font size=2> EC</td>
           </tr>
           <tr>
           <td align=center><font size=2> 18.3</td>
           <td align=center><font size=2> 18.3</td>
           <td align=center><font size=2> 18.0</td>
           <td align=center><font size=2> 28.7</td>
           <td align=center><font size=2> 28.7</td>
           <td colspan=1 align=center> <font size=2> 18.3</td>
           <td colspan=1 align=center> <font size=2> 70.0</td>
           <td align=center><font size=2>           0</td>
           <td align=center ><font size=2>            1</td>
           </tr>
           </TABLE><P>
           <table CELLSPACING="0" BORDER="0" CELLPADDING="2" WIDTH="600">
           <tr>
           <th> <Font size="4"><b><a href="http://weather.gfc.state.ga.us">
           Back to Fire Weather Home</a></th>
           </tr>
           <tr>
           <th> <Font size="4"><b><a href="http://www.gfc.state.ga.us">
           Back to Georgia Forestry Commission Home</a></th>
           </tr>
           <table>
           </TD></TR></TABLE></BODY></html>
          `,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
        const httpService = new HttpService();
        jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(httpResponse));
        const fds = new FireDangerService(httpService);
        const result = await fds.getCurrentFireDanger();
        expect(result).toBe('Very High');
    });
    it('should return extreme danger', async () => {
        const httpResponse: AxiosResponse = {
            data: `
            <html><body bgcolor="#C0C0C0" leftmargin="5" topmargin="5">
           <TABLE CELLSPACING="0" BORDER="1" CELLPADDING="2" WIDTH="100%" ALIGN="center"
                bordercolor="#000000" bgcolor="#FFFFFF">
           <TR><TD ALIGN="center">
           <A NAME="Camp Merrill">
           <table CELLSPACING="0" BORDER="1" CELLPADDING="2" WIDTH="600">
           <tr>
           <th colspan=3>Camp Merrill, Ga                  </th>
           <th colspan=6> Observed NFDRS-88 at 1300 EST Jan  2 2020</th>
           </tr>
           <tr>
           <td bgcolor="#C0C0C0" WIDTH=50><b><font size=2> RH (%)   </td>
           <td bgcolor="#C0C0C0" WIDTH=60><b><font size=2> IC    </td>
           <td bgcolor="#C0C0C0" WIDTH=60><b><font size=2> BI    </td>
           <td bgcolor="#C0C0C0" WIDTH=100><b><font size=2> Class Day </td>
           <td bgcolor="#C0C0C0" WIDTH=55><b><font size=2> KBDI  </td>
           <td bgcolor="#C0C0C0" WIDTH=80><b><font size=2> Wind (mph) </td>
           <td bgcolor="#C0C0C0" WIDTH=80><b><font size=2> Mx_Wind<br> (mph) </td>
           <td bgcolor="#C0C0C0" WIDTH=40><b><font size=2> Rn24<br> (inch) </td>
           <td bgcolor="#C0C0C0" WIDTH=50><b><font size=2> Dur<br> (Hr) </td>
           </tr>
           <tr>
           <td align=center><font size=2>         100</td>
           <td align=center><font size=2>           0</td>
           <td align=center><font size=2>           0</td>
           <td align=center><font size=2>5
               Extreme</TD>
           <td align=center><font size=2>          12</td>
           <td align=center><font size=2>E              2</td>
           <td align=center><font size=2>E              3</td>
           <td align=center><font size=2> 0.11</td>
           <td align=center><font size=2>           3</td>
           </tr>
           <tr>
           <td bgcolor="#C0C0C0"><b><font size=2> Sow  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Temp  (°F)  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Td  (°F) </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Tmax  (°F)  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> Tmin  (°F) </td>
           <td bgcolor="#C0C0C0"><b><font size=2> RHMax (%)</td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> RHMin (%)</td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> HrbGF</td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> WdyGF</td>
           </tr>
           <tr>
           <td align=center><font size=2>           6</td>
           <td align=center><font size=2>          43</td>
           <td align=center><font size=2>          43</td>
           <td align=center><font size=2>          55</td>
           <td align=center><font size=2>          40</td>
           <td align=center><font size=2>         100</td>
           <td colspan=1 align=center><font size=2>          22</td>
           <td colspan=1 align=center><font size=2>           0</td>
           <td colspan=1 align=center><font size=2>           0</td>
           </tr>
           <tr>
           <td bgcolor="#C0C0C0"><b><font size=2>1-Hour</td>
           <td bgcolor="#C0C0C0"><b><font size=2> 10-Hour  </td>
           <td bgcolor="#C0C0C0"><b><font size=2> 100-Hour </td>
           <td bgcolor="#C0C0C0"><b><font size=2> 1000-Hour</td>
           <td bgcolor="#C0C0C0"><b><font size=2> X1000 </td>
           <td bgcolor="#C0C0C0" colspan=1><b><font size=2> Herbaceous</td>
           <td bgcolor="#C0C0C0" colspan=1><b> <font size=2>Woody</td>
           <td bgcolor="#C0C0C0"><b><font size=2> SC</td>
           <td bgcolor="#C0C0C0"><b><font size=2> EC</td>
           </tr>
           <tr>
           <td align=center><font size=2> 18.3</td>
           <td align=center><font size=2> 18.3</td>
           <td align=center><font size=2> 18.0</td>
           <td align=center><font size=2> 28.7</td>
           <td align=center><font size=2> 28.7</td>
           <td colspan=1 align=center> <font size=2> 18.3</td>
           <td colspan=1 align=center> <font size=2> 70.0</td>
           <td align=center><font size=2>           0</td>
           <td align=center ><font size=2>            1</td>
           </tr>
           </TABLE><P>
           <table CELLSPACING="0" BORDER="0" CELLPADDING="2" WIDTH="600">
           <tr>
           <th> <Font size="4"><b><a href="http://weather.gfc.state.ga.us">
           Back to Fire Weather Home</a></th>
           </tr>
           <tr>
           <th> <Font size="4"><b><a href="http://www.gfc.state.ga.us">
           Back to Georgia Forestry Commission Home</a></th>
           </tr>
           <table>
           </TD></TR></TABLE></BODY></html>
          `,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        };
        const httpService = new HttpService();
        jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(httpResponse));
        const fds = new FireDangerService(httpService);
        const result = await fds.getCurrentFireDanger();
        expect(result).toBe('Extreme');
    });
});
