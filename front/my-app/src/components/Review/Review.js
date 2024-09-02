import React, { useEffect, useRef } from "react"; // Import React, useEffect, and useRef
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../ReviewForm/ReviewForm";
import axios from "axios"; // Import axios

const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef(); // Use useRef without React prefix
  const { movieId } = useParams();

  useEffect(() => {
    getMovieData(movieId);
  }, [movieId, getMovieData]); // Added getMovieData as a dependency

  const addReview = async (e) => {
    e.preventDefault();
    const rev = revText.current.value;

    try {
      await axios.post("/api/v1/reviews", { reviewBody: rev, imdbId: movieId });
      setReviews([...reviews, { body: rev }]);
      revText.current.value = "";
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h3>Reviews</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>{movie && <img src={movie.poster} alt="" />}</Col>
        <Col>
          <Row>
            <Col>
              <ReviewForm
                handleSubmit={addReview}
                revText={revText}
                labelText="Write a Review?"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <hr />
            </Col>
          </Row>
          {reviews.map((r, index) => (
            <React.Fragment key={index}>
              <Row>
                <Col>{r.body}</Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </React.Fragment>
          ))}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
