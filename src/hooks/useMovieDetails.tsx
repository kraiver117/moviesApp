import { useEffect, useState } from "react"
import movieDB from "../api/movieDB";
import { Cast, CreditsResponse } from "../interfaces/creditsInterface";
import { FullMovie } from '../interfaces/movieInterface';

interface MovieDetails {
    isLoading: boolean;
    fullMovie?: FullMovie;
    cast: Cast[];
}

export const useMovieDetails = ( movieId: number) => {

    const [state, setState] = useState<MovieDetails>({
        isLoading: true,
        fullMovie: undefined,
        cast: []
    });

    const getMovieDetails = async() => {
        const movieDetailsPromise = movieDB.get<FullMovie>(`/${ movieId }`);
        const castPromise = movieDB.get<CreditsResponse>(`/${ movieId }/credits`);
        
        const [ movieDetailsResponse, castPromiseResponse ] = await Promise.all([movieDetailsPromise, castPromise]);

        setState({
            isLoading: false,
            fullMovie: movieDetailsResponse.data,
            cast: castPromiseResponse.data.cast
        })
    }

    useEffect(() => {
        getMovieDetails();
    }, []);

    return {
        ...state
    }
}
