import { BreakpointObserver } from '@angular/cdk/layout';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NewsService } from '../services/news.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css'],
})
export class MainContentComponent implements AfterViewInit, OnChanges, OnInit {
  @ViewChild('sideNav') public sideNav!: MatSidenav;

  @Input()
  toggleNavbar!: boolean;

  newsSources: any = [];
  currentArticles: any = [];
  selectedNewsChannel: string = 'Top 10 Trending News!';

  constructor(
    private observer: BreakpointObserver,
    private cdr: ChangeDetectorRef,
    private newsService: NewsService
  ) {}

  ngOnInit(): void {
    this.getNewsSources();
    this.getTopTenArticles();
  }

  ngOnChanges(): void {
    if (this.toggleNavbar) {
      this.sideNav.open();
    } else {
      this.sideNav?.close();
    }
  }

  ngAfterViewInit(): void {
    this.sideNav.opened = this.toggleNavbar;
    this.observer.observe(['(max-width:787px)']).subscribe((res) => {
      if (res?.matches) {
        this.sideNav.mode = 'over';
        this.sideNav.close();
      } else {
        this.sideNav.mode = 'side';
        this.sideNav.open();
      }
    });
    this.cdr.detectChanges();
  }

  getNewsSources() {
    this.newsService.initSources().subscribe((res: any) => {
      this.newsSources = res.sources;
    });
  }

  getTopTenArticles() {
    this.newsService.initArticles().subscribe((res: any) => {
      this.currentArticles = res.articles;
    });
  }

  selectChannel(source:any) {
    this.selectedNewsChannel = source.name;
    this.showSelectedChannelNews(source.id);
  }

  showSelectedChannelNews(id: string) {
    this.newsService.getArticlesByID(id).subscribe((res: any) => {
      this.currentArticles = res.articles;
    });
  }
}
