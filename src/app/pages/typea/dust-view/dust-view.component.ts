import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Dust} from '../../system/dust-register/dust.model';
import {DustConfig} from './dust-view.model';
import {DustConfigService} from '../dust-config.service';
import {DustClientService} from '../dust-client.service';

@Component({
  selector: 'app-dust-view',
  templateUrl: './dust-view.component.html',
  styleUrls: ['./dust-view.component.scss'],
    providers: [DustConfigService, DustClientService]
})
export class DustViewComponent implements OnInit, OnDestroy {

  @Input() pushParamData: any;
  @Input() paramDustName: any;
  @Output() cancelViewConfig = new EventEmitter<any>();

  public form: FormGroup;
  public dusts: Dust[];
  public dustConfig: DustConfig[];
    connection;
    paramData: any = [];
    deviceData: any;
    originalData: any;
    s_structData: any;
    r_structData: any;

  constructor(public fb: FormBuilder,
              public dustConfigService: DustConfigService,
              public dustClientService: DustClientService) {
      this.form = this.fb.group({
          id: null,
          m_wPower_value: null,
          m_byMode: null,
          m_wAuto_puls_val: null,
          m_wTime_change_fileter: null,
          m_nRev_pressure: null,
          m_byOver_current: null,
          m_byDelay_eocr: null,
          m_wCali_ct1: null,
          m_wCali_ct2: null,
          m_wCali_ct3: null,
          m_wCali_ct4: null,
          m_wAlarm_pressure: null,
          m_byAlarm_current_diff: null,
          m_wPuls_open_time: null,
          m_wPuls_delay_time: null,
          m_byPuls_sel: null,
          m_byValve_sel: null,
          m_byPuls_diff: null,
          m_byMulti_in: null,
          m_byPower_phase: null,
          m_byInverter_out: null,
          m_wAnalog_out: null,
          m_byManual_hauto_puls: null,
          m_byAlarm_relay: null,
          m_byFan_on_time: null,
          m_byManual_puls_cycle: null,
          m_byType: null,
          m_byMotor_num: null,
          m_nRev_ct1: null,
          m_nRev_ct2: null,
          m_nRev_ct3: null,
          m_nRev_ct4: null,
          m_byLanguage: null,
          m_wPassword: null
      });
     /* this.dustClientService.getClient().subscribe(d =>{
              console.log('ddddd=>', d);
            });*/
  }

