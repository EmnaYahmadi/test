import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { MoviesService } from "src/app/components/movies/movies.service";
import { tap } from 'rxjs/operators';
import { GetMovies, AddMovies, DeleteMovies, UpdateMovies } from "../actions/movie.action";

export class MovieStateModel {
    movies: any
}

@State<MovieStateModel>({
    name: 'moviesState',
    defaults: {
        movies: []
    }
})

@Injectable()
export class MoviesState {
    constructor(
        private moviesService: MoviesService
        ) { }

    @Selector()
    static selectStateData(state:MovieStateModel){
        return state.movies;
    }
    
    @Action(GetMovies)
    getDataFromState(ctx: StateContext<MovieStateModel>, {  title, year, type, poster, imdbID }: GetMovies) {
        return this.moviesService.getMovies( title, year, type, poster, imdbID).pipe(tap(returnData => {
            const state = ctx.getState();
            if(imdbID==''){
                if(state.movies.length>0){
                    if(state.movies.Search){
                        const movieList = [...state.movies];
                        movieList[0]=GetMovies;
                    }
                }                               
            }
                        
            ctx.setState({
                ...state,
                movies: returnData 
            })
        }))
    }

    @Action(AddMovies)
    addDataToState(ctx: StateContext<MovieStateModel>, { payload }: AddMovies) {
        return this.moviesService.addMovies(payload).pipe(tap(returnData => {
            const state=ctx.getState();
            ctx.patchState({
                movies:[...state.movies,returnData]
            })
        }))
    }

    @Action(UpdateMovies)
    updateDataOfState(ctx: StateContext<MovieStateModel>, { payload, id, i }: UpdateMovies) {
        return this.moviesService.updateMovie(payload, i).pipe(tap(returnData => {
            const state=ctx.getState();

            const movieList = [...state.movies];
            movieList[i]=payload;
            
            ctx.setState({
                ...state,
                movies: movieList,
            });
        }))
    }

    @Action(DeleteMovies)
    deleteDataFromState(ctx: StateContext<MovieStateModel>, { id }: DeleteMovies) {
        return this.moviesService.deleteMovie(id).pipe(tap(returnData => {
            const state=ctx.getState();
            const filteredArray=state.movies.filter(contents=>contents.id!==id);

            ctx.setState({
                ...state,
                movies:filteredArray
            })
        }))
    }

}