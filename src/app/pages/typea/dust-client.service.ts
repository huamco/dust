import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';
import {angularCoreEnv} from '@angular/core/src/render3/jit/environment';

@Injectable()
export class DustClientService {
    public url = 'http://localhost:2000';
    //private url = 'http://localhost:5000';
    public socket;
    data1: any;
    data2: any;
    data3: any;
    data4: any = [];

    constructor(public http: HttpClient) { }

    getClient() {
        console.log('getClient');
        return this.http.get(this.url);
    }

    sendMessage(deviceData) {
        //console.log('sendMessage deviceData==>', deviceData);
        this.socket.emit('DeviceSetting', deviceData);
    }

    getMessages() {
        const observable = new Observable(observer => {
            this.socket = io(this.url);

            this.socket.on('connect', function () {
               console.log('View Socket connection') ;
            });

            this.socket.on('disconnect', function () {
                console.log('View Socket disconnect') ;
            });

            this.socket.on('Device_Monitoring_Data', (data) => {
                //console.log(JSON.parse(data)[0].id);
                //console.log(JSON.parse(data)[1].id);
                /*console.log('Device_Monitoring_Data');
                console.log('Device_Monitoring_Data=>');
                console.log(data);*/
                //console.log(this.data4[0].id);
                //console.log('Device_Monitoring_Data=>', data.json());
                //console.log('Device_Monitoring_Data=>', angular.fromJson(data.id));
                //console.log(data);
                observer.next(data);
            });

            return () => {
                console.log('socket disconnect');
                this.socket.disconnect();
            };
        })
        return observable;
    }
}
