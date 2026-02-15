import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostService } from 'src/app/service/post.service';
import { SnackbarService } from 'src/app/service/snackbar.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  postForm!: FormGroup;
  isEditMode: boolean = false;
  editPostId!: string;
  editId!: string;

  userIdArr: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(
    private _postService: PostService,
    private _snackbarService: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.createPostForm();
    this.pactchData();
  }

  createPostForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      userId: new FormControl(1, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required]),
    });
  }

  onPostAdd() {
    if (this.postForm.valid) {
      let post = this.postForm.value;
      console.log(post);
      this._postService.createPost(post).subscribe({
        next: (data) => {
          console.log(data);
          this._postService.setNewPost({ ...post, id: data.name });
          this.postForm.reset();
          this._snackbarService.success('Post added successfully!');
        },
        error: (err) => {
          this._snackbarService.error(
            'Unable to add student. Please try again.',
          );
        },
      });
    }
  }

  pactchData() {
    this._postService.editPostObs$.subscribe((data) => {
      if (data) {
        this.isEditMode = true;
        this.editId = data.id;
        this.postForm.patchValue(data);
      }
    });
  }
  onPostUpdate() {
    if (this.postForm.valid) {
      let updated_obj = { ...this.postForm.value, id: this.editId };

      this._postService.updatePost(updated_obj).subscribe({
        next: () => {
          this.postForm.reset();
          this.isEditMode = false;

          // send correct object with id
          this._postService.setUpdatePost(updated_obj);

          this._snackbarService.success('Post updated successfully.');
        },
        error: () => {
          this._snackbarService.error('Failed to update Post.');
        },
      });
    }
  }
}
