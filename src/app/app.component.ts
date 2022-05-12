import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { map, Subscription } from 'rxjs';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  @ViewChild('postForm') postform: NgForm
  isloading = false
  error = null
  private errsub: Subscription

  constructor(private http: HttpClient,
    private postservice: PostsService) { }

  ngOnDestroy(): void {
    this.errsub.unsubscribe()
  }

  ngOnInit() {
   this.errsub =  this.postservice.error.subscribe(error => {
      this.error = error
    })
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postservice.createPost(postData.title, postData.content)
    // this.onFetchPosts()
    this.postform.reset()

  }

  onFetchPosts() {
    this.isloading = true
    this.postservice.fetchPost().subscribe(posts => {
      this.isloading = false
      this.loadedPosts = posts
    },error => {
      this.error = error.message;
    })
  }

  onClearPosts() {
    // Send Http request
    this.postservice.deletePost().subscribe(posts => {
      this.loadedPosts = []
    })
  }
  private fetchpost() {
    this.isloading = true

  }
}
