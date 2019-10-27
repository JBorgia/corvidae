import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { XmDirectivesModule } from '@optek/xm-bootstrap';

import { BreadcrumbComponent } from './breadcrumb.component';
import { BreadcrumbService } from './breadcrumb.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    XmDirectivesModule,
  ],
  declarations: [
    BreadcrumbComponent,
  ],
  exports: [
    BreadcrumbComponent,
  ],
  providers: [
    BreadcrumbService
  ]
})
export class BreadcrumbModule { }
