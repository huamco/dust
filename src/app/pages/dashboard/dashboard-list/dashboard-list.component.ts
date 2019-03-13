import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Dust} from '../../system/dust-register/dust.model';
import {Settings} from '../../../app.settings.model';
import {AppSettings} from '../../../app.settings';
import {DustService} from '../../system/dust-register/dust.service';
import {DustClientService} from '../../typea/dust-client.service';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit {

    @Input() pushParamData: any;
    @Input() paramDustName: any;
    @Output() cancelViewDashboard = new EventEmitter<any>();

    public dusts: Dust[];
    socketData: any = [];
    messages = [];
    connection;
    message = 'hello';
    paramData: any = [];
    deviceData: any;
    originalData: any;
    s_structData: any;
    r_structData: any;
    isViewConfig: boolean;
    isViewError: boolean;
    dustId: any;
    selectedDustId: any;
    dustOptions: any = [];

    //WS_MODE
    SYS_NORMAL: any = 0;
    SYS_SHAKEPULS_MANUAL: any = 5;
    SYS_FAN1: any = 6;
    SYS_FAN2: any = 7;
    SYS_FANALL: any = 8;
    SYS_FAN1_SHAKEPULS_PAUSE: any = 9;
    SYS_FAN2_SHAKEPULS_PAUSE: any = 10;
    SYS_FANALL_SHAKEPULS_PAUSE: any = 11;
    SYS_FAN1_PULS_MANUAL: any = 12;
    SYS_FAN2_PULS_MANUAL: any = 13;
    SYS_FANALL_PULS_MANUAL: any = 14;

    //wM_Status
    M_NORMAL: any = 0;
    M_AUTO_PULS: any = 1;
    M_MANUAL_PULS: any = 2;
    M_HAUTO_PULS: any = 4;
    M_AUTO_SHAKE: any = 8;
    M_MANUAL_SHAKE: any = 10;
    M_FAN1: any = 20;
    M_FAN2: any = 40;
    M_MANUAL_SHAKEPULS: any = 80;
    M_RUN: any = 8000;
    M_RUN_SHAKEPULS_PAUSE: any = 4000;
    M_RUN_AUTO_FINISH: any = 2000;
    M_AUTO_RANGE: any = 1000;

    pulsView: any = 0;
    shkingView: any = 0;
    fan1View: any = 0;
    fan2View: any = 0;
    fan1ScreenView: boolean;
    fan2ScreenView: boolean;
    alarmError: boolean;

    m_wAuto_puls_val: any = 0; // 차압
    m_wPower_value: any = 0; // 전압
    m_waCurrent_nowx10: any = 0; // 전류
    m_byReserved: any = 0; // 인버터
    m_byReserved4: any = 0; // 벨브
    m_fParam_power: any = 0; // 전력
    m_wParam_runtime: any = 0; // 가동시간
    m_byType: any = 0; // 0, PULS 타입 1 :SHAKE타입
    m_wS_mode: any;
    m_wM_status: any;
    m_wPressure: any;
    m_byMotor_num: any;
    m_byValve_sel: any;
    currentDeviceData: any;
    m_byaAlarm_history: any = [];
    m_byaAlarm_arr: any = [];
    chartData: any = [];
    chartData1: any = [];

    public settings: Settings;
  constructor(public appSettings: AppSettings,
              public dustService: DustService,
              public dustClientService: DustClientService) {
      this.settings = this.appSettings.settings;
  }

  ngOnInit() {
      this.isViewConfig = false;
      this.getLineChart();
      this.getDusts();

      this.connection = this.dustClientService.getMessages().subscribe(data => {
          if(data) {
              this.paramData =  data;
              this.paramData = JSON.parse(JSON.stringify(JSON.parse(this.paramData)));
              this.m_wAuto_puls_val = [];
              this.m_wPower_value = [];
              this.m_waCurrent_nowx10 = [];
              this.m_byReserved = [];
              this.m_byReserved4 = [];
              this.m_fParam_power = [];
              this.m_wParam_runtime = [];
              this.m_byType = [];
              this.m_wS_mode = [];
              this.m_wM_status = [];
              this.currentDeviceData = [];
              this.m_wPressure = [];
              this.m_byMotor_num = [];
              this.m_byValve_sel = [];
              // console.log('this.paramData.length===>',this.paramData.length);

              for(var i=0; i<this.paramData.length; i++) {
                  this.deviceData = JSON.parse(JSON.stringify(this.paramData[i])).data;
                  //console.log('this.deviceData================>>>>>');
                  let buff = JSON.parse(JSON.stringify(this.deviceData)).buff;
                  this.originalData = JSON.parse(JSON.stringify(this.deviceData)).bufferData;
                  //console.log(buff);
                  //console.log(this.originalData);
                  if(!JSON.parse(JSON.stringify(this.deviceData)).error) {
                      this.currentDeviceData.push(this.paramData[i]);
                      this.r_structData = JSON.parse(this.originalData)['m_stRunParam'];
                      this.s_structData = JSON.parse(this.originalData)['m_stSysParam'];

                      this.m_wAuto_puls_val.push(JSON.parse(JSON.stringify(this.r_structData))['m_wAuto_puls_val']);
                      this.m_wPower_value.push(JSON.parse(JSON.stringify(this.s_structData))['m_wPower_value']);

                      let n_waCurrent0 = parseInt(JSON.parse(this.originalData)['m_waCurrent_nowx10'][0])/10;
                      let n_waCurrent2 = parseInt(JSON.parse(this.originalData)['m_waCurrent_nowx10'][2])/10;

                      /*console.log('n_waCurrent0', JSON.parse(this.originalData)['m_waCurrent_nowx10'][0]);
                      console.log('n_waCurrent1', JSON.parse(this.originalData)['m_waCurrent_nowx10'][1]);
                      console.log('n_waCurrent2', JSON.parse(this.originalData)['m_waCurrent_nowx10'][2]);
                      console.log('n_waCurrent3', JSON.parse(this.originalData)['m_waCurrent_nowx10'][3]);*/
                      this.m_waCurrent_nowx10.push(n_waCurrent0);
                      this.m_byaAlarm_history = JSON.parse(this.originalData)['m_byaAlarm_history'];
                      //console.log('m_byaAlarm_history', JSON.parse(this.originalData)['m_byaAlarm_history']);
                      // m_byaAlarm_history
                      for(let j = 0; j < this.m_byaAlarm_history.length; j++) {
                          if (this.m_byaAlarm_history[j] === '0') {
                              this.m_byaAlarm_arr.push(this.m_byaAlarm_history[j]);
                              this.alarmError = false;
                              break;
                          }
                          if (this.m_byaAlarm_history[j] === '1') {
                              this.m_byaAlarm_arr.push(this.m_byaAlarm_history[j]);
                              this.alarmError = true;
                              break;
                          }
                          if (this.m_byaAlarm_history[j] === '20') {
                              this.m_byaAlarm_arr.push(this.m_byaAlarm_history[j]);
                              this.alarmError = true;
                              break;
                          }
                          if (this.m_byaAlarm_history[j] === '40') {
                              this.m_byaAlarm_arr.push(this.m_byaAlarm_history[j]);
                              this.alarmError = true;
                              break;
                          }
                          if (this.m_byaAlarm_history[j] === '10') {
                              this.m_byaAlarm_arr.push(this.m_byaAlarm_history[j]);
                              this.alarmError = true;
                              break;
                          }
                          if (this.m_byaAlarm_history[j] === '20') {
                              this.m_byaAlarm_arr.push(this.m_byaAlarm_history[j]);
                              this.alarmError = true;
                              break;
                          }
                      }

                      this.m_byReserved.push(JSON.parse(this.originalData)['m_byReserved'][3]);
                      this.m_byReserved4.push(JSON.parse(this.originalData)['m_byReserved'][4]);
                      this.m_fParam_power.push(JSON.parse(this.originalData)['m_fParam_power']);
                      this.m_wS_mode.push(JSON.parse(this.originalData)['m_wS_mode']);
                      this.m_wM_status.push(JSON.parse(this.originalData)['m_wM_status']);
                      this.m_wParam_runtime.push(JSON.parse(this.originalData)['m_wParam_runtime']);
                      this.m_byType.push(JSON.parse(JSON.stringify(this.s_structData))['m_byType']);
                      this.m_byMotor_num.push(JSON.parse(JSON.stringify(this.s_structData))['m_byMotor_num']);
                      this.m_byValve_sel.push(JSON.parse(JSON.stringify(this.r_structData))['m_byValve_sel']);
                      this.m_wPressure.push(JSON.parse(this.originalData)['m_wPressure']);
                      //console.log('iiiii::::::', this.m_wPressure);
                      this.setWsMode(this.m_wS_mode[i], this.m_wM_status[i], this.m_byType[i],this.m_byMotor_num[i]);
                      this.setSData(buff);
                  } else {
                      this.isViewError = true;
                      console.log('TYPE A ERR');
                  }
              }
              //this.sendMessage();
          } else {
              console.log('connection Err');
              this.isViewError = true;
          }
      });
  }

    getLineChart() {
        this.chartData = [];
        this.chartData1 = [];
        this.dustService.getElectData().subscribe(res => {
            res.forEach((item) => {
                this.chartData.push({'name': item.data.createDate , 'value': item.data.m_fParam_power});
                this.chartData1.push({'name': item.data.createDate, 'value': Math.round(item.data.m_wPressure)});
            });
            this.chartData = [...this.chartData];
            this.chartData1 = [...this.chartData1];
        });
        setTimeout(() => {
            this.getLineChart();
        }, 5000);
    }

    sendMessage(deviceData) {
        this.dustClientService.sendMessage(deviceData);
        this.message = '';
    }

    getDusts(): void {
        this.dusts = null;
        this.dustService.getDusts().subscribe(dusts => {
            this.dusts = dusts;
        });
    }

    setSData(data: any) {
        //console.log('data:::::::::', data.length);
        if (this.socketData.length >= 13) {
            this.socketData = this.socketData.slice(1, 12);
        }
        this.socketData.push({
            'data' : data
        });
    }

    setWsMode(mode, status: any, type, motor) {
        //console.log('status::::::', status);
        let hexString = parseInt(status).toString(16);
        if (hexString.length % 2) {
            hexString = '0' + hexString;
        }
        //console.log('hexString:::::', hexString);
        //console.log('mode::::::', mode); // 6
        // console.log(parseInt(this.M_AUTO_PULS) +  parseInt(this.M_MANUAL_PULS) +  parseInt(this.M_MANUAL_SHAKE)+parseInt(this.M_FAN1))
        this.fan1ScreenView = false;
        this.fan2ScreenView = false;
        if(motor === '2') {
            this.fan1View = 0;
            this.fan2View = 0;
        }
        if (mode === '5') {
            this.fan1View = 0;
            this.fan2View = 0;
        }
        if (mode === '6') {
            this.fan1View = 1;
            this.fan2View = 0;
        }
        if (mode === '7') {
            this.fan1View = 0;
            this.fan2View = 1;
        }
        if (mode === '8') {
            this.fan1View = 1;
            this.fan2View = 1;
        }
        if (status === '0') {
            this.fan1View = 0;
            this.fan2View = 0;
            this.pulsView = 0;
            this.shkingView = 0;
        } else {
            this.pulsView = 1;
            this.shkingView = 1;
        }

    }

    setFanMode1(currentDeviceData, currentMode, currentType) {
        const  deviceData = JSON.parse(JSON.stringify(currentDeviceData)).data;
        const  originalData = JSON.parse(JSON.parse(JSON.stringify(deviceData)).bufferData);
        //console.log(typeof(deviceData)); // object
        //console.log(typeof(originalData));

        if (currentMode === '1' && currentType === 'fan') {
            if (this.fan2View === 1) {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_FAN2
                });
            } else {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_SHAKEPULS_MANUAL
                });
            }
        } else if (currentMode === '0' && currentType === 'fan') {
            if (this.fan2View === 1) {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_FANALL
                });
            } else {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_FAN1
                });
            }
        }
        if (currentMode === '1' && currentType === 'fan2') {
            if (this.fan1View === 1) {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_FAN1
                });
            } else {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_SHAKEPULS_MANUAL
                });
            }
        } else if (currentMode === '0' && currentType === 'fan2') {
            if (this.fan1View === 1) {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_FANALL
                });
            } else {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_FAN2
                });
            }
        }

        if (currentMode === '1' && currentType === 'puls') {
            if (this.fan1View === '1') {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_FAN1_SHAKEPULS_PAUSE
                });
            } else {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_SHAKEPULS_MANUAL
                });
            }
        } else if (currentMode === '0' && currentType === 'puls') {
            if (this.fan1View === '1') {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_FAN1_PULS_MANUAL
                });
            } else {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_SHAKEPULS_MANUAL
                });
            }
        }
        if (currentMode === '1' && currentType === 'shake') {
            if (this.fan1View === '1') {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_FAN1_SHAKEPULS_PAUSE
                });
            } else {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_SHAKEPULS_MANUAL
                });
            }
        } else if (currentMode === '0' && currentType === 'shake') {
            if (this.fan1View === '1') {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_FAN1_PULS_MANUAL
                });
            } else {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_SHAKEPULS_MANUAL
                });
            }
        }

        Object.assign(originalData, {
            'm_byCmd': '3',
            'm_byAddr': '0'
        });
        Object.assign(deviceData, {
            'bufferData': JSON.stringify(originalData)
        });
        console.log(deviceData);
        this.sendMessage(deviceData);
    }

    cancelDustDashboard() {
        this.cancelViewDashboard.emit(false);
    }

    goConfig(param, dustName) {
        //if(param) {
        this.pushParamData = param;
        this.paramDustName = dustName;
        this.isViewConfig = true;
        //}
    }

    backDustDashboard(e) {
        if (!e) {
            this.isViewConfig = false;
        }
    }
}
