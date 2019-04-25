import {Component, OnDestroy, OnInit} from '@angular/core';
import {DustService} from '../system/dust-register/dust.service';
import {Dust} from '../system/dust-register/dust.model';
import {DustClientService} from './dust-client.service';

@Component({
  selector: 'app-typea',
  templateUrl: './typea.component.html',
  styleUrls: ['./typea.component.scss'],
    providers: [ DustService]
})
export class TypeaComponent implements OnInit, OnDestroy {

    public dusts: Dust[];
    messages = [];
    paramDustName: any;
    connection;
    message = 'hello';
    paramData: any = [];
    pushParamData: any = [];
    deviceData: any;
    originalData: any;
    s_structData: any;
    r_structData: any;
    isViewConfig: boolean;
    isViewError: boolean;

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

    m_wAuto_puls_val: any = 0; // 차압
    m_wPower_value: any = 0; // 전압
    m_waCurrent_nowx10: any = 0; // 전류
    m_byReserved: any = 0; // 인버터
    m_fParam_power: any = 0; // 전력
    m_wParam_runtime: any = 0; // 가동시간
    m_byType: any = 0; // 0, PULS 타입 1 :SHAKE타입
    m_wS_mode: any;
    m_wM_status: any;
    currentDeviceData: any;
    m_byaAlarm_history: any = [];
    m_byaAlarm_arr: any = [];

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
              this.m_wAuto_puls_val = [];
              this.m_wPower_value = [];
              this.m_waCurrent_nowx10 = [];
              this.m_byReserved = [];
              this.m_fParam_power = [];
              this.m_wParam_runtime = [];
              this.m_byType = [];
              this.m_wS_mode = [];
              this.m_wM_status = [];
              this.currentDeviceData = [];

              for(var i=0; i<this.paramData.length; i++) {
                  this.deviceData = JSON.parse(JSON.stringify(this.paramData[i])).data;
                  //console.log('this.deviceData================>>>>>');
                  //console.log(this.deviceData);
                  this.originalData = JSON.parse(JSON.stringify(this.deviceData)).bufferData;
                  if(!JSON.parse(JSON.stringify(this.deviceData)).error) {
                      this.currentDeviceData.push(this.paramData[i]);
                      this.r_structData = JSON.parse(this.originalData)['m_stRunParam'];
                      this.s_structData = JSON.parse(this.originalData)['m_stSysParam'];

                      this.m_wAuto_puls_val.push(JSON.parse(JSON.stringify(this.r_structData))['m_wAuto_puls_val']);
                      this.m_wPower_value.push(JSON.parse(JSON.stringify(this.s_structData))['m_wPower_value']);

                      this.m_waCurrent_nowx10.push(JSON.parse(this.originalData)['m_waCurrent_nowx10'][0]);
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

                      this.m_byReserved.push(JSON.parse(this.originalData)['m_byReserved'][3]);
                      this.m_fParam_power.push(JSON.parse(this.originalData)['m_fParam_power']);
                      this.m_wS_mode.push(JSON.parse(this.originalData)['m_wS_mode']);
                      this.m_wM_status.push(JSON.parse(this.originalData)['m_wM_status']);
                      this.m_wParam_runtime.push(JSON.parse(this.originalData)['m_wParam_runtime']);
                      this.m_byType.push(JSON.parse(JSON.stringify(this.s_structData))['m_byType']);
                      this.setWsMode(this.m_wS_mode, this.m_wM_status, this.m_byType);

                } else {
                      this.isViewError = true;
                      console.log('TYPE A ERR');
               }
            }
              //this.sendMessage();
          }
      });

  }

  sendMessage(deviceData) {
      this.dustClientService.sendMessage(deviceData);
      this.message = '';
  }

  public getDusts(): void {
      this.dusts = null; //for show spinner each time
      this.dustService.getDusts().subscribe(dusts => {
          this.dusts = dusts;
        });
  }

  imageChane(currValue) {
        console.log('흐린 이미지');
  }
  ngOnDestroy() {
      this.connection.unsubscribe();
  }

  goDustConfig(param, dustName) {
    if(param) {
        this.pushParamData = param;
        this.paramDustName = dustName;
        this.isViewConfig = true;
    }
  }

    backDustConfig(e) {
        if (!e) {
            this.isViewConfig = false;
        }
    }

    setWsMode(mode, status: any, type) {
        //status = 20;
        //console.log('mode::::::', mode);
        //console.log('status::::::', status);
        this.fan1ScreenView = false;
        this.fan2ScreenView = false;

        if (status === (this.M_FAN1 +  this.M_FAN2)) {
            this.fan1View = 1;
            this.fan2View = 1;
            this.fan1ScreenView = true;
            this.fan2ScreenView = true;
        } else {
            this.fan1View = 0;
            this.fan2View = 0;
            this.fan1ScreenView = false;
            this.fan2ScreenView = false;
        }
        if (status === this.M_FAN1) {
            this.fan1View = 1;
            this.fan1ScreenView = true;
        } else {
            this.fan1View = 0;
            this.fan1ScreenView = false;
        }

        if (status === this.M_FAN2) {
            this.fan2View = 1;
            this.fan2ScreenView = true;
        } else {
            this.fan2View = 0;
            this.fan2ScreenView = false;
        }

        if (status === this.M_RUN) {
            this.pulsView = 1;
            this.shkingView = 1;
        } else {
            this.pulsView = 0;
            this.shkingView = 0;
        }

        if ((type === '1') && (status === this.M_AUTO_SHAKE)) {
            this.pulsView = 0;
            this.shkingView = 0;
        }

        if (status === this.M_RUN_SHAKEPULS_PAUSE) {
            this.pulsView = 2;
            this.shkingView = 2;
        }

        if (status === this.M_RUN_AUTO_FINISH) {
            this.fan1View = 0;
            this.fan2View = 0;
            this.pulsView = 1;
            this.shkingView = 1;
        }
    }

    setFanMode(currentDeviceData, currentMode, currentType) {
        const  deviceData = JSON.parse(JSON.stringify(currentDeviceData)).data;
        const  originalData = JSON.parse(JSON.parse(JSON.stringify(deviceData)).bufferData);
        //console.log(typeof(deviceData)); // object
        //console.log(typeof(originalData));

        if (currentMode === '1' && currentType === 'fan') {
            Object.assign(originalData, {
                'm_wS_mode': this.SYS_SHAKEPULS_MANUAL
            });
        } else if (currentMode === '0' && currentType === 'fan') {
            Object.assign(originalData, {
                'm_wS_mode': this.SYS_FAN1
            });
        } else if (currentMode === '2' && currentType === 'fan') {
            Object.assign(originalData, {
                'm_wS_mode': this.SYS_FAN1
            });
        }

        if (currentMode === '1' && currentType === 'plus') {
            if (this.fan1View === '1') {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_FAN1_SHAKEPULS_PAUSE
                });
            } else {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_SHAKEPULS_MANUAL
                });
            }
        } else if (currentMode === '0' && currentType === 'plus') {
            if (this.fan1View === '1') {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_FAN1_PULS_MANUAL
                });
            } else {
                Object.assign(originalData, {
                    'm_wS_mode': this.SYS_SHAKEPULS_MANUAL
                });
            }
        } else if (currentMode === '2' && currentType === 'plus') {
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
        } else if (currentMode === '2' && currentType === 'shake') {
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

        Object.assign(deviceData, {
            'bufferData': JSON.stringify(originalData)
        });

        //console.log(deviceData);
        this.sendMessage(deviceData);
    }
}
