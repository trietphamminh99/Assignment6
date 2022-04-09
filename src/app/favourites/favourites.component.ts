import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit, OnDestroy {

  favourites!: Array<any>;
  favouritesSub: Subscription | undefined;
  removeFavouriteSub: Subscription | undefined;

  constructor(private musicData: MusicDataService, private matSnack: MatSnackBar) { }

  removeFromFavourites(id:any): void{
    this.removeFavouriteSub = this.musicData.removeFromFavourites(id).subscribe(data => {
      this.favourites = data.tracks;
    });
    this.matSnack.open('Removing from Favourites...', 'Done', {duration: 1500});
  }

  ngOnInit(): void {
    this.favouritesSub = this.musicData.getFavourites().subscribe(data => {
      this.favourites = data.tracks;
    });
  }

  ngOnDestroy(): void{
    this.favouritesSub?.unsubscribe();
    this.removeFavouriteSub?.unsubscribe();
  }

}
