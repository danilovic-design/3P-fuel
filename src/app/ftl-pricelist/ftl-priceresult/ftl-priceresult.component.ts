import { Component, Input } from '@angular/core';

@Component({
  selector: 'ftl-priceresult',
  templateUrl: './ftl-priceresult.component.html',
  styleUrls: ['./ftl-priceresult.component.css'],
})
export class FtlPriceresultComponent {
  @Input() showResult: any;
  @Input() ftlPrice: any;

  reloadPage() {
    window.location.href = '/ftl';
  }
}
