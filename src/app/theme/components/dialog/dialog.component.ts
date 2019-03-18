import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogData {
    message: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<DialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit() {
  }

  onNoClick(): void {
      this.dialogRef.close();
  }

}
