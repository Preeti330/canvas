import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DragdropimgComponent } from './canvas/dragdropimg/dragdropimg.component';

const routes: Routes = [
  {
    path:"canvas",
    component:DragdropimgComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
