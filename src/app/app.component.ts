import { Component, inject, OnInit } from '@angular/core';
import { SpinnerService } from './service/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'postHTTP';

  isLoading: boolean = false;
  private _spinnerService = inject(SpinnerService);

  ngOnInit(): void {
    this._spinnerService.spinnerStatusObs$.subscribe((flag) => {
      this.isLoading = flag;
    });
  }
}
