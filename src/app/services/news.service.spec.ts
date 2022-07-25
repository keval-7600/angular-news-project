/* tslint:disable:no-unused-variable */
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { NewsService } from './news.service';

describe('Service: News', () => {
  let service: NewsService;
  let httpTestingController: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService]
    });
    service = TestBed.inject(NewsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should ...', inject([NewsService], (service: NewsService) => {
    expect(service).toBeTruthy();
  }));

  it('should perform the get request', () => {
    const data = [
      { userId: 1, userName: 'Keval'},
      { userId: 2, userName: 'Jay'}
    ]
    service.getNews(1, 10, 'in', 'entertainment').subscribe((res: any) => {
      expect(res).toEqual(data);
    })
    const request = httpTestingController.expectOne('https://newsapi.org/v2/top-headlines?apiKey=048529ef63554a898219cdd540c12996&country=in&category=entertainment&page=1&pageSize=10');
    expect(request.request.method).toBe('GET');
    request.flush(data);
  })
});
