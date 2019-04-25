import {Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {AppSettings} from '../../../app.settings';
import {Settings} from '../../../app.settings.model';
import {customers, elect, orders, products, dailyPowers, monthlyPowers } from '../dashboard.data';
import {DustService} from '../../system/dust-register/dust.service';
import {DustClientService} from '../../typea/dust-client.service';

@Component({
    selector: 'app-info-cards',
    templateUrl: './info-cards.component.html',
    styleUrls: ['./info-cards.component.scss'],
    providers: [DustService]
})
export class InfoCardsComponent implements OnInit, OnDestroy {
    public orders: any[];
    public elect: any[];
    public products: any[];
    public dailyPowers: any[];
    public monthlyPowers: any[];
    public colorScheme = {
        domain: ['#999']
    };
    public autoScale = false;
    @ViewChild('resizedDiv') resizedDiv: ElementRef;
    public previousWidthOfResizedDiv: number = 0;
    public settings: Settings;

    pData: any;
    @Input() chartData: any;
    @Input() dailyChartData: any;
    @Input() monthlyChartData: any;
    /*@Output() inputModelChange = new EventEmitter<string>();*/

    constructor(public appSettings: AppSettings,
                public dustService: DustService,
                public dustClientService: DustClientService) {
        this.settings = this.appSettings.settings;
    }

    ngOnInit() {
        this.orders = orders;
        this.products = products;
        this.dailyPowers = dailyPowers;
        this.monthlyPowers = monthlyPowers;
        this.elect = elect;
        //this.orders = this.addRandomValue('orders');
        //this.customers = this.addRandomValue('customers');

       /* setTimeout(() => {
            this.getSocketData();
        }, 10000);*/
        this.getSocketData();
        //this.getDailyPowerData();
        //this.setData();
    }

    getSocketData() {
        /*this.orders = elect;
/!*        if (this.chartData.length) {
            this.orders[0].series = [];
            for (let i = 1; i < this.chartData.length; i++) {
                let item = this.chartData[i];
                this.orders[0].series.push({"name": item['name'], "value":item['value']});
            }
            setTimeout(() => this.orders = [...orders] );
        }*!/

        this.dailyPowers = dailyPowers;
        if (this.dailyChartData.length) {
            this.orders[0].series = [];
            for (let i = 1; i < this.dailyChartData.length; i++) {
                let item = this.dailyChartData[i];
                this.dailyPowers.push({"name": item['name'], "value":item['value']});
            }
            setTimeout(() => this.dailyPowers = [...dailyPowers] );
        }

        this.monthlyPowers = monthlyPowers;
        if (this.monthlyChartData.length) {
            this.orders[0].series = [];
            for (let i = 1; i < this.monthlyChartData.length; i++) {
                let item = this.monthlyChartData[i];
                this.monthlyPowers.push({"name": item['name'], "value":item['value']});
            }
            setTimeout(() => this.monthlyPowers = [...monthlyPowers] );
        }

        setTimeout(() => {
            this.getSocketData();
        }, 2000);*/
    }

    public onSelect(event) {
        console.log('event:', event);
    }

    ngOnDestroy() {
        this.orders[0].series.length = 0;
        //this.customers[0].series.length = 0;
    }
}
