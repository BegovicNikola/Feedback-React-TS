export interface IFeedback {
  id?: string;
  rating: number;
  description: string;
}

export type FeedbackState = {
  feedback: IFeedback[];
  activeEdit: ActiveEditType;
  isLoading: boolean;
  addFeedback: (feedback: IFeedback) => void;
  editFeedback: (feedback: IFeedback) => void;
  updateFeedback: (id: string, updatedFeedback: IFeedback) => void;
  deleteFeedback: (id: string) => void;
};

export type ActiveEditType = {
  edit: boolean;
  feedback: IFeedback | null;
};
