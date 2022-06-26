import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FscCalculatorComponent } from './fsc/fsc-calculator .component';
import { FscResultComponent } from './fscresult/fsc-result.component';

const appRoutes: Routes = [
  {
    path: '',
    component: FscCalculatorComponent,
  },
  {
    path: 'fuel',
    component: FscCalculatorComponent,
  },
];

@NgModule({
  declarations: [AppComponent, FscCalculatorComponent, FscResultComponent],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), FormsModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
