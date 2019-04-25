import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import * as io from 'socket.io-client';
import {angularCoreEnv} from '@angular/core/src/render3/jit/environment';
import * as Rx from 'rxjs/Rx';

@Injectable({
    providedIn: 'root'
})
export class DustClientService {
    public url = 'http://localhost:2000';
    //private url = 'http://localhost:5000';
    public socket;
    data1: any;
    data2: any;
    data3: any;
    data4: any = [];

    deviceMessages: Subject<any>;
    closeDevice: Subject<any> = new Subject<any>();

    constructor(public http: HttpClient) {
        this.deviceMessages = <Subject<any>>this
            .connect()
            .map((response: any): any => {
                return response;
            });
    }

    getCloseDevice() {
        return this.closeDevice.asObservable();
    }

    connect(): Rx.Subject<MessageEvent> {
        // If you aren't familiar with environment variables then
        // you can hard code `environment.ws_url` as `http://localhost:5000`
        this.socket = io(this.url);

        // We define our observable which will observe any incoming messages
        // from our socket.io server.
        let observable = new Observable(observer => {
            const socket = this.socket;
            socket.on('connect', function () {
                console.log('View Socket connection') ;
            });

            socket.on('disconnect', function () {
                console.log('View Socket disconnect') ;
            });

            socket.on('Device_Monitoring_Data', (data) => {
                observer.next(data);
            });
            socket.on('connect_error', (/*error*/) => {
                console.log('서버와 연결이 되지 않았습니다(api)');
            });
            socket.on('byebye', (serialNumber) => {
                console.log('서버와 연결이 되지 않았습니다(dust)', serialNumber);
                this.closeDevice.next(serialNumber);
            });

            return () => {
                console.log('removeListener');
                this.socket.removeListener('connect');
                this.socket.removeListener('disconnect');
                this.socket.removeListener('Device_Monitoring_Data');
                this.socket.removeListener('connect_error');
                this.socket.removeListener('byebye');
            };
        });

        // We define our Observer which will listen to messages
        // from our other components and send messages back to our
        // socket server whenever the `next()` method is called.
        let observer = {
            next: (data: Object) => {
                this.socket.emit('DeviceSetting', data);
            },
        };

        // we return our Rx.Subject which is a combination
        // of both an observer and observable.
        return Rx.Subject.create(observer, observable);
    }

    getClient() {
        console.log('getClient');
        return this.http.get(this.url);
    }

    sendMessage(deviceData) {
        //console.log('sendMessage deviceData==>', deviceData);
        // this.socket.emit('DeviceSetting', deviceData);
        this.deviceMessages.next(deviceData);
    }

    getMessages() {
        return this.deviceMessages;
        // const observable = new Observable(observer => {
        //     this.socket = io(this.url);
        //
        //     this.socket.on('connect', function () {
        //        console.log('View Socket connection') ;
        //     });
        //
        //     this.socket.on('disconnect', function () {
        //         console.log('View Socket disconnect') ;
        //     });
        //
        //     this.socket.on('Device_Monitoring_Data', (data) => {
        //         //console.log(JSON.parse(data)[0].id);
        //         //console.log(JSON.parse(data)[1].id);
        //         /*console.log('Device_Monitoring_Data');
        //         console.log('Device_Monitoring_Data=>');
        //         console.log(data);*/
        //         //console.log(this.data4[0].id);
        //         //console.log('Device_Monitoring_Data=>', data.json());
        //         //console.log('Device_Monitoring_Data=>', angular.fromJson(data.id));
        //         //console.log(data);
        //         observer.next(data);
        //     });
        //
        //     return () => {
        //         console.log('socket disconnect');
        //         this.socket.disconnect();
        //     };
        // })
        // return observable;
    }

    /*constructor(public http: HttpClient) { }

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
                /!*console.log('Device_Monitoring_Data');
                console.log('Device_Monitoring_Data=>');
                console.log(data);*!/
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
    }*/
}
