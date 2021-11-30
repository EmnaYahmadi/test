import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from 'src/app/constants';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

    constructor(
        private http:HttpClient
    ) { }

    getMovies( title:string, year?:string, type?:string, poster?:string, imdbID?:string){
        if(poster!=''){ 
            return this.http.get<any>(Constants.SERVER_POSTER_URL+'&s='+title + '&y=' + year + '&type=' + type ); 
        }
        else{
            if(imdbID!=''){
                return this.http.get<any>(Constants.SERVER_URL+'&i='+imdbID); 
            }
            else{
                if(type!=''){
                    return this.http.get<any>(Constants.SERVER_URL+'&s='+title + '&y=' + year + '&type=' + type ); 
                }                                
                else{
                    return this.http.get<any>(Constants.SERVER_URL+'&s='+title + '&y=' + year ); 
                }   
            }
               
        }                        
    }

    addMovies(movieData){
        return this.http.post('',movieData);
    }

    deleteMovie(id:number){
        return this.http.delete(''+id);
    }

    updateMovie(payload,id:number){
        return this.http.put(''+id, payload);
    }

}