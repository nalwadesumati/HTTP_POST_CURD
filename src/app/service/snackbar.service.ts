import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from './post.service';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(
    private sanckbar: MatSnackBar,
    private _postService: PostService,
  ) {}

  success(message: string) {
    this.sanckbar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  error(message: string) {
    this.sanckbar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

  info(message: string) {
    this.sanckbar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'left',
      verticalPosition: 'top',
      panelClass: ['info-snackbar'],
    });
  }
}
