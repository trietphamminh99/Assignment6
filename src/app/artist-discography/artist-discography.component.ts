import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit, OnDestroy {

    // albums: any = musicService.items.filter((curValue:any, index:any, self:any) => 
    //                 self.findIndex((t:any) => 
    //                   t.name.toUpperCase() === curValue.name.toUpperCase()) === index);
    // artist: any = musicService;    

  artist: any;
  albums: any;
  artistSub: Subscription | undefined;
  albumsSub: Subscription | undefined;
  routeSub: Subscription | undefined;
    
  constructor(private musicService: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(data => {
      this.artistSub = this.musicService.getArtistById(data.id).subscribe(artist => {
        this.artist = artist;
      });

      this.albumsSub = this.musicService.getAlbumsByArtistId(data.id).subscribe(data => {
        this.albums = data.items.filter((album:any, index:any, arr:any) => {
          return index === arr.map((data:any) => data.name).indexOf(album.name);
        });
      });
    });
  }

  ngOnDestroy():void{
    this.artistSub?.unsubscribe();
    this.albumsSub?.unsubscribe();
    this.routeSub?.unsubscribe();
  }

}
