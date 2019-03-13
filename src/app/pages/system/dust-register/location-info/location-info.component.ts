import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Dust} from '../dust.model';
import {DustLocationService} from '../dust-location.service';
import * as _ from 'lodash';
import {DustService} from '../dust.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-location-info',
  templateUrl: './location-info.component.html',
  styleUrls: ['./location-info.component.scss'],
    providers: [ DustLocationService, DustService ]
})
export class LocationInfoComponent implements OnInit {
    public form: FormGroup;
    locations: any[] = [];
    selectedLocation: any;
    reader = new FileReader();
    selectedFile: any;

    constructor(public dialogRef: MatDialogRef<LocationInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public dust: Dust,
                public http: HttpClient,
              public fb: FormBuilder,
              public dustLocationService: DustLocationService,
                public dustService: DustService) {
      this.form = this.fb.group({
          id: null,
          locationID: null,
          dustIPAddress: [null, Validators.compose([Validators.required])],
          version: null,
          dustType: null,
          dustName: null,
          viewComponent: null,
          isActive: 0,
          m_wAuto_puls_val: 0,
          m_wPower_value: 0,
          m_waCurrent_nowx10: 0,
          m_byReserved: 0,
          m_fParam_power: 0,
          m_wParam_runtime: 0
      });
  }

  getDustLocations() {
      this.dustLocationService.getLocations().subscribe(dustLocations => {
          dustLocations.forEach((x) => {
              this.locations.push({
                  id: x.id,
                  text: x.location
              });
          });
      });
  }

  selectedDustLocations() {
      this.selectedLocation = _.find(this.locations, { 'id': this.form.controls['locationID'].value }).text;
  }

  ngOnInit() {
      this.getDustLocations();
      if (this.dust) {
          this.form.controls['locationID'].setValue(this.dust.locationID);
          this.selectedLocation = this.dust.locationID;
          this.form.controls['dustIPAddress'].setValue(this.dust.dustIPAddress);
          this.form.controls['dustType'].setValue(this.dust.dustType);
          this.form.controls['dustName'].setValue(this.dust.dustName);
          this.form.controls['version'].setValue(this.dust.version);
          this.form.controls['isActive'].setValue(this.dust.isActive);
          this.form.controls['m_wAuto_puls_val'].setValue(this.dust.m_wAuto_puls_val);
          this.form.controls['m_wPower_value'].setValue(this.dust.m_wPower_value);
          this.form.controls['m_waCurrent_nowx10'].setValue(this.dust.m_waCurrent_nowx10);
          this.form.controls['m_byReserved'].setValue(this.dust.m_byReserved);
          this.form.controls['m_fParam_power'].setValue(this.dust.m_fParam_power);
          this.form.controls['m_wParam_runtime'].setValue(this.dust.m_wParam_runtime);
      }
      else {
          this.dust = new Dust();
      }
  }
    close(): void {
        this.dialogRef.close();
    }

    /*fileChange($event) :void {
        var fd = new FormData();
        const file: File = $event.target.files[0];
        fd.append('image', file);
        console.log("$event", file.name);
        this.http.post('http://localhost:3300/uploadImage', fd).subscribe(resp => {
            console.log('asdfasdfsd');
        });
        this.form.controls['image'].setValue(file.name);
    }*/

}
