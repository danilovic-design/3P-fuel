import {
  swedenKilometers,
  hungaryKilometers,
  expectedImport,
} from '../ftl-pricelist/tmp/db.module';

export class FtlPrice {
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
        parseInt(postCodeSecondDigit)
      ]
    ) {
      return swedenKilometers[parseInt(postCodeFirstDigit) - 1][
        parseInt(postCodeSecondDigit)
      ];
    }
    return swedenKilometers[parseInt(postCodeFirstDigit) - 1][0];
  }

  private getHungaryKilometers() {
    let postCodeFirstDigit: string = this.hungaryPostcode.charAt(0);
    let postCodeSecondDigit: string = this.hungaryPostcode.charAt(1);

    if (
      hungaryKilometers[parseInt(postCodeFirstDigit) - 1][
        parseInt(postCodeSecondDigit)
      ]
    ) {
      return hungaryKilometers[parseInt(postCodeFirstDigit) - 1][
        parseInt(postCodeSecondDigit)
      ];
    }
    return hungaryKilometers[parseInt(postCodeFirstDigit) - 1][0];
  }

  public getExportDistance() {
    return this.getSwedenKilometers() + this.getHungaryKilometers() + 700;
  }

  public getFuelDifference() {
    if (this.newFuel >= this.oldFuel) {
      return this.newFuel - this.oldFuel;
    }
    return 0;
  }

  public getExportFsc() {
    let FSC: number =
      this.getFuelDifference() * 30 * (this.getExportDistance() / 100);
    let FSCinEuro: number = Math.ceil(FSC / this.currency / 10) * 10;
    return { FSC, FSCinEuro };
  }

  public getExport() {
    let postCodeFirstDigit: string = this.swedenPostcode.charAt(0);
    let importPrice: number =
      expectedImport[parseInt(postCodeFirstDigit) - 1][0];
    let FSC: number = this.getExportFsc().FSCinEuro;
    let fullExportPrice =
      (this.getExportDistance() + 1150 + this.getSwedenKilometers()) *
        this.perKilometerPrice +
      this.ferry * 2 -
      importPrice +
      FSC * 1.2 +
      this.commissionAtLeast;
    return Math.round(fullExportPrice / 50) * 50;
  }

  getImport() {
    return this.oldFuel;
  }
}
