import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Feed } from './feed';
import { HttpClient } from "@angular/common/http";

//import Pusher from 'pusher-js';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  private subject: Subject<Feed> = new Subject<Feed>();



  constructor(private http: HttpClient) {   

    const requestOptions: Object = {
      observe: "body",
      responseType: "text"
    };
    this.http     
      .get<any>(
        "localhost:5000/pics",
        requestOptions
      )
      .subscribe(data => {     
        
        this.subject.next(new Feed(data.title, data.body, new Date(data.time)));
        
      });
  }

  getFeedItems(): Observable<Feed> {
    return this.subject.asObservable();
  }
}
