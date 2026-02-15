import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  private spinnerStatus$: Subject<boolean> = new Subject<boolean>();

  spinnerStatusObs$: Observable<boolean> = this.spinnerStatus$.asObservable();

  constructor() {}
  setSpinnerStetus(flag: boolean) {
    this.spinnerStatus$.next(flag);
  }
}
