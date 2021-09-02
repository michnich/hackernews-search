import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Query } from './query';

import * as moment from 'moment';
import { Moment } from 'moment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  //api uri
  base: string = "https://hn.algolia.com/api/v1/";

  constructor(private http: HttpClient) { }

  //queries the api
  search(search: Query) {
    let searchUrl = this.constructQuery(search);
    return this.http.get(searchUrl).pipe(
      catchError(this.errorHandler)
    )
  }

  //retrieves the specified page of results from api
  nextSearchPage(search:Query, page: number) {
    let searchUrl = this.constructQuery(search);

    //add on to query for the next page of results
    searchUrl = `${searchUrl}&page=${page}`;
   
    return this.http.get(searchUrl).pipe(
      catchError(this.errorHandler)
    );
  }

  constructQuery(search:Query) {
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
      if (search.range === 'custom') {
        searchUrl = searchUrl + this.timeRangeQuery(search.range, search.startDate, search.endDate);
      }
      else {
        searchUrl = searchUrl + this.timeRangeQuery(search.range);
      }
    }
    return searchUrl;
  }
  //returns the portion of the query that specifies a date range
  timeRangeQuery(range: string, start?:Moment, end?:Moment ) {
    let today = moment();
    let startDate!: Moment;
    let endDate: Moment;

    let rangeString = '';

    //check for the time range type
    //create date for query
    if (range === 'day') {
      startDate = today.subtract(24, 'hours');
      rangeString = `&numericFilters=created_at_i>${startDate.unix()}`;
    }
    else if (range === 'week') {
      startDate = today.startOf('day').subtract(7, 'days');
      rangeString = `&numericFilters=created_at_i>${startDate.unix()}`;
    }
    else if (range === 'month') {
      startDate = today.startOf('day').subtract(1, 'months');
      rangeString = `&numericFilters=created_at_i>${startDate.unix()}`;
    }
    else if (range === 'year') {
      startDate = today.startOf('day').subtract(1, 'years');
      rangeString = `&numericFilters=created_at_i>${startDate.unix()}`;
    }
    //custom date range
    else if(start && end) {
      rangeString = `&numericFilters=created_at_i>${start.unix()},created_at_i<${end.unix()}`;
    }

    //api needs unix timestamps for querying
    return rangeString;
  }

  //throws error
  errorHandler(error: HttpErrorResponse) {
    console.log("error handler");
    console.log(error);
    return throwError(error.message || "Server Error");
  }
}
