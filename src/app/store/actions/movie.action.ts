export class GetMovies {
    static readonly type:string = '[Movies] Fetch';
    constructor(             
        public title: string,
        public year: string,
        public type: string,
        public poster: string,  
        public imdbID: string  
    ) { }   
}

export class GetMovieDetails {
    static readonly type:string = '[Movies] Fetch';
    constructor(             
        public imdbID: string,       
    ) { }   
}

export class AddMovies {
    static readonly type:string = '[Movies] Add';
    constructor(public payload: any) { }
}

export class UpdateMovies {
    static readonly type:string = '[Movies] Update';
    constructor(public payload: any, public id: number, public i:number) { }
}

export class DeleteMovies {
    static readonly type:string = '[Movies] Delete';
    constructor(public id: number) { }
}