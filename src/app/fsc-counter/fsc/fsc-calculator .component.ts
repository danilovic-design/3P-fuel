import { Component, OnInit } from '@angular/core';
import { Router, ParamMap, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'fsc-calculator',
  templateUrl: './fsc-calculator.component.html',
  styleUrls: ['./fsc-calculator.component.css'],
})
export class FscCalculatorComponent implements OnInit {
  oldFuelPrice: number = 650;
  newFuelPrice: number = 808;
  averageFuelConsumption: number = 30;
  currency: number = 400;
  inputErrors: string[] = [];
  showResult: boolean = false;
  distance: number = 1200;
  FSC: number = 0;
  FSCinEuro: number = 0;
  roundedUpKilometer: number = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}

  calculateFuelPrice = () => {
    //this.showResult = true;
    this.FSC =
      (this.newFuelPrice - this.oldFuelPrice) *
      30 *
      (this.roundedUpKilometer / 100);
    this.FSCinEuro = Math.ceil(this.FSC / this.currency / 10) * 10;
    this.showResult = true;
    return this.FSC;
  };

  validateInputs = () => {
    this.inputErrors = [];
    if (isNaN(this.oldFuelPrice)) {
      this.inputErrors.push('Az üzemanyagár értéke csak szám lehet!');
    }

    if (isNaN(this.newFuelPrice)) {
      this.inputErrors.push('Az üzemanyagár értéke csak szám lehet!');
    }

    if (isNaN(this.distance)) {
      this.inputErrors.push('A távolság értéke csak szám lehet!');
    }

    if (isNaN(this.currency)) {
      this.inputErrors.push('Az árfolyam értéke csak szám lehet!');
    }

    if (this.currency == 0) {
      this.inputErrors.push('Az árfolyam értéke nem lehet nulla!');
    }

    if (this.distance == 0) {
      this.inputErrors.push('Az távolság értéke nem lehet nulla!');
    }
  };

  startCalculation(e: Event) {
    e.preventDefault();

    this.validateInputs();

    if (this.inputErrors.length === 0) {
      this.router.navigate(['fuel'], {
        queryParams: {
          oldFuel: this.oldFuelPrice,
          newFuel: this.newFuelPrice,
          distance: this.distance,
          euro: this.currency,
          show: true,
        },
      });
    }
  }

  resetShowResult() {
    this.showResult = false;
  }

  ngOnInit() {
    this.showResult = false;
    this.route.queryParams.subscribe((params) => {
      if (params['oldFuel'] && !isNaN(params['oldFuel'])) {
        this.oldFuelPrice = parseInt(params['oldFuel']);
      }
      if (params['newFuel'] && !isNaN(params['newFuel'])) {
        this.newFuelPrice = parseInt(params['newFuel']);
      }
      if (params['euro'] && !isNaN(params['euro'])) {
        this.currency = parseInt(params['euro']);
      }
      if (params['distance'] && !isNaN(params['distance'])) {
        this.distance = parseInt(params['distance']);
        this.roundedUpKilometer =
          Math.round(parseInt(params['distance']) / 100) * 100;
      }

      if (params['show'] == 'true') {
        this.calculateFuelPrice();
      }
    });
  }
}
