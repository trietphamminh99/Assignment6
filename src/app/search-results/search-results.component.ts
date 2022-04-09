import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {

  results: any;
  searchQuery: any; 
  routeSub: Subscription | undefined;
  searchQuerySub: Subscription | undefined;

  constructor(private route: ActivatedRoute, private musicData: MusicDataService) { }

  ngOnInit(): void {
    this.routeSub = this.route.queryParams.subscribe(data => {
      this.searchQuery = data.q;
      this.searchQuerySub = this.musicData.searchArtists(this.searchQuery).subscribe(data => 
        this.results = data.artists.items.filter((data:any) => data.images.length > 0));
    });
  }

  ngOnDestroy(): void{
    this.routeSub?.unsubscribe();
    this.searchQuerySub?.unsubscribe();
  }

}
