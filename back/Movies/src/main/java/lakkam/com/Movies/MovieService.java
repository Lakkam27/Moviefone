package lakkam.com.Movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private  MovieRepository movieRepository;

    public List<Movie> allMovies(){
        return movieRepository.findAll();

    }
   public Optional<Movie> getOneMovie(String id) {
    return movieRepository.findMovieByImdbId(id);
}
}
