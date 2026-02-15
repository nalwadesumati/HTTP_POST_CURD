import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';

// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptor } from '../interceptor/auth.interceptor';
const matArr = [
  MatButtonModule,
  MatIconModule,
  MatSnackBarModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatCardModule,
];
@NgModule({
  declarations: [],
  imports: [...matArr],
  exports: [...matArr],
})
export class MaterialModule {}
