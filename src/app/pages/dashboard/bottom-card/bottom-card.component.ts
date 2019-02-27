import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Settings} from '../../../app.settings.model';
import {AppSettings} from '../../../app.settings';
import {customers, orders, products, refunds, elect} from '../dashboard.data';
import {DustService} from '../../system/dust-register/dust.service';
import {DustClientService} from '../../typea/dust-client.service';

@Component({
  selector: 'app-bottom-card',
  templateUrl: './bottom-card.component.html',
  styleUrls: ['./bottom-card.component.scss'],
    providers: [DustService, DustClientService]
})
export class BottomCardComponent implements OnInit {

    public orders1: any[];
    public products: any[];
    public customers: any[];
    public refunds: any[];
    public colorScheme = {
        domain: ['#999']
    };
    public autoScale = true;
    @ViewChild('resizedDiv') resizedDiv:ElementRef;
    public previousWidthOfResizedDiv:number = 0;
    public settings: Settings;
    @Input() chartData1: any;
    constructor(public appSettings:AppSettings){
        this.settings = this.appSettings.settings;
    }

    ngOnInit(){
        this.orders1 = elect;
        this.products = products;
        this.customers = customers;
        this.refunds = refunds;
        //this.orders = this.addRandomValue('orders');
        //this.customers = this.addRandomValue('customers');

        this.getSocketData();
    }

    getSocketData() {
        this.orders1 = elect;
        // this.orders[0].series.push(this.chartData);
        //console.log('chartDatachartDatachartData==>', this.chartData1);
        if (this.chartData1.length) {
            this.orders1[0].series = [];
            for (let i = 1; i < this.chartData1.length; i++) {
                let item = this.chartData1[i];
                this.orders1[0].series.push({"name": item['name'], "value":item['value']});
            }
            setTimeout(() => this.orders1 = [...elect] );
        }
        /*for (let i = 1; i < 20; i++) {
            this.orders[0].series.push({"name": 1980+i, "value": Math.ceil(Math.random() * 1000000)});
        }*/

        setTimeout(() => {
            this.getSocketData();
        }, 2000);
    }

    public onSelect(event) {
        console.log(event);
    }

    public addRandomValue(param) {
       /* switch(param) {
            case 'orders':
                for (let i = 1; i < 30; i++) {
                    this.orders[0].series.push({"name": 1980+i, "value": Math.ceil(Math.random() * 1000000)});
                }
                return this.orders;
            case 'customers':
                for (let i = 1; i < 15; i++) {
                    this.customers[0].series.push({"name": 2000+i, "value": Math.ceil(Math.random() * 1000000)});
                }
                return this.customers;
            default:
                return this.orders;
        }*/
    }

    ngOnDestroy(){
        this.orders1[0].series.length = 0;
        //this.customers[0].series.length = 0;
    }

    ngAfterViewChecked() {
        /*if(this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth){
            setTimeout(() => this.orders = [...orders] );
            setTimeout(() => this.products = [...products] );
            setTimeout(() => this.customers = [...customers] );
            setTimeout(() => this.refunds = [...refunds] );
        }
        this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;*/
    }

}
