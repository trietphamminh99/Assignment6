import { Component, OnDestroy, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit, OnDestroy {

  album: any;
  albumSub: Subscription | undefined;
  routeSub: Subscription | undefined;

  constructor(private musicData: MusicDataService, private matSnackBar: MatSnackBar, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(data => {
      this.albumSub = this.musicData.getAlbumById(data.id).subscribe(data => {
        this.album = data;
      });
    });
  }

  addToFavourites(trackID:any){
    this.musicData.addToFavourites(trackID).subscribe((data) => {
      console.log(data);
      this.matSnackBar.open("Adding to Favourites...", "Done", {duration:1500});
    }, (err) => {
      console.log(err);
      this.matSnackBar.open("Unable to add song to Favourites", "", {duration:1500});
    });
  }

  ngOnDestroy(): void {
    this.albumSub?.unsubscribe();
    this.routeSub?.unsubscribe();
  }

}
