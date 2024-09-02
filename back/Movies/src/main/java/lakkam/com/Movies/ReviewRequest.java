package lakkam.com.Movies;

import lombok.Data;

@Data
public class ReviewRequest {
    private String reviewBody;
    private String imdbId;
}
