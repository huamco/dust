import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Dust} from '../../system/dust-register/dust.model';
import {Settings} from '../../../app.settings.model';
import {AppSettings} from '../../../app.settings';
import {DustService} from '../../system/dust-register/dust.service';
import {DustClientService} from '../../typea/dust-client.service';
import * as moment from 'moment';
import {elect} from '../dashboard.data';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit, OnDestroy {

    @Input() pushParamData: any;
    @Input() paramDustId: any;
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
    dailyChartData1: any = [];
    dailyChartData: any = [];
    monthlyChartData: any = [];
    m_wEth_id: any;
    dustData: any = [];
    intervalId;
    dailyIntervalId;
    monthlyIntervalId;

    public settings: Settings;
    subscriptionCloseDevice: Subscription;
  constructor(public appSettings: AppSettings,
              public dustService: DustService,
              public dustClientService: DustClientService) {
      this.settings = this.appSettings.settings;
      this.closeDeviceSubscribe();
  }

  ngOnInit() {
      this.isViewConfig = false;
      //this.m_wEth_id = '1';
      //console.log(this.dustData.dustPacket[0].currentDeviceData);
      this.getDusts();

      this.getLineChart();
      this.intervalId = setInterval(() => this.getLineChart(), 40000);
      this.getDailyChart();
      this.dailyIntervalId = setInterval(() => this.getDailyChart(), 35000);
      this.getMonthlyChart();
      this.monthlyIntervalId = setInterval(() => this.getMonthlyChart(), 30000);

      this.connection = this.dustClientService.getMessages().subscribe(data => {
          if(data) {
              this.isViewError = false;
              this.paramData =  data;
              this.paramData = JSON.parse(JSON.stringify(JSON.parse(this.paramData)));
              // new
              this.deviceData = JSON.parse(JSON.stringify(this.paramData[0])).data;
              if (JSON.parse(JSON.stringify(this.deviceData)).bufferData) {
                  let buff = JSON.parse(JSON.stringify(this.deviceData)).buff;
                  this.originalData = JSON.parse(JSON.stringify(this.deviceData)).bufferData;
                  this.currentDeviceData = this.paramData[0];
                  // console.log('this.originalData===>', this.originalData);
                  this.r_structData = JSON.parse(this.originalData)['m_stRunParam'];
                  this.s_structData = JSON.parse(this.originalData)['m_stSysParam'];

                  this.m_wEth_id = JSON.parse(JSON.stringify(this.s_structData))['m_wEth_id'];
                  this.m_wAuto_puls_val = JSON.parse(JSON.stringify(this.r_structData))['m_wAuto_puls_val'];
                  this.m_wPower_value = JSON.parse(JSON.stringify(this.s_structData))['m_wPower_value'];

                  let n_waCurrent0 = parseInt(JSON.parse(this.originalData)['m_waCurrent_nowx10'][0])/10;
                  // let n_waCurrent2 = parseInt(JSON.parse(this.originalData)['m_waCurrent_nowx10'][2])/10;

                  this.m_waCurrent_nowx10 = n_waCurrent0;
                  this.m_byaAlarm_history = JSON.parse(this.originalData)['m_byReserved'][2];
                  this.m_byReserved = JSON.parse(this.originalData)['m_byReserved'][3];
                  this.m_byReserved4 = JSON.parse(this.originalData)['m_byReserved'][4];
                  this.m_fParam_power = JSON.parse(this.originalData)['m_fParam_power'].toFixed(2);
                  this.m_wS_mode = JSON.parse(this.originalData)['m_wS_mode'];
                  this.m_wM_status = JSON.parse(this.originalData)['m_wM_status'];
                  this.m_wParam_runtime = JSON.parse(this.originalData)['m_wParam_runtime'];
                  this.m_byType = JSON.parse(JSON.stringify(this.s_structData))['m_byType'];
                  this.m_byMotor_num = JSON.parse(JSON.stringify(this.s_structData))['m_byMotor_num'];
                  this.m_byValve_sel = JSON.parse(JSON.stringify(this.r_structData))['m_byValve_sel'];
                  this.m_wPressure = JSON.parse(this.originalData)['m_wPressure'];
                  //console.log('iiiii::::::', JSON.parse(this.originalData)['m_fParam_power']);
                  // this.setWsMode(this.m_wS_mode[i], this.m_wM_status[i], this.m_byType[i],this.m_byMotor_num[i]);
                  this.setSData(buff);
                  // console.log('m_wEth_id', this.m_wEth_id);
                  if (!JSON.parse(JSON.stringify(this.deviceData)).error) {
                      this.isViewError = false;
                      for (let i = 0; i < this.dustData.length; i++) {
                          if (this.dustData[i].dust.dustSN === this.m_wEth_id) {
                              this.dustData[i].dustPacket = [];

                              // this.setWsMode(this.dustData[i].dustPacket);
                              let hexString = parseInt(this.m_wM_status).toString(16);
                              if (hexString.length % 2) {
                                  hexString = '0' + hexString;
                              }
                              this.fan1ScreenView = false;
                              this.fan2ScreenView = false;
                              if (this.m_byMotor_num === '2') {
                                  this.fan1View = 0;
                                  this.fan2View = 0;
                              }
                              if (this.m_wS_mode === '5') {
                                  this.fan1View = 0;
                                  this.fan2View = 0;
                              }
                              if (this.m_wS_mode === '6') {
                                  this.fan1View = 1;
                                  this.fan2View = 0;
                              }
                              if (this.m_wS_mode === '7') {
                                  this.fan1View = 0;
                                  this.fan2View = 1;
                              }
                              if (this.m_wS_mode === '8') {
                                  this.fan1View = 1;
                                  this.fan2View = 1;
                              }
                              if (this.m_wM_status === '0') {
                                  this.fan1View = 0;
                                  this.fan2View = 0;
                                  this.pulsView = 0;
                                  this.shkingView = 0;
                              } else {
                                  this.pulsView = 1;
                                  this.shkingView = 1;
                              }
                              this.dustData[i].dustPacket.push({
                                  m_wEth_id: this.m_wEth_id,
                                  m_wAuto_puls_val: this.m_wAuto_puls_val,
                                  m_wPower_value: this.m_wPower_value,
                                  m_waCurrent_nowx10: this.m_waCurrent_nowx10,
                                  m_byaAlarm_history: this.m_byaAlarm_history,
                                  m_byReserved: this.m_byReserved,
                                  m_byReserved4: this.m_byReserved4,
                                  m_fParam_power: this.m_fParam_power,
                                  m_wS_mode: this.m_wS_mode,
                                  m_wM_status: this.m_wM_status,
                                  m_wParam_runtime: this.m_wParam_runtime,
                                  m_byType: this.m_byType,
                                  m_byMotor_num: this.m_byMotor_num,
                                  m_byValve_sel: this.m_byValve_sel,
                                  m_wPressure: this.m_wPressure,
                                  fan1View: this.fan1View,
                                  fan2View: this.fan2View,
                                  pulsView: this.pulsView,
                                  shkingView: this.shkingView,
                                  paramData: this.paramData,
                                  currentDeviceData: this.currentDeviceData,
                                  isViewError: this.isViewError
                              });
                          }
                      }
                      // console.log(this.dustData);
                  } else {
                      this.isViewError = true;
                      console.log('NETWORK ERR');
                  }
              }

          } else {
              console.log('connection Err');
              this.isViewError = true;
          }
      });
  }

    getLineChart() {
        //this.m_wEth_id
        const id = this.m_wEth_id;
        const chartData = [{
            name: 'power',
            series: []
        }];

        const chartData1 = [{
            name: 'pressure',
            series: []
        }];

        this.dustService.getElectData(id).subscribe(res => {
            res.forEach((item) => {
                // console.log(moment(item.data.createDate).format('YYYY-MM-DD HH'));
                chartData[0].series.push({'name': item._id.dateTime , 'value':  Math.round(item.data.m_fParam_power)});
                chartData1[0].series.push({'name': item._id.dateTime , 'value':  Math.round(item.data.m_wPressure)});
                /*chartData[0].series.push({'name': item.data.createDate , 'value': Math.round(item.data.m_fParam_power)});
                chartData1[0].series.push({'name': item.data.createDate , 'value':  Math.round(item.data.m_wPressure)});*/
            });
            this.chartData = chartData;
            this.chartData1 = chartData1;

            // console.log(this.chartData);
        });
    }

    getDailyChart() {
        //this.m_wEth_id
        const id = this.m_wEth_id;
        const dailyChartData = [{}];

        const dailyChartData1 = [{}];

        this.dustService.getDailyPower(id).subscribe(res => {
            res.forEach((item) => {
                dailyChartData.push({'name': moment(item.data.createDate).format('YYYY-MM-DD') , 'value':  Math.round(item.data.m_fParam_power)});
                dailyChartData1.push({'name': moment(item.data.createDate).format('YYYY-MM-DD') , 'value': Math.round(item.data.m_fParam_power)});
                /*this.dailyChartData.push({'name': moment(item.data.createDate).format('YYYY-MM-DD') , 'value': item.data.m_fParam_power});
                this.dailyChartData1.push({'name': moment(item.data.createDate).format('YYYY-MM-DD') , 'value': item.data.m_fParam_power});*/
            });
            console.log('::::::::::::::::::');
            console.log(dailyChartData);
            this.dailyChartData = dailyChartData;
            this.dailyChartData1 = dailyChartData1;
        });
    }

    getMonthlyChart() {
        //this.m_wEth_id
        const id = this.m_wEth_id;
        const monthlyChartData = [{}];

        this.dustService.getMonthlyPower(id).subscribe(res => {
            res.forEach((item) => {
                monthlyChartData.push({'name': moment(item.data.createDate).format('YYYY-MM') , 'value':  Math.round(item.data.m_fParam_power)});
            });
            this.monthlyChartData = monthlyChartData;
        });
    }

    sendMessage(deviceData) {
        this.dustClientService.sendMessage(deviceData);
        this.message = '';
    }

    getDusts(): void {
      // console.log('this.paramDustId==>', this.paramDustId);
        this.dusts = null;
        this.dustService.getDusts().subscribe(dusts => {
            this.dusts = dusts;
            for (let i = 0; i < this.dusts.length; i++) {
                if (this.dusts[i].id === this.paramDustId) {
                    this.dustData.push({
                        dust: this.dusts[i],
                        dustPacket: []
                    });
                }
            }
            console.log(this.dustData);
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

    ngOnDestroy(): void {
      clearInterval(this.intervalId);
      clearInterval(this.dailyIntervalId);
      clearInterval(this.monthlyIntervalId);
      this.subscriptionCloseDevice.unsubscribe();
    }

    private closeDeviceSubscribe() {
        this.subscriptionCloseDevice = this.dustClientService.getCloseDevice().subscribe(serialNumber => {
            console.log('serialNumber::::', serialNumber);
            if (serialNumber) {
                this.isViewError = true;
                let i = 0;
                for (i = 0; i < this.dustData.length; i++) {
                    if (this.dustData[i].dust.dustSN === serialNumber) {
                        //this.dustData[i].dustPacket = [];
                        const dustPacket = this.dustData[i].dustPacket[0];
                        if (dustPacket) {
                            dustPacket['isViewError'] = this.isViewError;
                        }
                        /*this.dustData[i].dustPacket.push({
                            m_wEth_id: serialNumber,
                            isViewError: this.isViewError
                        });*/
                    }
                }
                // console.log(this.dustData[i].dustPacket);
            }
        });
    }
}
