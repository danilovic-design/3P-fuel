import { Component, Input } from '@angular/core';

@Component({
  selector: 'fsc-result',
  templateUrl: './fsc-result.component.html',
  styleUrls: ['./fsc-result.component.css'],
})
export class FscResultComponent {
  @Input('FSC') FSCResult: any;
  @Input('kilometer') kilometer: any;
  @Input('roundedUpKilometer') roundedUpKilometer: any;
  @Input('newFuelPrice') newFuelPrice: any;
  @Input('oldFuelPrice') oldFuelPrice: any;
  @Input('FSCinEuro') FSCinEuro: any;

  reloadPage() {
    window.location.href = '/';
  }
}
