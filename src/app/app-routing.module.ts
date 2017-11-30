import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CMembersComponent } from './c-members/c-members.component';
import { MemberDetailComponent } from './member-detail/member-detail.component';
import { MemberMapComponent } from './member-map/member-map.component';

const routes: Routes = [
  { path: 'members', component: CMembersComponent },
  { path: 'map', component: MemberMapComponent },
  { path: 'detail/:id', component: MemberDetailComponent },
    { path: '', redirectTo: '/members', pathMatch: 'full' }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}