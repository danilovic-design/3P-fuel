import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FscCalculatorComponent } from './fsc-counter/fsc/fsc-calculator .component';
import { FscResultComponent } from './fsc-counter/fscresult/fsc-result.component';
import { FtlPricelist } from './ftl-pricelist/ftl-pricelist.component';
import { HeaderComponent } from './header/header.component';
import { FtlPriceresultComponent } from './ftl-pricelist/ftl-priceresult/ftl-priceresult.component';

const appRoutes: Routes = [
  {
    path: 'ftl',
    component: FtlPricelist,
  },
  {
    path: 'fuel',
    component: FscCalculatorComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/fuel',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    FscCalculatorComponent,
    FscResultComponent,
    FtlPricelist,
    HeaderComponent,
    FtlPriceresultComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(appRoutes), FormsModule],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
