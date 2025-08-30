import { Suspense } from "react"
import LottieHandler from "./LottieHandler"


const LoadingSpinner = ({children,type,}) => {
  return (
      <>
          <Suspense fallback={
          <LottieHandler type={type} message="Please wait ..."/>
          }>
              {children}
      </Suspense>
      </>
  )
}

export default LoadingSpinner