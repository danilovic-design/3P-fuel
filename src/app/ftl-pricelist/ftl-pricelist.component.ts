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
  newFuel: number = 810;
  inputErrors: string[] = [];
  inputWarnings: string[] = [];
  ferryPrice: number = 370;
  hungaryPostcode: string = '1230';
  swedenPostcode: string = '10000';
  currency: number = 400;
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

  ngOnInit() {}

  onButtonPush() {
    this.validateInputs();
    this.getInputWarnings();
    if (
      this.inputErrors.length === 0 &&
      this.swedenPostcode.charAt(0) !== '6'
    ) {
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

  getInputWarnings = () => {
    this.inputWarnings = [];
    if (this.swedenPostcode.startsWith('62')) {
      this.inputWarnings.push(
        'Gotlandi szállításainkra kérje egyedi ajánlatunkat'
      );
    }
    if (this.swedenPostcode.charAt(0) === '8') {
      this.inputWarnings.push(
        'Nagy elterülésű terület, érdemes egyéni ajánlat kiadása.'
      );
    }
    if (this.swedenPostcode.charAt(0) === '9') {
      this.inputWarnings.push(
        'Nagy kiterülésű terület, érdemes egyéni ajánlat kiadása.'
      );
    }
  };

  validateInputs = () => {
    this.inputErrors = [];

    if (isNaN(this.newFuel)) {
      this.inputErrors.push('Az üzemanyagár értéke csak szám lehet!');
    }

    if (isNaN(this.currency)) {
      this.inputErrors.push('Az árfolyam értéke csak szám lehet!');
    }

    if (isNaN(this.ferryPrice)) {
      this.inputErrors.push('A kompdíj értéke csak szám lehet!');
    }

    if (isNaN(parseInt(this.swedenPostcode))) {
      this.inputErrors.push('A svéd irányítószám 5 számból állhat');
    }

    if (isNaN(parseInt(this.hungaryPostcode))) {
      this.inputErrors.push('A magyar irányítószám 5 számból állhat');
    }

    if (this.swedenPostcode.length > 5 || this.swedenPostcode.length === 0) {
      this.inputErrors.push('A svéd irányítószám 5 számból állhat');
    }

    if (this.hungaryPostcode.length > 4 || this.hungaryPostcode.length === 0) {
      this.inputErrors.push('A magyar irányítószám 4 számból állhat');
    }

    if (this.currency == 0) {
      this.inputErrors.push('Az árfolyam értéke nem lehet nulla!');
    }
  };
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
