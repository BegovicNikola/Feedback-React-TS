import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

import FeedbackItem from "./FeedbackItem";

const FeedbackList = () => {
  const { feedback } = useContext(FeedbackContext);

  if (feedback.length === 0) return <div>No feedback yet</div>;

  return (
    <div>
      {feedback.map((item) => {
        return <FeedbackItem key={item.id} item={item} />;
      })}
    </div>
  );
};

export default FeedbackList;
