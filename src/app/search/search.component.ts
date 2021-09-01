import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PageEvent } from '@angular/material/paginator';

import { NewsService } from './../news.service';
import { StateService } from './../state.service';
import { Query } from '../query';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  query:Query = {term: "", type: "all", sort: "relevance", range: "all"}

  totalResults!:number;
  results:any = [];

  constructor(private news: NewsService, private state: StateService) { }

  ngOnInit(): void {

  }

  submit(form: NgForm) {
    this.news.search(form.value).subscribe((data:any) => {
      this.results = data.hits;
      this.totalResults = data.nbHits;
      
      //save search to history
      this.state.addToHistory(form.value);
      //save the search state (including the results)
      this.state.lastSearch(data);
    })
  }

  nextPage(event: PageEvent) {
    this.news.nextSearchPage(this.query, event.pageIndex).subscribe((data:any) => {
      this.results = data.hits;
    })
  }

}
