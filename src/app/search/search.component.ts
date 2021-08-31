import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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

  results:any = [];

  constructor(private service: NewsService) { }

  ngOnInit(): void {
  }

  submit(form: NgForm) {
    this.service.search(this.search, this.type).subscribe((data:any) => {
      this.results = data.hits;
    })
  }

}
