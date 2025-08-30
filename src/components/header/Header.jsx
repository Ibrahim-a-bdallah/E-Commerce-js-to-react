import { useContext, useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import AuthContext from "@/store/Auth/AuthContext.js";
import CartContext from "@/store/cart/CartContext";

const Header = () => {
  const { data, setData } = useContext(AuthContext);
  const { cart, clearCart } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef(null);

  // حساب عدد المنتجات في العربة
  useEffect(() => {
    const count = cart.reduce((total, product) => total + product.quantity, 0);
    setCartItemsCount(count);
  }, [cart]);

  useEffect(() => {
    const existData = localStorage.getItem("data");
    if (existData) {
      setData(JSON.parse(existData));
    }
  }, [setData]);

  // تأثير إخفاء وإظهار الهيدر عند التمرير
  useEffect(() => {
    const controlHeader = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        // إذا كان المستخدم يمرر لأسفل وكان الهيدر ظاهرًا
        if (
          currentScrollY > lastScrollY &&
          currentScrollY > 100 &&
          isHeaderVisible
        ) {
          setIsHeaderVisible(false);
        }

        // إذا كان المستخدم يمرر لأعلى وكان الهيدر مخفيًا
        if (currentScrollY < lastScrollY && !isHeaderVisible) {
          setIsHeaderVisible(true);
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", controlHeader);

    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY, isHeaderVisible]);

  return (
    <header
      ref={headerRef}
      className={`bg-blue-600 h-[70px] flex items-center shadow-md fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4 relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="inline-block">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-[50px] md:w-[70px] h-[50px] object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {data?.status === "loggedin" ? (
              <>
                <span className="text-white font-bold text-lg">
                  Welcome, {data.username}
                </span>

                {/* Cart Icon with Badge */}
                <Link
                  to="/cart"
                  className="relative hover:text-gray-200 transition-colors text-white"
                >
                  <ShoppingCart size={24} />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemsCount > 9 ? "9+" : cartItemsCount}
                    </span>
                  )}
                </Link>

                <Link
                  to="/"
                  className="text-white hover:text-gray-200 transition-colors"
                  onClick={() => {
                    const updated = { ...data, status: "loggedout" };
                    setData(updated);
                    localStorage.setItem("data", JSON.stringify(updated));
                  }}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Cart Icon for Mobile (visible without opening menu) */}
          {data?.status === "loggedin" && (
            <Link to="/cart" className="md:hidden relative mr-4 text-white">
              <ShoppingCart size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount > 9 ? "9+" : cartItemsCount}
                </span>
              )}
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-blue-600 shadow-lg py-4 px-4">
            {data?.status === "loggedin" ? (
              <div className="flex flex-col space-y-4">
                <span className="text-white font-bold text-center">
                  Welcome, {data.username}
                </span>
                <Link
                  to="/"
                  className="text-white hover:text-gray-200 transition-colors text-center"
                  onClick={() => {
                    clearCart();
                    const updated = { ...data, status: "loggedout" };
                    setData(updated);
                    localStorage.setItem("data", JSON.stringify(updated));
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-4">
                <Link
                  to="/login"
                  className="text-white hover:text-gray-200 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-white hover:text-gray-200 transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
