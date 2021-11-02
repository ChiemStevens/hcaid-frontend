import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ResultComponent } from './result/result.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  { path: 'result', component: ResultComponent },
  { path: 'test', component: TestComponent },
  { path: '', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
