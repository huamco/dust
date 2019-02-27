import {Component, OnDestroy, OnInit} from '@angular/core';
import {DustService} from '../system/dust-register/dust.service';
import {DustClientService} from '../typea/dust-client.service';
import {Dust} from '../system/dust-register/dust.model';
import {MatTableDataSource} from '@angular/material';
import {DustLocation} from '../system/dust-register/dust-location.model';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss'],
    providers: [ DustService, DustClientService]
})
export class AlarmComponent implements OnInit, OnDestroy {
    public dusts: Dust[];
    messages = [];
    connection;
    message = 'hello';
    public displayedColumns = ['alarmcontent', 'date'];
    public displayedColumns1 = ['dustName', 'alarmcontent', 'date'];
    public dataSource: any;
    public dataSource1: any;
    paramData: any = [];
    pushParamData: any = [];
    deviceData: any;
    originalData: any;
    isViewConfig: boolean;
    isViewError: boolean;

    m_byaAlarm_history: any = [];
    m_byaAlarm_history_main: any = [];
    m_byaAlarm_history_text: any = '';
    m_byaAlarm_arr: any = [];
    s_structData: any;
    r_structData: any;
    currentDeviceData: any;

  constructor(public dustService: DustService,
              public dustClientService: DustClientService) { }

  ngOnInit() {

      this.isViewConfig = false;
      this.isViewError = false;
      this.getDusts();
      this.connection = this.dustClientService.getMessages().subscribe(data => {
          if(data) {
              this.paramData =  data;
              this.paramData = JSON.parse(JSON.stringify(JSON.parse(this.paramData)));
              this.currentDeviceData = [];
              for (var i=0; i<this.paramData.length; i++) {
                  this.deviceData = JSON.parse(JSON.stringify(this.paramData[i])).data;
                  this.originalData = JSON.parse(JSON.stringify(this.deviceData)).bufferData;

                  if (!JSON.parse(JSON.stringify(this.deviceData)).error) {
                      this.currentDeviceData.push(this.paramData[i]);
                      this.r_structData = JSON.parse(this.originalData)['m_stRunParam'];
                      this.s_structData = JSON.parse(this.originalData)['m_stSysParam'];

                      this.m_byaAlarm_history = JSON.parse(this.originalData)['m_byaAlarm_history'];
                      // m_byaAlarm_history
                      for(let j = 0; j < this.m_byaAlarm_history.length; j++) {
                          if (this.m_byaAlarm_history[j] === '1') {
                              this.m_byaAlarm_arr.push(this.m_byaAlarm_history[j]);
                              break;
                          }
                          if (this.m_byaAlarm_history[j] === '2') {
                              this.m_byaAlarm_arr.push(this.m_byaAlarm_history[j]);
                              break;
                          }
                          if (this.m_byaAlarm_history[j] === '4') {
                              this.m_byaAlarm_arr.push(this.m_byaAlarm_history[j]);
                              break;
                          }
                          if (this.m_byaAlarm_history[j] === '10') {
                              this.m_byaAlarm_arr.push(this.m_byaAlarm_history[j]);
                              break;
                          }
                          if (this.m_byaAlarm_history[j] === '20') {
                              this.m_byaAlarm_arr.push(this.m_byaAlarm_history[j]);
                              break;
                          }
                      }
                      //console.log(this.m_byaAlarm_history_arr);
                  } else {
                      this.isViewError = true;
                      console.log('Alram ERR');
                  }
              }
              //this.sendMessage();
          }
      });
  }

    sendMessage() {
        this.dustClientService.sendMessage(this.message);
        this.message = '';
    }

    public getDusts(): void {
        this.dusts = null; //for show spinner each time
        this.dustService.getDusts().subscribe(dusts => {
            this.dusts = dusts;
            this.dataSource = new MatTableDataSource<Dust>(this.dusts);
            this.dataSource1 = new MatTableDataSource<Dust>(this.dusts);
        });
    }

    ngOnDestroy() {
        //this.connection.unsubscribe();
    }
}
