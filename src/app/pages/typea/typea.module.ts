import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import {TypeaComponent} from './typea.component';
import {DustViewComponent} from './dust-view/dust-view.component';

export const routes = [
  { path: '', component: TypeaComponent, pathMatch: 'full' }
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
      TypeaComponent,
      DustViewComponent
  ],
  entryComponents:[
      DustViewComponent
  ]
})
export class TypeaModule { }
