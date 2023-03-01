import HomePage from "Layout/HomePage/HomePage";
import QuizInstructions from "Layout/QuizInstructions/QuizInstructions";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function QuizInstructionsPage() {

  const token = useSelector((store) => store.auth.token);

  const router = useRouter();


  return (
    <div>
      {token ? <QuizInstructions /> : <HomePage />}
    </div>
  );
}
