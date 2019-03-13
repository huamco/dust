import { Component, OnInit } from '@angular/core';
import {MatDialog, MatTableDataSource} from '@angular/material';
import {DustService} from './dust.service';
import {Dust} from './dust.model';
import {Settings} from '../../../app.settings.model';
import {DustInfoComponent} from './dust-info/dust-info.component';
import {DustLocationService} from './dust-location.service';
import {DustLocation} from './dust-location.model';
import {LocationInfoComponent} from './location-info/location-info.component';

@Component({
  selector: 'app-dust-register',
  templateUrl: './dust-register.component.html',
  styleUrls: ['./dust-register.component.scss'],
    providers: [ DustService, DustLocationService ]
})
export class DustRegisterComponent implements OnInit {

  public displayedColumns = ['location', 'count', 'isActive', 'delete'];
  public displayedColumns1 = ['dustName','dustIPAddress', 'dustType', 'version', 'isActive','delete'];
  public dataSource: any;
  public dataSource1: any;
  public settings: Settings;
  public dusts: Dust[];
  public filter_dusts: Dust[];
  public dustLocations: DustLocation[];
  public dustLocation: DustLocation[];
  dialogRef: any;

  constructor(public dialog: MatDialog,
              public dustService: DustService,
              public dustLocationService: DustLocationService) { }

  ngOnInit() {
      this.getDustLocations();
  }

    public getDustLocations(): void {
      this.dusts = null; //for show spinner each time
      this.dustLocationService.getLocations().subscribe(dustLocations => {
          this.dustLocations = dustLocations;
          this.dataSource = new MatTableDataSource<DustLocation>(this.dustLocations);
          if(!this.dusts) {
              this.showDustList(this.dusts);
          }
      });
    }

    public getDusts(id?): void {
        this.dusts = null; //for show spinner each time
        this.dustService.getDusts().subscribe(dusts => {
            this.dusts = dusts;
            this.dataSource1 = new MatTableDataSource<Dust>(this.dusts);
            if(id) {
                this.filter_dusts = this.dusts.filter(x => id.toString() === x.locationID);
                this.dataSource1 = new MatTableDataSource<Dust>(this.filter_dusts);
                //console.log(this.filter_dusts);
                /*console.log(dusts);*/
            }
        });
    }

    public addDust(dust: Dust) {
      this.dustService.addDust(dust).subscribe(dusts => this.getDusts());
    }
    public addImage(f: File) {
       this.dustService.addImage(f).subscribe( resp => console.log('resp', resp));
    }
    public updateDust(dust: Dust) {
        this.dustService.updateDust(dust).subscribe(dusts => this.getDusts());
    }

    public deleteDust(dust: Dust) {
        this.dustService.deleteDust(dust.id).subscribe(dusts => this.getDusts());
    }

    public addDustLocation(dustLocation: DustLocation) {
        this.dustLocationService.addDustLocation(dustLocation).subscribe(dusts => this.getDustLocations());
    }

    public updateDustLocation(dustLocation: DustLocation) {
        this.dustLocationService.updateDustLocation(dustLocation).subscribe(dusts => this.getDustLocations());
    }

    public deleteDustLocations(dustLocation: DustLocation) {
      this.dustLocationService.deleteDustLocation(dustLocation.id).subscribe(dusts => this.getDustLocations());
    }

    public openDustLocationDialog(dustLocation) {
      this.dialogRef = this.dialog.open(DustInfoComponent, {
          data: dustLocation
      });

      this.dialogRef.afterClosed().subscribe(dustLocation => {
          if (dustLocation) {
              (dustLocation.id) ? this.updateDustLocation(dustLocation) : this.addDustLocation(dustLocation);
          }
      });
    }

    showDustList(dustLocationID) {
      this.getDusts(dustLocationID);
    }

    public openDustDialog(dust) {
        //console.log(dustLocation);
        this.dialogRef = this.dialog.open(LocationInfoComponent, {
            data: dust
        });

        this.dialogRef.afterClosed().subscribe(dust => {
            console.log(dust);
            if (dust) {
                (dust.id) ? this.updateDust(dust) : this.addDust(dust);
            }
        });
    }
}
