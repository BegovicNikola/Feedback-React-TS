import { createContext, useEffect, useState, PropsWithChildren } from "react";
import { IFeedback, ActiveEditType } from "../types/feedback";

import { FeedbackState } from "../types/feedback";

const FeedbackContext = createContext<FeedbackState>({
  feedback: [],
  activeEdit: { edit: false, feedback: null },
  isLoading: false,
  addFeedback: () => {},
  editFeedback: () => {},
  updateFeedback: () => {},
  deleteFeedback: () => {},
});

export const FeedbackProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<IFeedback[] | []>([]);

  const [activeEdit, setActiveEdit] = useState<ActiveEditType>({
    edit: false,
    feedback: null,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      setFeedback(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const addFeedback = async (newFeedback: IFeedback) => {
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    setFeedback([data, ...feedback]);
  };

  const deleteFeedback = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this feedback?"))
      await fetch(`/api/feedback/${id}`, {
        method: "DELETE",
      });

    setFeedback(feedback.filter((item) => item.id !== id));
  };

  const editFeedback = (feedback: IFeedback) => {
    setActiveEdit({ feedback, edit: true });
  };

  const updateFeedback = async (id: string, updatedFeedback: IFeedback) => {
    const response = await fetch(`/api/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFeedback),
    });

    const data = await response.json();

    setFeedback(feedback.map((item) => (item.id === id ? data : item)));
    setActiveEdit({ edit: false, feedback: null });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        activeEdit,
        isLoading,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
