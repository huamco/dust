import {Component, OnInit, ElementRef, ViewChild, OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {orders, products, customers, refunds, elect} from '../dashboard.data';
import {DustService} from '../../system/dust-register/dust.service';
import {DustClientService} from '../../typea/dust-client.service';

@Component({
    selector: 'app-info-cards',
    templateUrl: './info-cards.component.html',
    styleUrls: ['./info-cards.component.scss'],
    providers: [DustService, DustClientService]
})
export class InfoCardsComponent implements OnInit, OnDestroy {
    public orders: any[];
    public elect: any[];
    public products: any[];
    public customers: any[];
    public refunds: any[];
    public colorScheme = {
        domain: ['#999']
    };
    public autoScale = false;
    @ViewChild('resizedDiv') resizedDiv: ElementRef;
    public previousWidthOfResizedDiv: number = 0;
    public settings: Settings;

    pData: any;
    @Input() chartData: any;
    /*@Output() inputModelChange = new EventEmitter<string>();*/

    constructor(public appSettings: AppSettings,
                public dustService: DustService,
                public dustClientService: DustClientService) {
        this.settings = this.appSettings.settings;
    }

    ngOnInit() {
        this.orders = orders;
        this.products = products;
        this.customers = customers;
        this.refunds = refunds;
        this.elect = elect;
        //this.orders = this.addRandomValue('orders');
        //this.customers = this.addRandomValue('customers');

       /* setTimeout(() => {
            this.getSocketData();
        }, 10000);*/
        this.getSocketData();
        //this.setData();
    }

    getSocketData() {
        this.orders = orders;
        // this.orders[0].series.push(this.chartData);
        //console.log('chartData==>', this.chartData);
        if (this.chartData.length) {
            this.orders[0].series = [];
            for (let i = 1; i < this.chartData.length; i++) {
                let item = this.chartData[i];
                this.orders[0].series.push({"name": item['name'], "value":item['value']});
            }
            setTimeout(() => this.orders = [...orders] );
        }
        /*for (let i = 1; i < 20; i++) {
            this.orders[0].series.push({"name": 1980+i, "value": Math.ceil(Math.random() * 1000000)});
        }*/

        setTimeout(() => {
            this.getSocketData();
        }, 2000);
    }
    public onSelect(event) {
        console.log('event:', event);
    }

    public addRandomValue(param) {
        console.log('param', param);
        switch (param) {
            case 'orders':
                this.dustService.getElectData().subscribe(res => {
                    res.forEach((item) => {
                        console.log('item.m_fParam_power', item.m_fParam_power);
                        this.orders[0].series.push({'name': item.createDate, 'value': item.m_fParam_power});
                    });
                    console.log('this.orders:: ', this.orders);
                    return this.orders;
                });
                break;
            case 'customers':
                for (let i = 1; i < 15; i++) {
                    this.customers[0].series.push({'name': 2000 + i, 'value': Math.ceil(Math.random() * 1000000)});
                }
                return this.customers;
            default:
                return this.orders;
        }
    }

    ngOnDestroy() {
        this.orders[0].series.length = 0;
        //this.customers[0].series.length = 0;
    }

    ngAfterViewChecked() {
        //console.log(this.previousWidthOfResizedDiv);
        //console.log( this.resizedDiv.nativeElement.clientWidth);
        //setTimeout(() => this.orders = [...orders] );

        /*if (this.previousWidthOfResizedDiv != this.resizedDiv.nativeElement.clientWidth) {
            console.log('change');
            setTimeout(() => this.products = [...products]);
            setTimeout(() => this.customers = [...customers]);
            setTimeout(() => this.refunds = [...refunds]);
        }
        this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;*/
    }

}
