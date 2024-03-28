import { useState, useEffect, useContext, FormEvent } from "react";
import FeedbackContext from "../context/FeedbackContext";

import Card from "./shared/Card";
import Rating from "./Rating";
import Button from "./shared/Button";

const FeedbackForm = () => {
  const [description, setDescription] = useState<string>("");
  const [btnDisabled, setBtnDisabled] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [rating, setRating] = useState<number>(5);

  const { activeEdit, addFeedback, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (activeEdit.edit === true && activeEdit.feedback !== null) {
      setBtnDisabled(false);
      setDescription(activeEdit.feedback.description);
      setRating(activeEdit.feedback.rating);
    }
  }, [activeEdit]);

  const handleRatingChange = (rating: number): void => {
    setRating(rating);
  };

  const handleDescriptionChange = ({
    target: { value },
  }: {
    target: { value: string };
  }): void => {
    setDescription(value);

    if (value === "") {
      setBtnDisabled(true);
      setMessage("");
    } else if (value.trim().length < 10) {
      setBtnDisabled(true);
      setMessage("Text must be at least 10 characters");
    } else {
      setBtnDisabled(false);
      setMessage("");
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (description.trim().length < 10) {
      setMessage("Text must be at least 10 characters");
      return;
    }

    const newFeedback = {
      rating,
      description,
    };

    if (
      activeEdit.edit === true &&
      activeEdit.feedback !== null &&
      activeEdit.feedback.id !== undefined
    ) {
      updateFeedback(activeEdit.feedback.id, newFeedback);
    } else {
      addFeedback(newFeedback);
    }
    setDescription("");
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h3>How would you rate our services?</h3>
        <Rating select={handleRatingChange} />
        <div className="input-group">
          <input
            type="text"
            placeholder="Add your review..."
            value={description}
            onChange={handleDescriptionChange}
          />
          <Button type="submit" version="secondary" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <p>{message}</p>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
