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
  selCountry: any;
  selCategory: any;
  countries = [
    { "text": "Argentina", "value": "AR" },
    { "text": "Australia", "value": "AU" },
    { "text": "Austria", "value": "AT" },
    { "text": "Belgium", "value": "BE" },
    { "text": "Brazil", "value": "BR" },
    { "text": "Bulgaria", "value": "BG" },
    { "text": "Canada", "value": "CA" },
    { "text": "China", "value": "CN" },
    { "text": "Colombia", "value": "CO" },
    { "text": "Cuba", "value": "CU" },
    { "text": "Czech Republic", "value": "CZ" },
    { "text": "Egypt", "value": "EG" },
    { "text": "France", "value": "FR" },
    { "text": "Germany", "value": "DE" },
    { "text": "Greece", "value": "GR" },
    { "text": "Hong Kong", "value": "HK" },
    { "text": "Hungary", "value": "HU" },
    { "text": "India", "value": "IN" },
    { "text": "Indonesia", "value": "ID" },
    { "text": "Ireland", "value": "IE" },
    { "text": "Israel", "value": "IL" },
    { "text": "Italy", "value": "IT" },
    { "text": "Japan", "value": "JP" },
    { "text": "Korea, Republic of", "value": "KR" },
    { "text": "Latvia", "value": "LV" },
    { "text": "Lithuania", "value": "LT" },
    { "text": "Malaysia", "value": "MY" },
    { "text": "Mexico", "value": "MX" },
    { "text": "Morocco", "value": "MA" },
    { "text": "Netherlands", "value": "NL" },
    { "text": "New Zealand", "value": "NZ" },
    { "text": "Nigeria", "value": "NG" },
    { "text": "Norway", "value": "NO" },
    { "text": "Philippines", "value": "PH" },
    { "text": "Poland", "value": "PL" },
    { "text": "Portugal", "value": "PT" },
    { "text": "Romania", "value": "RO" },
    { "text": "Russian Federation", "value": "RU" },
    { "text": "Saudi Arabia", "value": "SA" },
    { "text": "Singapore", "value": "SG" },
    { "text": "Slovakia", "value": "SK" },
    { "text": "Slovenia", "value": "SI" },
    { "text": "South Africa", "value": "ZA" },
    { "text": "Sweden", "value": "SE" },
    { "text": "Switzerland", "value": "CH" },
    { "text": "Taiwan, Province of China", "value": "TW" },
    { "text": "Thailand", "value": "TH" },
    { "text": "Turkey", "value": "TR" },
    { "text": "Ukraine", "value": "UA" },
    { "text": "United Arab Emirates", "value": "AE" },
    { "text": "United Kingdom", "value": "GB" },
    { "text": "United States", "value": "US" },
    { "text": "Venezuela", "value": "VE" },
];

categoryList = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology'
];

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
        this.page = 1;
        this.getNewsItems();
      }
    })
  }

  getNewsItems() {
    this.isLoading = true;
    this.newsService.getNews(this.page, this.pageSize, this.selCountry, this.selCategory).subscribe((res: any) => {
      console.log(res);
      this.newsList = res.articles;
      this.collectionSize = res.totalResults;
      this.isLoading = false;
    })
  }

  onPaginationChange(event: any) {
    this.router.navigate(['/news'], {queryParams: {'page': event}});
  }

  search() {
    this.router.navigate(['/']);
  }

  transformDesc(desc: string) {
    if(desc.split(' ').length > 20) {
      return desc.replace(/^(.{100}[^\s]*).*/, "$1") + '...';
    } else {
      return desc;
    }
  }

}
