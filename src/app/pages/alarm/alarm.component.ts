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

  constructor(public dustService: DustService) { }

  ngOnInit() {
      this.isViewConfig = false;
      this.isViewError = false;
      this.getDustAlarmList();
  }

    public getDustAlarmList(): void {
        this.dusts = null; //for show spinner each time
        this.dustService.getDusts().subscribe(dusts => {
            this.dusts = dusts;
            console.log(this.dusts);
        });
    }

    ngOnDestroy() {
        //this.connection.unsubscribe();
    }
}
