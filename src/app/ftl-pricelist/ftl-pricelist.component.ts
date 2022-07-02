import { Component, OnInit } from '@angular/core';
import { FtlPrice } from '../ftl-price/ftl-price.module';
/*import {
  swedenKilometers,
  hungaryKilometers,
  expectedImport,
} from './tmp/db.module';*/

@Component({
  selector: 'ftl-pricelist',
  templateUrl: './ftl-pricelist.component.html',
  styleUrls: ['./ftl-pricelist.component.css'],
})
export class FtlPricelist implements OnInit {
  newFuel: number = 480;
  ferryPrice: number = 310;
  hungaryPostcode: string = '1230';
  swedenPostcode: string = '90000';
  currency: number = 360;
  ftlPrice: FtlPrice = new FtlPrice(
    this.swedenPostcode,
    this.hungaryPostcode,
    this.newFuel,
    this.currency,
    this.ferryPrice
  );

  showResult: boolean = false;

  resetShowResult() {
    this.showResult = false;
  }

  ngOnInit() {
    console.log('inited');
  }

  onButtonPush() {
    console.log('button.push');
    this.ftlPrice = new FtlPrice(
      this.swedenPostcode,
      this.hungaryPostcode,
      this.newFuel,
      this.currency,
      this.ferryPrice
    );
    this.showResult = true;
  }
}

/*
class FtlPrice {
  oldFuel: number = 480;
  perKilometerPrice: number = 0.85;
  commissionAtLeast: number = 150;

  constructor(
    private swedenPostcode: string,
    private hungaryPostcode: string,
    private newFuel: number,
    private currency: number,
    private ferry: number
  ) {}

  private getSwedenKilometers() {
    let postCodeFirstDigit: string = this.swedenPostcode.charAt(0);
    let postCodeSecondDigit: string = this.swedenPostcode.charAt(1);
    if (
      swedenKilometers[parseInt(postCodeFirstDigit) - 1][
        parseInt(postCodeSecondDigit) - 1
      ]
    ) {
      return swedenKilometers[parseInt(postCodeFirstDigit) - 1][
        parseInt(postCodeSecondDigit) - 1
      ];
    }
    return swedenKilometers[parseInt(postCodeFirstDigit) - 1][0];
  }

  private getHungaryKilometers() {
    let postCodeFirstDigit: string = this.hungaryPostcode.charAt(0);
    let postCodeSecondDigit: string = this.hungaryPostcode.charAt(1);
    if (
      hungaryKilometers[parseInt(postCodeFirstDigit) - 1][
        parseInt(postCodeSecondDigit) - 1
      ]
    ) {
      return hungaryKilometers[parseInt(postCodeFirstDigit) - 1][
        parseInt(postCodeSecondDigit) - 1
      ];
    }
    return hungaryKilometers[parseInt(postCodeFirstDigit) - 1][0];
  }

  public getExportDistance() {
    return this.getSwedenKilometers() + this.getHungaryKilometers() + 700;
  }

  public getExportFsc() {
    let FSC: number =
      (this.newFuel - this.oldFuel) * 30 * (this.getExportDistance() / 100);
    let FSCinEuro: number = Math.ceil(FSC / this.currency / 10) * 10;
    return { FSC, FSCinEuro };
  }

  public getExport() {
    let postCodeFirstDigit: string = this.swedenPostcode.charAt(0);
    let importPrice: number =
      expectedImport[parseInt(postCodeFirstDigit) - 1][0];
    console.log('expected import price', importPrice);
    let FSC: number = this.getExportFsc().FSCinEuro;
    console.log('Fsc @', this.newFuel, 'forint:', FSC);
    let fullExportPrice =
      this.getExportDistance() * 2 * this.perKilometerPrice +
      this.ferry * 2 -
      importPrice +
      FSC +
      this.commissionAtLeast;
    console.log('full export price', fullExportPrice);
    return Math.round(fullExportPrice * 50) / 50;
  }

  getImport() {
    return this.oldFuel;
  }
}
*/
