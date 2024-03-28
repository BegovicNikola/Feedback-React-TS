import FeedbackList from "../components/FeedbackList";
import FeedbackStats from "../components/FeedbackStats";
import FeedbackForm from "../components/FeedbackForm";

const Home = () => {
  return (
    <div className="container">
      <FeedbackForm />
      <FeedbackStats />
      <FeedbackList />
    </div>
  );
};

export default Home;
