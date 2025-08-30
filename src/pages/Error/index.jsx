import { Link } from "react-router-dom";
import LottieHandler from "../../components/feedback/lottieHandler/LottieHandler";

const Error = () => {
  return (
    <div className="flex  flex-col justify-center items-center gap-4 h-[100vh]">
      <LottieHandler type="notFound" />

      <Link to="/" replace={true}>
        Click here to going back to safety
      </Link>
    </div>
  );
};

export default Error;
