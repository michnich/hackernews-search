import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Query } from './query';

import * as moment from 'moment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  //api uri
  base: string = "http://hn.algolia.com/api/v1/";

  constructor(private http: HttpClient) { }

  //queries the api
  search(search: Query) {
    let searchUrl;

    //sort results by date, or by relevance 
    if (search.sort === "date") {
      searchUrl = `${this.base}search_by_date?query=${search.term}`;  
    }
    else {
      searchUrl = `${this.base}search?query=${search.term}`;  
    }

    //add query tags if needed
    if (search.type !="all") {
      searchUrl = `${searchUrl}&tags=${search.type};`
    }

    //if a time range was supplied
    if (search.range != "all") {
      searchUrl = searchUrl + this.timeRangeQuery(search.range);
    }

    return this.http.get(searchUrl).pipe(
      catchError(this.errorHandler)
    )
  }

  //retrieves the specified page of results from api
  nextSearchPage(search:Query, page: number) {
    let searchUrl;

    //sort results by date, or by relevance 
    if (search.sort === "date") {
      searchUrl = `${this.base}search_by_date?query=${search.term}`;  
    }
    else {
      searchUrl = `${this.base}search?query=${search.term}`;  
    }

    //add query tags if needed
    if (search.type !="all") {
      searchUrl = `${searchUrl}&tags=${search.type};`
    }

    //if a time range was supplied
    if (search.range != "all") {
      searchUrl = searchUrl + this.timeRangeQuery(search.range);
    }

    //query for the next page of results
    searchUrl = `${searchUrl}&page=${page}`;
   
    return this.http.get(searchUrl).pipe(
      catchError(this.errorHandler)
    );
  }

  //returns the portion of the query that specifies a date range
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

  //throws error
  errorHandler(error: HttpErrorResponse) {
    console.log("error handler");
    console.log(error);
    return throwError(error.message || "Server Error");
  }
}
