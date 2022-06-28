import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})
export class NewsListComponent implements OnInit {

  newsList: any;
  page = 1;
  pageSize = 12;
  collectionSize: any;
  isLoading: boolean = false;

  constructor(
    private newsService: NewsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params: any) => {
      if(params.get('page')){
        this.page = parseInt(params.get('page'));
        this.getNewsItems();
      } else {
        console.log('hello');
        this.getNewsItems();
      }
    })
  }

  getNewsItems() {
    this.isLoading = true;
    this.newsService.getNews(this.page, this.pageSize).subscribe((res: any) => {
      console.log(res);
      this.newsList = res.articles;
      this.collectionSize = res.totalResults;
      this.isLoading = false;
    })
  }

  onPaginationChange(event: any) {
    this.router.navigate(['/news'], {queryParams: {'page': event}});
  }

  transformDesc(desc: string) {
    if(desc.split(' ').length > 20) {
      return desc.replace(/^(.{100}[^\s]*).*/, "$1") + '...';
    } else {
      return desc;
    }
  }

}
