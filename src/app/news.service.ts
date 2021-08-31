import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  base: string = "http://hn.algolia.com/api/v1/";

  constructor(private http: HttpClient) { }

  search(term: string, type: string) {
    let searchUrl = `${this.base}search?query=${term}`;

    //add query tags if needed
    if (type !="all") {
      searchUrl = `${searchUrl}&tags=${type};`
    }

    return this.http.get(searchUrl);
  }
}
