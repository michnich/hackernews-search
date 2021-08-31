import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PageEvent } from '@angular/material/paginator';

import { NewsService } from './../news.service';

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

  constructor(private service: NewsService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    this.service.search(this.search, this.type, this.sort, this.time).subscribe((data:any) => {
      this.results = data.hits;
      this.totalResults = data.nbHits;
    })
  }

  nextPage(event: PageEvent) {
    this.service.nextSearchPage(this.search, this.type, this.sort, this.time, event.pageIndex).subscribe((data:any) => {
      this.results = data.hits;
    })
  }

}
