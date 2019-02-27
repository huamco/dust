import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {DustConfig} from './dust-view/dust-view.model';

@Injectable()
export class DustConfigService {
    public url = 'http://localhost:3300/dustConfig';
    constructor(public http: HttpClient) { }

    /*getLocations(): Observable<DustLocation[]> {
        console.log('getLocations');
        return this.http.get<DustLocation[]>(this.url);
    }*/

    addDustConfig(param){
        return this.http.post(this.url, param);
    }

    /*updateDustLocation(location: DustLocation){
        return this.http.put(this.url + "/" + location.id, location);
    }

    deleteDustLocation(id: number) {
        return this.http.delete(this.url + "/" + id);
    }*/
}
