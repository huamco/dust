import {Component, OnDestroy, OnInit} from '@angular/core';
import {Dust} from '../dust-register/dust.model';
import {DustService} from '../dust-register/dust.service';
import {DustClientService} from '../../typea/dust-client.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss'],
    providers: [ DustService]
})
export class MonitoringComponent implements OnInit, OnDestroy {

    public dusts: Dust[];
    messages = [];
    connection;
    message = 'hello';
    paramData: any = {};
    m_waCurrent_nowx10: any = 0;
    public displayedColumns = ['dustIPAddress', 'dustType', 'img'];
    public dataSource: any;

    constructor(public dustService: DustService,
                public dustClientService: DustClientService) { }

  ngOnInit() {
      this.getDusts();
      this.connection = this.dustClientService.getMessages().subscribe(data => {
          console.log('ngOnInit data==>', data);
          this.paramData =  data;
          // m_waCurrent_nowx10
          for(let i = 0; i < this.paramData.m_waCurrent_nowx10.length; i++) {
              if(this.paramData.m_waCurrent_nowx10[i] > 0) {
                  this.m_waCurrent_nowx10 = (this.paramData.m_waCurrent_nowx10[i] / 10);
              }
          }
      });
      //this.sendMessage();
  }

  public getDusts(): void {
      this.dusts = null; //for show spinner each time
      this.dustService.getDusts().subscribe(dusts => {
          this.dusts = dusts;
          console.log(this.dusts);
          this.dataSource = new MatTableDataSource<Dust>(this.dusts);
          /*this.dustClientService.getClient().subscribe(d =>{
            console.log('ddddd=>',d);
          });*/
      });
  }

  ngOnDestroy() {
      //this.connection.unsubscribe();
  }

}
