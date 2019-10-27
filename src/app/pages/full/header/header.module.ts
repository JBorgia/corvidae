import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { XmDirectivesModule, XmDropdownModule, XmSidebarModule } from '@optek/xm-bootstrap';

import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo/logo.component';
import { LeftToggleComponent } from './left-toggle/left-toggle.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [
        LogoComponent,
        HeaderComponent,
        LeftToggleComponent,
        ProfileComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        RouterModule,
        BreadcrumbModule,
        XmDirectivesModule,
        XmDropdownModule,
        XmSidebarModule,
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule { }
