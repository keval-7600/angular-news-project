import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  url = `https://newsapi.org/v2/top-headlines?apiKey=${environment.apiKey}`;
  
  constructor(
    private http: HttpClient
  ) { }

  getNews(page: any, pageSize: any, country='in', category = '') {
    return this.http.get(this.url + `&country=${country ? country?.toLowerCase() : ''}&category=${category ? category?.toLowerCase() : ''}&page=${page}&pageSize=${pageSize}`).pipe(map(res=>{
      return res;
    }))
  }
}
