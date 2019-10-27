import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { XmDirectivesModule, XmDropdownModule, XmSidebarModule } from '@optek/xm-bootstrap';

import { FullComponent } from './full.component';
import { HeaderModule } from './header/header.module';
import { ToolBarModule } from './tool-bar/tool-bar.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    XmDirectivesModule,
    XmDropdownModule,
    XmSidebarModule,
    HeaderModule,
    ToolBarModule
  ],
  declarations: [
    FullComponent,
    NavBarComponent,
  ],
})
export class FullModule { }
