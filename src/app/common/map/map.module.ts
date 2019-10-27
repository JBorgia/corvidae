import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XmButtonModule, XmTooltipModule } from '@optek/xm-bootstrap';

import { MapComponent } from './map.component';


@NgModule({
  imports: [
    CommonModule,
    XmTooltipModule,
    XmButtonModule,
  ],
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  providers: []
})
export class MapModule { }
