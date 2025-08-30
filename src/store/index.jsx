import { AuthProvider } from "./Auth/AuthProvider";
import CartProvider from "./cart/CartProvider";

export default function AppProviders({ children }) {
  return (
    <AuthProvider>
      <CartProvider>{children}</CartProvider>
    </AuthProvider>
  );
}
