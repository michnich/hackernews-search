import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  base: string = "http://hn.algolia.com/api/v1/";

  constructor(private http: HttpClient) { }

  search(term: string, type: string, sort: string, time: string) {
    let searchUrl;

    //sort results by date, or by relevance 
    if (sort === "date") {
      searchUrl = `${this.base}search_by_date?query=${term}`;  
    }
    else {
      searchUrl = `${this.base}search?query=${term}`;  
    }

    //add query tags if needed
    if (type !="all") {
      searchUrl = `${searchUrl}&tags=${type};`
    }

    //if a time range was supplied
    if (time != "all") {
      searchUrl = searchUrl + this.timeRangeQuery(time);
    }

    return this.http.get(searchUrl);
  }

  timeRangeQuery(range: string) {
    let today = moment();
    let startDate!: any;

    //check for the time range type
    //create date for query
    if (range === 'day') {
      startDate = today.subtract(24, 'hours');
    }
    else if (range === 'week') {
      startDate = today.startOf('day').subtract(7, 'days');
    }
    else if (range === 'month') {
      startDate = today.startOf('day').subtract(1, 'months');
    }
    else if (range === 'year') {
      startDate = today.startOf('day').subtract(1, 'years');
    }

    //api needs unix timestamps for querying
    return `&numericFilters=created_at_i>${startDate.unix()}`;
  }
}
