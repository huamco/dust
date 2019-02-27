import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DustLocation} from '../../../system/dust-register/dust-location.model';

@Component({
  selector: 'app-dust-info',
  templateUrl: './dust-info.component.html',
  styleUrls: ['./dust-info.component.scss']
})
export class DustInfoComponent implements OnInit {

  public form: FormGroup;
  constructor(public dialogRef: MatDialogRef<DustInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public dustLocation: DustLocation,
              public fb: FormBuilder) {
      this.form = this.fb.group({
          id: null,
          location: null,
          isActive: 0
      });
  }

  ngOnInit() {
      if (this.dustLocation) {
          this.form.controls['id'].setValue(this.dustLocation.id);
          this.form.controls['location'].setValue(this.dustLocation.location);
          this.form.controls['isActive'].setValue(this.dustLocation.isActive);
      }
      else {
          this.dustLocation = new DustLocation();
      }
  }

    close(): void {
        this.dialogRef.close();
    }
}
