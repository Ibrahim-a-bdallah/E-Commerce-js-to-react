import React from "react";
import LottieHandler from "../lottieHandler/LottieHandler";

const Loading = ({ loading, children }) => {
  if (loading === "pending") {
    return <LottieHandler type="loading" message="Please wait..." />;
  }
  if (loading === "failed") {
    return <LottieHandler type="error" />;
  }
  return <>{children}</>;
};

export default Loading;
