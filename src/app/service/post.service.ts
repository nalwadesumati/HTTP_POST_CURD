import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost, IpostRes } from '../shared/models/post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  BASE_URL: string = environment.BASE_URL;
  POST_URL: string = `${this.BASE_URL}/posts.json`;

  private newPostSub$: Subject<Ipost> = new Subject<Ipost>();
  newPostObs$: Observable<Ipost> = this.newPostSub$.asObservable();

  private removePostsub$: Subject<string> = new Subject<string>();
  removePostObj$: Observable<string> = this.removePostsub$.asObservable();

  private editPostSub$: Subject<Ipost> = new Subject<Ipost>();
  editPostObs$: Observable<Ipost> = this.editPostSub$.asObservable();

  private updatePostSub$: Subject<Ipost> = new Subject<Ipost>();
  updatePostObs$: Observable<Ipost> = this.updatePostSub$.asObservable();

  setNewPost(post: Ipost) {
    this.newPostSub$.next(post); ////as a observer
  }

  setRemovePostId(id: string) {
    this.removePostsub$.next(id);
  }

  setEditPost(post: Ipost) {
    this.editPostSub$.next(post);
  }
  setUpdatePost(post: Ipost) {
    this.updatePostSub$.next(post);
  }

  constructor(private _http: HttpClient) {}

  fetchPosts(): Observable<any> {
    return this._http.get<any>(this.POST_URL).pipe(
      map((obj) => {
        let postArr: Array<Ipost> = [];
        for (const key in obj) {
          postArr.unshift({ ...obj[key], id: key });
        }
        return postArr;
      }),
    );
  }

  createPost(postObj: Ipost): Observable<IpostRes> {
    return this._http.post<any>(this.POST_URL, postObj);
  }

  updatePost(updatePost: Ipost): Observable<Ipost> {
    let update_url: string = `${this.BASE_URL}/posts/${updatePost.id}.json`;
    return this._http.patch<Ipost>(update_url, updatePost);
  }

  removePost(id: string): Observable<any> {
    let remove_url = `${this.BASE_URL}/posts/${id}.json`;
    return this._http.delete<any>(remove_url);
  }
}
