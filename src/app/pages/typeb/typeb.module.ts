import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {SharedModule} from '../../shared/shared.module';
import {PipesModule} from '../../theme/pipes/pipes.module';
import {TypebComponent} from './typeb.component';
import {DustBViewComponent} from './dustb-view/dustb-view.component';

export const routes = [
  { path: '', component: TypebComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule
  ],
  declarations: [
      TypebComponent,
      DustBViewComponent
  ],
  entryComponents: [
      DustBViewComponent
  ]
})
export class TypebModule { }
