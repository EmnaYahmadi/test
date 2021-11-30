import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetMovies } from 'src/app/store/actions/movie.action';
import { MoviesListingComponent } from '../movies-listing/movies-listing.component';
import { Subscription } from 'rxjs';

@Component({  
  selector: 'app-movies-single',
  templateUrl: './movies-single.component.html',
  styleUrls: ['./movies-single.component.scss'],
})

export class MoviesSingleComponent implements OnInit {
  movie:any;
  movieId:string;
  movieYear:string;
  subscriptions: Subscription[] = [];
  
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store, 
    private moviesListingComponent:MoviesListingComponent,
    private router: Router
  ) { 

    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        if (event.navigationTrigger === 'popstate') {     
          window.location.reload();     
          setTimeout(() => {
            this.moviesListingComponent.getMoviesData();
            
          }, 300);
          
        }
      }
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
    this.activatedRoute.params.subscribe((param) => {
      if (param['id']) {
        this.movieId = param['id'];
        this.getMovieDetails()
      }       
    }) 
    ) 

    if(typeof document!="undefined"){
      (<HTMLDivElement>document.getElementById("footer")).classList.add('footer-fixed');
    }  
    
  }
 
  getMovieDetails(){

    let title:string = ''; 
    let year:string = '';
    let type:string = '';
    let poster:string ='';  
    let imdbID:string = this.movieId;

    this.store.dispatch(new GetMovies(title, year, type, poster, imdbID));  
   
    this.store.subscribe(u => {
      this.movie = u.moviesState.movies;
      if(this.movie.Year){
        this.movieYear = this.movie.Year.substring(0,this.movie.Year.length-1)
      } 
      
      this.unsubribe()

    });
  }

  unsubribe() {
    if(this.subscriptions.length > 0){
        this.subscriptions.forEach( (sub) => {
             sub.unsubscribe();
        })
        this.subscriptions = [];
    }
}

}
