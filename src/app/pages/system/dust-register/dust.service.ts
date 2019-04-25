import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dust } from './dust.model';
import {DustConfig} from '../../typea/dust-view/dust-view.model';

@Injectable()
export class DustService {
    public url = 'http://localhost:3300/dusts';
    constructor(public http: HttpClient) { }

    getDusts(): Observable<Dust[]> {
        return this.http.get<Dust[]>(this.url);
    }

    addDust(dust: Dust){
        console.log('addDust');
        return this.http.post(this.url, dust);
    }

    addImage(f: File) {
        console.log('http://localhost:3300/uploadimage' , f);
        return this.http.post('http://localhost:3300/uploadimage', f);
    }

    updateDust(dust: Dust){
        return this.http.put(this.url + '/' + dust.id, dust);
    }

    deleteDust(id: number) {
        return this.http.delete(this.url + '/' + id);
    }

    getDustAlarmList(snId) {
        return this.http.get<any>('http://localhost:3300/packetData/getAlarmList/' + snId);
    }

    addDustConfig(dustConfig: DustConfig) {
        console.log('addDustConfig');
        return this.http.post(this.url + '/dust-config', dustConfig);
    }

    getSocketData(): Observable<any> {
        return this.http.get<any>('http://localhost:3300/packetData/getSocketData/');
    }

    getReportData(snId, startDate, endDate, isAlarmList): Observable<any> {
        const query =  {
            startDate: startDate,
            endDate: endDate,
            isAlarmList: isAlarmList,
            snId: snId
        };
        return this.http.get<any>('http://localhost:3300/packetData/getReportData/' + snId, {params: query});

    }

    getElectData(snId): Observable<any> {
         return this.http.get<any>('http://localhost:3300/packetData/getElectData/' + snId );
    }

    getMonthlyPower(snId): Observable<any> {
        return this.http.get<any>('http://localhost:3300/packetData/getMonthlyPower/' + snId);
    }

    getDailyPower(snId): Observable<any> {
        return this.http.get<any>('http://localhost:3300/packetData/getDailyPower/' + snId);
    }

    getMonthlyPowerSum(): Observable<any> {
        return this.http.get<any>('http://localhost:3300/packetData/getMonthlyPowerSum');
    }

    getDailyPowerSum(): Observable<any> {
        return this.http.get<any>('http://localhost:3300/packetData/getDailyPowerSum');
    }

    getTotalHour(): Observable<any> {
        return this.http.get<any>('http://localhost:3300/packetData/getTotalHour');
    }

}
