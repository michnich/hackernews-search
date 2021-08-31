import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PageEvent } from '@angular/material/paginator';

import { NewsService } from './../news.service';
import { StateService } from './../state.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  search = "";
  type = "all";
  sort = "relevance"; 
  time = "all";

  totalResults!:number;
  results:any = [];

  constructor(private news: NewsService, private state: StateService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    this.news.search(this.search, this.type, this.sort, this.time).subscribe((data:any) => {
      this.results = data.hits;
      this.totalResults = data.nbHits;
      
      //save search to history
      this.state.addToHistory({"term": this.search, "type":this.type, "sort":this.sort, "range":this.time});
      //save the search state (including the results)
      this.state.lastSearch(data);
    })
  }

  nextPage(event: PageEvent) {
    this.news.nextSearchPage(this.search, this.type, this.sort, this.time, event.pageIndex).subscribe((data:any) => {
      this.results = data.hits;
    })
  }

}
