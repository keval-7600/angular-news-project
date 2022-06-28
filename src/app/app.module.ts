import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '/news', pathMatch: 'full'},
  {path: 'news', component: NewsListComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