  ngOnInit() {

      this.connection = this.dustClientService.getMessages().subscribe();
      //    Device Info 로부터 전달받은 JSON: this.pushParamData;
      this.deviceData = JSON.parse(JSON.stringify(this.pushParamData)).data;
      this.originalData = JSON.parse(JSON.stringify(this.deviceData)).bufferData;

      this.r_structData = JSON.parse(this.originalData)['m_stRunParam'];
      this.s_structData = JSON.parse(this.originalData)['m_stSysParam'];

      this.form.controls['m_wPower_value'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_wPower_value']);
      if (JSON.parse(JSON.stringify(this.r_structData))['m_byMode'] === '0') {
          this.form.controls['m_byMode'].setValue('PANNEL');
      } else if (JSON.parse(JSON.stringify(this.r_structData))['m_byMode'].value === '1') {
          this.form.controls['m_byMode'].setValue('LINK');
      } else if (JSON.parse(JSON.stringify(this.r_structData))['m_byMode'].value === '2') {
          this.form.controls['m_byMode'].setValue('REMOTE');
      }
      //this.form.controls['m_byMode'].setValue(JSON.parse(JSON.stringify(this.r_structData))['m_byMode']);

      this.form.controls['m_wAuto_puls_val'].setValue(JSON.parse(JSON.stringify(this.r_structData))['m_wAuto_puls_val']);
      this.form.controls['m_wTime_change_fileter'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_wTime_change_fileter']);
      this.form.controls['m_nRev_pressure'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_nRev_pressure']);
      this.form.controls['m_byOver_current'].setValue(JSON.parse(JSON.stringify(this.r_structData))['m_byOver_current']);
      this.form.controls['m_byDelay_eocr'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_byDelay_eocr']);
      this.form.controls['m_wCali_ct1'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_wCali_ct1']);
      this.form.controls['m_wCali_ct2'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_wCali_ct2']);
      this.form.controls['m_wCali_ct3'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_wCali_ct3']);
      this.form.controls['m_wCali_ct4'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_wCali_ct4']);
      this.form.controls['m_wAlarm_pressure'].setValue(JSON.parse(JSON.stringify(this.r_structData))['m_wAlarm_pressure']);

      this.form.controls['m_byAlarm_current_diff'].setValue(JSON.parse(JSON.stringify(this.r_structData))['m_byAlarm_current_diff']);
      this.form.controls['m_wPuls_open_time'].setValue(JSON.parse(JSON.stringify(this.r_structData))['m_wPuls_open_time']);
      this.form.controls['m_wPuls_delay_time'].setValue(JSON.parse(JSON.stringify(this.r_structData))['m_wPuls_delay_time']);
      this.form.controls['m_byPuls_sel'].setValue(JSON.parse(JSON.stringify(this.r_structData))['m_byPuls_sel']);
      this.form.controls['m_byValve_sel'].setValue(JSON.parse(JSON.stringify(this.r_structData))['m_byValve_sel']);
      this.form.controls['m_byPuls_diff'].setValue(JSON.parse(JSON.stringify(this.r_structData))['m_byPuls_diff']);

      if (JSON.parse(JSON.stringify(this.s_structData))['m_byMulti_in'] === '0') {
          this.form.controls['m_byMulti_in'].setValue('EOCR');
      } else if (JSON.parse(JSON.stringify(this.s_structData))['m_byMulti_in'] === '1') {
          this.form.controls['m_byMulti_in'].setValue('MANUAL');
      }
      //this.form.controls['m_byMulti_in'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_byMulti_in']);

      if (JSON.parse(JSON.stringify(this.s_structData))['m_byPower_phase'] === '3') {
          this.form.controls['m_byPower_phase'].setValue('3상');
      } else if (JSON.parse(JSON.stringify(this.s_structData))['m_byPower_phase'] === '1') {
          this.form.controls['m_byPower_phase'].setValue('1상');
      }
      //this.form.controls['m_byPower_phase'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_byPower_phase']);

      this.form.controls['m_byInverter_out'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_byInverter_out']);
      this.form.controls['m_wAnalog_out'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_wAnalog_out']);

      if (JSON.parse(JSON.stringify(this.s_structData))['m_byManual_hauto_puls'] === '1') {
          this.form.controls['m_byManual_hauto_puls'].setValue('AUTO');
      } else if (JSON.parse(JSON.stringify(this.s_structData))['m_byManual_hauto_puls'] === '0') {
          this.form.controls['m_byManual_hauto_puls'].setValue('MANUAL');
      }
      //this.form.controls['m_byManual_hauto_puls'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_byManual_hauto_puls']);

      if (JSON.parse(JSON.stringify(this.s_structData))['m_byAlarm_relay'] === '0') {
          this.form.controls['m_byAlarm_relay'].setValue('A');
      } else if (JSON.parse(JSON.stringify(this.s_structData))['m_byAlarm_relay'] === '1') {
          this.form.controls['m_byAlarm_relay'].setValue('B');
      }
      //this.form.controls['m_byAlarm_relay'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_byAlarm_relay']);

      this.form.controls['m_byFan_on_time'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_byFan_on_time']);
      this.form.controls['m_byManual_puls_cycle'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_byManual_puls_cycle']);

      if (JSON.parse(JSON.stringify(this.s_structData))['m_byType'] === '0') {
          this.form.controls['m_byType'].setValue('PULS');
      } else if (JSON.parse(JSON.stringify(this.s_structData))['m_byType'] === '1') {
          this.form.controls['m_byType'].setValue('SHAKE');
      }
     // this.form.controls['m_byType'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_byType']);

      this.form.controls['m_byMotor_num'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_byMotor_num']);

      this.form.controls['m_nRev_ct1'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_nRev_ct1']);
      this.form.controls['m_nRev_ct2'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_nRev_ct2']);
      this.form.controls['m_nRev_ct3'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_nRev_ct3']);
      this.form.controls['m_nRev_ct4'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_nRev_ct4']);

      if (JSON.parse(JSON.stringify(this.s_structData))['m_byLanguage'] === '0') {
          this.form.controls['m_byLanguage'].setValue('KOREAN');
      } else if (JSON.parse(JSON.stringify(this.s_structData))['m_byLanguage'] === '1') {
          this.form.controls['m_byLanguage'].setValue('ENGLISH');
      }
      //this.form.controls['m_byLanguage'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_byLanguage']);
      this.form.controls['m_wPassword'].setValue(JSON.parse(JSON.stringify(this.s_structData))['m_wPassword']);
  }

    sendMessage(deviceData) {
        this.dustClientService.sendMessage(deviceData);
        //this.message = '';
    }

    ngOnDestroy() {
        //this.connection.unsubscribe();
    }

    saveDustConfig() {
      // save db & emit
        const sParam = JSON.parse(JSON.stringify(this.s_structData));
        const rParam = JSON.parse(JSON.stringify(this.r_structData));

        sParam['m_wPower_value'] = this.form.controls['m_wPower_value'].value;
        sParam['m_wTime_change_fileter'] = this.form.controls['m_wTime_change_fileter'].value;
        sParam['m_nRev_pressure'] = this.form.controls['m_nRev_pressure'].value;
        sParam['m_byDelay_eocr'] = this.form.controls['m_byDelay_eocr'].value;
        sParam['m_wCali_ct1'] = this.form.controls['m_wCali_ct1'].value;
        sParam['m_wCali_ct2'] = this.form.controls['m_wCali_ct2'].value;
        sParam['m_wCali_ct3'] = this.form.controls['m_wCali_ct3'].value;
        sParam['m_wCali_ct4'] = this.form.controls['m_wCali_ct4'].value;

        if (this.form.controls['m_byMulti_in'].value === 'EOCR') {
            sParam['m_byMulti_in'] = '0';
        } else if (this.form.controls['m_byMulti_in'].value === 'MANUAL') {
            sParam['m_byMulti_in'] = '1';
        }
        //sParam['m_byMulti_in'] = this.form.controls['m_byMulti_in'].value;

        if (this.form.controls['m_byPower_phase'].value === '3상') {
            sParam['m_byPower_phase'] = '3';
        } else if (this.form.controls['m_byPower_phase'].value === '1상') {
            sParam['m_byPower_phase'] = '1';
        }
        //sParam['m_byPower_phase'] = this.form.controls['m_byPower_phase'].value;

        sParam['m_byInverter_out'] = this.form.controls['m_byInverter_out'].value;
        sParam['m_wAnalog_out'] = this.form.controls['m_wAnalog_out'].value;
        if (this.form.controls['m_byManual_hauto_puls'].value === 'MANUAL') {
            sParam['m_byManual_hauto_puls'] = '0';
        } else if (this.form.controls['m_byManual_hauto_puls'].value === 'AUTO') {
            sParam['m_byManual_hauto_puls'] = '1';
        }
        //sParam['m_byManual_hauto_puls'] = this.form.controls['m_byManual_hauto_puls'].value;

        if (this.form.controls['m_byAlarm_relay'].value === 'A') {
            sParam['m_byAlarm_relay'] = '0';
        } else if (this.form.controls['m_byAlarm_relay'].value === 'B') {
            sParam['m_byAlarm_relay'] = '1';
        }
        //sParam['m_byAlarm_relay'] = this.form.controls['m_byAlarm_relay'].value;

        sParam['position'] = this.form.controls['m_byFan_on_time'].value;
        sParam['m_byManual_puls_cycle'] = this.form.controls['m_byManual_puls_cycle'].value;
        if (this.form.controls['m_byType'].value === 'PLUS') {
            sParam['m_byType'] = '0';
        } else if (this.form.controls['m_byAlarm_relay'].value === 'SHAKE') {
            sParam['m_byType'] = '1';
        }
        //sParam['m_byType'] = this.form.controls['m_byType'].value;

        sParam['m_byMotor_num'] = this.form.controls['m_byMotor_num'].value;
        sParam['m_nRev_ct1'] = this.form.controls['m_nRev_ct1'].value;
        sParam['m_nRev_ct2'] = this.form.controls['m_nRev_ct2'].value;
        sParam['m_nRev_ct3'] = this.form.controls['m_nRev_ct3'].value;
        sParam['m_nRev_ct4'] = this.form.controls['m_nRev_ct4'].value;

        if (this.form.controls['m_byLanguage'].value === 'KOREAN') {
            sParam['m_byLanguage'] = '0';
        } else if (this.form.controls['m_byAlarm_relay'].value === 'ENGLISH') {
            sParam['m_byLanguage'] = '1';
        }
        //sParam['m_byLanguage'] = this.form.controls['m_byLanguage'].value;

        sParam['m_wPassword'] = this.form.controls['m_wPassword'].value;

        if (this.form.controls['m_byMode'].value === 'PANNEL') {
            rParam['m_byMode'] = '0';
        } else if (this.form.controls['m_byMode'].value === 'LINK') {
            rParam['m_byMode'] = '1';
        } else if (this.form.controls['m_byMode'].value === 'REMOTE') {
            rParam['m_byMode'] = '2';
        }
        //rParam['m_byMode'] = this.form.controls['m_byMode'].value;

        rParam['m_wAuto_puls_val'] = this.form.controls['m_wAuto_puls_val'].value;
        rParam['m_byOver_current'] = this.form.controls['m_byOver_current'].value;
        rParam['m_wAlarm_pressure'] = this.form.controls['m_wAlarm_pressure'].value;
        rParam['m_byAlarm_current_diff'] = this.form.controls['m_byAlarm_current_diff'].value;
        rParam['m_wPuls_open_time'] = this.form.controls['m_wPuls_open_time'].value;
        rParam['m_wPuls_delay_time'] = this.form.controls['m_wPuls_delay_time'].value;
        rParam['m_byPuls_sel'] = this.form.controls['m_byPuls_sel'].value;
        rParam['m_byValve_sel'] = this.form.controls['m_byValve_sel'].value;
        rParam['m_byPuls_diff'] = this.form.controls['m_byPuls_diff'].value;

        //console.log('sParam=>', sParam);
        //console.log('rParam=>', rParam);
        //console.log('sParam=>', typeof(sParam));
        this.deviceData = JSON.parse(JSON.stringify(this.pushParamData)).data;
        this.originalData = JSON.parse(JSON.parse(JSON.stringify(this.deviceData)).bufferData);
        //console.log(this.originalData);
        Object.assign(this.originalData, {
            'm_byCmd': '3',
            'm_byAddr': '0',
            'm_stSysParam': JSON.parse(JSON.stringify(sParam)),
            'm_stRunParam': JSON.parse(JSON.stringify(rParam))
        });
        console.log('this.originalData', this.originalData);

        Object.assign(this.deviceData, {
            'bufferData': JSON.stringify(this.originalData)
        });

        //console.log('this.deviceData', this.deviceData);

      this.sendMessage(this.deviceData);
      //this.cancelDustConfig();
    }

    cancelDustConfig(){
      this.cancelViewConfig.emit(false);
    }

    /*setDustConfig(obj) {
        console.log(this.form.controls['m_wPower_value'].value);
        const data = {
            'm_wPower_value': this.form.controls['m_wPower_value'].value,
            'm_byMode': this.form.controls['m_byMode'].value,
            'm_wAuto_puls_val':this.form.controls['m_wAuto_puls_val'].value,
            'm_wTime_change_fileter':this.form.controls['m_wTime_change_fileter'].value,
            'm_nRev_pressure':this.form.controls['m_nRev_pressure'].value,
            'm_byOver_current':this.form.controls['m_byOver_current'].value,
            'm_byDelay_eocr':this.form.controls['m_byDelay_eocr'].value,
            'm_wCali_ct1':this.form.controls['m_wCali_ct1'].value,
            'm_wCali_ct2':this.form.controls['m_wCali_ct2'].value,
            'm_wCali_ct3':this.form.controls['m_wCali_ct3'].value,
            'm_wCali_ct4':this.form.controls['m_wCali_ct4'].value,
            'm_wAlarm_pressure':this.form.controls['m_wAlarm_pressure'].value,
            'm_byAlarm_current_diff':this.form.controls['m_byAlarm_current_diff'].value,
            'm_wPuls_open_time':this.form.controls['m_wPuls_open_time'].value,
            'm_wPuls_delay_time':this.form.controls['m_wPuls_delay_time'].value
        };
        console.log(data);
        return data;
        //this.addDustConfig(dust);
    }*/
}
