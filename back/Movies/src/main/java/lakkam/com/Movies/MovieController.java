package lakkam.com.Movies;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
//...

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/movies")
@CrossOrigin(origins = "http://localhost:3000")
public class MovieController {

    private static final Logger logger = LoggerFactory.getLogger(MovieController.class);

    private final MovieService movieService;

    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        logger.info("Fetching all movies");
        List<Movie> movies = movieService.allMovies();
        return new ResponseEntity<>(movies, HttpStatus.OK);
    }

    @GetMapping("/{imdbID}")
    public ResponseEntity<Movie> getMovieByImdbID(@PathVariable String imdbID) {
        logger.info("Fetching movie with IMDb ID: {}", imdbID);
        Optional<Movie> movie = movieService.getOneMovie(imdbID);

        return movie.map(value -> {
                    logger.info("Movie found: {}", value);
                    return new ResponseEntity<>(value, HttpStatus.OK);
                })
                .orElseGet(() -> {
                    logger.warn("Movie with IMDb ID: {} not found", imdbID);
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                });
    }
}
