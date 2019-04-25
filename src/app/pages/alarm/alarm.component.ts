import {Component, OnDestroy, OnInit} from '@angular/core';
import {DustService} from '../system/dust-register/dust.service';
import {Dust} from '../system/dust-register/dust.model';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss'],
    providers: [ DustService]
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
    dustAlarmData: any = [];
    intervalId;

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
            //this.alarmList(this.dusts[0].dustSN);
        });
    }

    alarmList($ev) {
      // console.log(this.dusts[$ev.index].dustSN);
      const sn = this.dusts[$ev.index].dustSN;
        this.dustAlarmData = [];
        this.dustService.getDustAlarmList(sn).subscribe(alarms => {
            if (alarms.length) {
                console.log('alarms::::::::::::', alarms);
                for (let i = 0; i < alarms.length; i++) {
                    let alarmData = [];
                    if (sn === alarms[i].data.m_wEth_id) {
                        alarmData = [{
                            id: alarms[i].data.m_wEth_id,
                            history: alarms[i].data.m_byaAlarm_history,
                            m_byReserved: alarms[i].data.m_byReserved,
                            createDate: alarms[i].data.createDate
                        }];
                        this.dustAlarmData.push(alarmData);
                    }
                    console.log(this.dustAlarmData);
                }
            }
        });
    }

    ngOnDestroy() {
        // clearInterval(this.intervalId);
        // this.connection.unsubscribe();
    }
}
