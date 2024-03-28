import { useContext } from "react";
import FeedbackContext from "../context/FeedbackContext";

import Card from "./shared/Card";
import { FaTimes, FaEdit } from "react-icons/fa";

import { IFeedback } from "../types/feedback";

const FeedbackItem = ({
  item,
  item: { id, rating, description },
}: {
  item: IFeedback;
}) => {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);

  return (
    <Card theme={"light"}>
      <div className="num-display">{rating}</div>
      <button className="close" onClick={() => id && deleteFeedback(id)}>
        <FaTimes color="purple" />
      </button>
      <button className="edit" onClick={() => editFeedback(item)}>
        <FaEdit color="purple" />
      </button>
      <div className="text-display">{description}</div>
    </Card>
  );
};

export default FeedbackItem;
