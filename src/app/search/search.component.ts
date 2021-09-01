import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PageEvent } from '@angular/material/paginator';

import { NewsService } from './../news.service';
import { StateService } from './../state.service';
import { Query } from '../query';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  //all fields in form
  query:Query = {term: "", type: "all", sort: "relevance", range: "all"}

  //for pagination
  totalResults!:number;
  pageIndex = 0;

  //returned hits from the api
  results:any = [];
  //subscription to retrieve state info
  searchSubscription!:Subscription;
  //error message
  errorMsg:string = "";
  
  constructor(private news: NewsService, private state: StateService) { }

  ngOnInit(): void {
    this.searchSubscription = this.state.search$.subscribe(search => {
      //check that there was a previous search
      if (search.term) {
        this.query = search;
        this.results = search.hits;
        this.totalResults = search.nbHits;
        this.pageIndex = search.page;
      }
    })
  }

  submit(form: NgForm) {
    this.news.search(form.value).subscribe(
      //success
      (data:any) => {
        this.results = data.hits;
        this.totalResults = data.nbHits;
        this.errorMsg = "";
        //save search to history
        this.state.addToHistory(form.value);
      },
      //error
      (error:any) =>{
        //set error message for display and clear out any previous results
        this.errorMsg = error;
        this.results = [];
        this.pageIndex = 0;
        console.log(error);
      }
    )
  }

  //triggered when the user navigates to a new pagination page
  nextPage(event: PageEvent) {
    //query the api for the next page of results
    this.news.nextSearchPage(this.query, event.pageIndex).subscribe(
      //success
      (data:any) => {
        this.results = data.hits;
        this.errorMsg = "";
        //update page index
        this.pageIndex = event.pageIndex;
        
      },
      //error
      (error:any) =>{
        //set error message for display and clear out any previous results
        this.errorMsg = error;
        this.results = [];
        this.pageIndex = 0;
        console.log(error);
      }
    )
  }

  ngOnDestroy() {
    //save the search state and unsubscribe
    this.state.lastSearch({...this.query, "hits": this.results, "page": this.pageIndex, "nbHits": this.totalResults });
    this.searchSubscription.unsubscribe();
  }

}
