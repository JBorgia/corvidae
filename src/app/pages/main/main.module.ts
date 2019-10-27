import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XmButtonModule, XmCardModule, XmDirectivesModule } from '@optek/xm-bootstrap';
import { AngularSplitModule } from 'angular-split';

import { MapModule } from '../../common/map/map.module';
import { MainComponent } from './main.component';


export const ROUTES: Routes = [{
  path: '',
  data: {
    browserTabTitle: 'Main',
    breadcrumbs: [
      {
        title: 'Main',
        breadcrumbElements: [
          { type: 'url', value: '/' },
        ]
      },
    ]
  },
  component: MainComponent
}];


@NgModule({
  imports: [
    AngularSplitModule.forRoot(),
    RouterModule.forChild(ROUTES),
    CommonModule,
    MapModule,
    XmCardModule,
    XmButtonModule,
    XmDirectivesModule,
  ],
  declarations: [
    MainComponent
  ],
})
export class MainModule { }
