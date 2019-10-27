import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XmButtonModule, XmDirectivesModule } from '@optek/xm-bootstrap';

import { NotFoundComponent } from './not-found.component';
import { SnakeGameComponent } from './snake-game/snake-game.component';
import { SnakeGameService } from './snake-game/snake-game.service';

// export const ROUTES: Routes = [{
//   path: '',
//   data: {
//     browserTabTitle: 'Not Found',
//     breadcrumbs: [
//       {
//         title: 'Dashboard',
//         breadcrumbElements: [
//           { type: 'url', value: '/home' },
//         ]
//       },
//       {
//         titleElement: { type: 'string', value: 'Not Found' },
//         breadcrumbElements: [
//           { type: 'url', value: '/404' },
//         ]
//       },
//     ]
//   },
//   component: NotFoundComponent
// }];

@NgModule({
  imports: [
    CommonModule,
    XmButtonModule,
    XmDirectivesModule,
    // RouterModule.forChild(ROUTES),
  ],
  declarations: [
    SnakeGameComponent,
    NotFoundComponent
  ],
  providers: [
    SnakeGameService
  ],
  exports: [
    SnakeGameComponent
  ]
})
export class NotFoundModule { }
