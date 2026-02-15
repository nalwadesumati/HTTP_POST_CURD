import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PostService } from 'src/app/service/post.service';
import { SnackbarService } from 'src/app/service/snackbar.service';
import { Ipost } from 'src/app/shared/models/post';
import { GetConfirmComponent } from '../../get-confirm/get-confirm.component';
import { filter, switchMap, tap } from 'rxjs';
@Component({
  selector: 'app-post-cards',
  templateUrl: './post-cards.component.html',
  styleUrls: ['./post-cards.component.scss'],
})
export class PostCardsComponent implements OnInit {
  @Input() postObj!: Ipost;
  constructor(
    private _snackbar: SnackbarService,
    private _matDialog: MatDialog,
    private _postService: PostService,
  ) {}

  ngOnInit(): void {}

  onRemove(id: string) {
    let matConfig = new MatDialogConfig();
    matConfig.width = '400px';
    matConfig.data = `Are you sure you want to remove this post with id <strong>${id}</strong>`;

    let matRef = this._matDialog.open(GetConfirmComponent, matConfig);

    matRef
      .afterClosed()
      .pipe(
        tap((res) => {
          if (!res) {
            this._snackbar.error('Post removal cancelled.');
          }
        }),
        filter((res) => res === true),
        switchMap(() => this._postService.removePost(id)),
      )
      .subscribe({
        next: (data) => {
          console.log(data);

          this._postService.setRemovePostId(this.postObj.id);
          this._snackbar.success('Post removed successfully.');
        },
        error: () => {
          this._snackbar.error('Failed to remove post.');
        },
      });
  }

  onEditPost() {
    this._postService.setEditPost(this.postObj);
  }
}
