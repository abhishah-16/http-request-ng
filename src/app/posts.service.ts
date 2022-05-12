import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  error = new Subject<string>()
  constructor(private http: HttpClient) { }

  createPost(title: string, content: string) {
    
    const postData: Post = {
      title,
      content
    }
    this.http
      .post('https://angular-recipe-app-b1495-default-rtdb.firebaseio.com/posts.json',
        postData)
      .subscribe(response => {
        console.log(response)
      },(error) =>{
        this.error.next(error.message)
      })
    
  }

  fetchPost() {
    const loadedPosts: Post[] = []
    return this.http
      .get('https://angular-recipe-app-b1495-default-rtdb.firebaseio.com/posts.json',{
        headers: new HttpHeaders({'custom-header':'hello'}),
        params: new HttpParams().set('print','pretty')
      })
      .pipe(map((response: { [key: string]: Post }) => {
        const postarray: Post[] = []
        for (const key in response) {
          postarray.push({ ...response[key], id: key })
        }
        return postarray
      }))
  }
  deletePost(){
    return this.http
      .delete('https://angular-recipe-app-b1495-default-rtdb.firebaseio.com/posts.json')
      
  }
}
