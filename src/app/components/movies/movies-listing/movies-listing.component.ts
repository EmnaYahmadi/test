import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { GetMovies } from 'src/app/store/actions/movie.action';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Event as NavigationEvent } from "@angular/router";
import { filter } from "rxjs/operators";
@Component({
  selector: 'app-movies-listing',
  templateUrl: './movies-listing.component.html',
  styleUrls: ['./movies-listing.component.scss']
})

export class MoviesListingComponent implements OnInit {
  movieForm:FormGroup;
  searchForm:FormGroup;
  movieInfo:any= [];
  typeSearchSelected: string;
  moviesCount:number;
  error:string='';

  constructor(
    private store: Store,
    private toaster:ToastrService,
    private router:Router    
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getMoviesData();
    if(typeof document!="undefined"){
      (<HTMLDivElement>document.getElementById("footer")).classList.remove('footer-fixed');
    }   
  }

  initForm(){
    this.searchForm = new FormGroup({     
      title:new FormControl("",[Validators.required]),
      year:new FormControl(""),
      type:new FormControl(""),
      poster:new FormControl(""),
      imdbID:new FormControl(""),
    })
    this.populateForm()
  }

  populateForm(){
    if(window.localStorage.getItem('title')){
      this.searchForm = new FormGroup({
        title:new FormControl( window.localStorage.getItem('title')!,[Validators.required]),      
        year:new FormControl( window.localStorage.getItem('year')!),
        type:new FormControl(""),
        poster:new FormControl(""),
        imdbID:new FormControl(""),          
      })
    }
    else{
      this.searchForm = new FormGroup({
        title:new FormControl("christmas",[Validators.required]),      
        year:new FormControl(String(new Date().getFullYear())),
        type:new FormControl(""),
        poster:new FormControl(""),
        imdbID:new FormControl(""),          
      })
    }    
  }

  typeSelected(event) {
    this.typeSearchSelected = event.target.value;
  }

  getMoviesData(){
  
    if(typeof window!="undefined"){
      if(window.localStorage.getItem('title')){
        this.store.dispatch(new GetMovies(          
          window.localStorage.getItem('title')!,
          window.localStorage.getItem('year')!,
          window.localStorage.getItem('type')!,
          window.localStorage.getItem('poster')!,
          this.searchForm?this.searchForm.get("imdbID")!.value:''))      
      }
      else{      
        window.localStorage.setItem('title',this.searchForm.get("title")!.value);
        window.localStorage.setItem('year',this.searchForm.get("year")!.value);
        window.localStorage.setItem('type',this.searchForm.get("type")!.value);
        window.localStorage.setItem('poster',this.searchForm.get("poster")!.value)
        this.store.dispatch(new GetMovies(this.searchForm.get("title")!.value, this.searchForm.get("year")!.value, this.searchForm.get("type")!.value, this.searchForm.get("poster")!.value, this.searchForm.get("imdbID")!.value));      
      }
      this.store.subscribe(u => {
        if(u.moviesState.movies.Response=='True'){
          this.movieInfo = u.moviesState.movies.Search;        
          if(this.movieInfo){
            this.error='';
            this.moviesCount = u.moviesState.movies.Search.length;
            this.movieInfo.forEach(element => {
              //if(element.Year.indexOf('–')>-1){// not recognising the - 
              if(element.Year.length>4){
                element.Year = element.Year.substring(0,element.Year.length-1)
              }
              element.Year = element.Year.replace('-','')
              if(element.Poster=='N/A'){
                element.Poster='assets/images/notfound.jpeg';
              }
            });          
          }
        }
        else{
          this.movieInfo=null;
          this.moviesCount =0;
          this.error=u.moviesState.movies.Error;
        }
      });
    }
  }

  submitSearch(){ 
    if(this.searchForm.get("year")!.value){

    }
    if (this.searchForm.invalid) {
      this.toaster.error('Kindly, the title field is required');
    } 
    else if (this.validateYear(this.searchForm.get("year")!.value)==false){
      this.toaster.error('Kindly, the year selected is wrong');
    }  
    else{
      window.localStorage.setItem('title',this.searchForm.get("title")!.value);
        window.localStorage.setItem('year',this.searchForm.get("year")!.value);
        window.localStorage.setItem('type',this.searchForm.get("type")!.value);
        window.localStorage.setItem('poster',this.searchForm.get("poster")!.value)
      this.getMoviesData();
    }
  }
  validateYear(year){
    var yearRegex = new RegExp("^[12][0-9]{3}$");


    if (!yearRegex.test(year)) {
        return false;
    }
}

}
