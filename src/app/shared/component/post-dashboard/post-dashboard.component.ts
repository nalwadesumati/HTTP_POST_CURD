import { Component, Input, OnInit } from '@angular/core';
import { Ipost } from '../../models/post';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.scss'],
})
export class PostDashboardComponent implements OnInit {
  postArr: Array<Ipost> = [];

  constructor(private _postService: PostService) {}

  ngOnInit(): void {
    this.getPost();
    this.onUpdatePost();
    this.onAddPost();
    this.onRemovePost();
  }

  getPost() {
    this._postService.fetchPosts().subscribe({
      next: (data) => {
        this.postArr = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onUpdatePost() {
    this._postService.updatePostObs$.subscribe((post: Ipost) => {
      let gteIndex = this.postArr.findIndex((m) => m.id === post.id);
      this.postArr[gteIndex] = post;
    });
  }

  onAddPost() {
    this._postService.newPostObs$.subscribe({
      next: (data) => {
        this.postArr.unshift(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onRemovePost() {
    this._postService.removePostObj$.subscribe((id) => {
      let gteIndex = this.postArr.findIndex((p) => p.id === id);
      this.postArr.splice(gteIndex, 1);
    });
  }
}
