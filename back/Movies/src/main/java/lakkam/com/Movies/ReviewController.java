package lakkam.com.Movies;

import org.springframework.web.bind.annotation.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {
    @Autowired
    private ReviewService service;

    @PostMapping
    public ResponseEntity<Review> createReview(@RequestBody ReviewRequest reviewRequest) {
        return new ResponseEntity<>(service.createReview(reviewRequest.getReviewBody(), reviewRequest.getImdbId()), HttpStatus.CREATED);
    }
}
