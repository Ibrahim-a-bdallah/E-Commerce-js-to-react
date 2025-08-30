import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useContext, useMemo } from "react";
import CartContext from "@/store/cart/CartContext";
import "swiper/css";
import "swiper/css/navigation";

const Cart = () => {
  const {
    cart,
    favorites,
    updateQuantity,
    removeFromCart,
    toggleFavorite,
    isFavorite,
  } = useContext(CartContext);

  // حساب المجموع الكلي
  const total = useMemo(() => {
    return cart.reduce((sum, product) => {
      const price = product.salePrice || product.price;
      return sum + price * product.quantity;
    }, 0);
  }, [cart]);

  const handleQuantityChange = (productId, color, newQuantity) => {
    updateQuantity(productId, color, newQuantity);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cart Section */}
      <section className="py-4 md:py-8">
        <div className="container mx-auto px-3 md:px-4">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-8">
            Shopping Cart
          </h2>

          {cart.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg shadow">
              <p className="text-gray-600 text-base md:text-lg">
                Your cart is empty
              </p>
            </div>
          ) : (
            <>
              {/* Cart Items - Mobile View */}
              <div className="md:hidden space-y-4">
                {cart.map((product) => {
                  const price = product.salePrice || product.price;
                  const subtotal = price * product.quantity;

                  return (
                    <div
                      key={`${product.id}-${product.color}`}
                      className="bg-white rounded-lg shadow p-4"
                    >
                      <div className="flex items-start">
                        <img
                          className="w-16 h-16 object-contain mr-3"
                          src={product.imageURL}
                          alt={product.title}
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{product.title}</p>
                          <p className="text-gray-600 text-xs">
                            Category: {product.category}
                          </p>
                          <p className="text-gray-600 text-xs">
                            Color: {product.color}
                          </p>

                          <div className="mt-2">
                            {product.salePrice &&
                            product.salePrice !== product.price ? (
                              <div>
                                <del className="text-gray-400 text-xs">
                                  {product.price} EGP
                                </del>
                                <span className="text-blue-600 font-medium text-sm ml-1">
                                  {product.salePrice} EGP
                                </span>
                              </div>
                            ) : (
                              <span className="text-blue-600 font-medium text-sm">
                                {product.price} EGP
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center">
                              <button
                                className="w-6 h-6 bg-gray-200 rounded-l-md flex items-center justify-center text-xs"
                                onClick={() =>
                                  handleQuantityChange(
                                    product.id,
                                    product.color,
                                    product.quantity - 1
                                  )
                                }
                              >
                                -
                              </button>
                              <span className="w-8 h-6 flex items-center justify-center border-y border-gray-200 text-xs">
                                {product.quantity}
                              </span>
                              <button
                                className="w-6 h-6 bg-gray-200 rounded-r-md flex items-center justify-center text-xs"
                                onClick={() =>
                                  handleQuantityChange(
                                    product.id,
                                    product.color,
                                    product.quantity + 1
                                  )
                                }
                              >
                                +
                              </button>
                            </div>

                            <div className="text-right">
                              <p className="font-medium text-sm">
                                {subtotal.toFixed(2)} EGP
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-between mt-3">
                            <button
                              className="text-red-500 hover:text-red-700 text-xs"
                              onClick={() =>
                                removeFromCart(product.id, product.color)
                              }
                            >
                              Remove
                            </button>
                            <button
                              className={`text-xs ${
                                isFavorite(product.id)
                                  ? "text-red-500"
                                  : "text-gray-500"
                              } hover:text-red-700`}
                              onClick={() => toggleFavorite(product)}
                            >
                              {isFavorite(product.id) ? "♥ Remove" : "♡ Add"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cart Items - Desktop View */}
              <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left">Product</th>
                      <th className="py-3 px-4 text-center">Price</th>
                      <th className="py-3 px-4 text-center">Quantity</th>
                      <th className="py-3 px-4 text-center">Subtotal</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((product) => {
                      const price = product.salePrice || product.price;
                      const subtotal = price * product.quantity;

                      return (
                        <tr
                          key={`${product.id}-${product.color}`}
                          className="border-t"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <img
                                className="w-16 h-16 object-contain mr-4"
                                src={product.imageURL}
                                alt={product.title}
                              />
                              <div>
                                <p className="font-medium">{product.title}</p>
                                <p className="text-gray-600 text-sm">
                                  Category: {product.category}
                                </p>
                                <p className="text-gray-600 text-sm">
                                  Color: {product.color}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center">
                            {product.salePrice &&
                            product.salePrice !== product.price ? (
                              <div>
                                <del className="text-gray-400 block">
                                  {product.price} EGP
                                </del>
                                <span className="text-blue-600 font-medium">
                                  {product.salePrice} EGP
                                </span>
                              </div>
                            ) : (
                              <span className="text-blue-600 font-medium">
                                {product.price} EGP
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex items-center justify-center">
                              <button
                                className="w-8 h-8 bg-gray-200 rounded-l-md flex items-center justify-center"
                                onClick={() =>
                                  handleQuantityChange(
                                    product.id,
                                    product.color,
                                    product.quantity - 1
                                  )
                                }
                              >
                                -
                              </button>
                              <span className="w-10 h-8 flex items-center justify-center border-y border-gray-200">
                                {product.quantity}
                              </span>
                              <button
                                className="w-8 h-8 bg-gray-200 rounded-r-md flex items-center justify-center"
                                onClick={() =>
                                  handleQuantityChange(
                                    product.id,
                                    product.color,
                                    product.quantity + 1
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center font-medium">
                            {subtotal.toFixed(2)} EGP
                          </td>
                          <td className="py-4 px-4 text-center">
                            <div className="flex flex-col items-center space-y-2">
                              <button
                                className="text-red-500 hover:text-red-700 text-sm"
                                onClick={() =>
                                  removeFromCart(product.id, product.color)
                                }
                              >
                                Remove
                              </button>
                              <button
                                className={`text-sm ${
                                  isFavorite(product.id)
                                    ? "text-red-500"
                                    : "text-gray-500"
                                } hover:text-red-700`}
                                onClick={() => toggleFavorite(product)}
                              >
                                {isFavorite(product.id)
                                  ? "Remove from Favorites"
                                  : "Add to Favorites"}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Cart Summary */}
              <div className="mt-6 md:mt-8 flex flex-col md:flex-row justify-between gap-4 md:gap-6">
                <div className="bg-white rounded-lg shadow p-4 md:p-6 md:w-2/3">
                  <h3 className="text-lg font-bold mb-3 md:mb-4">
                    Cart Totals
                  </h3>
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600 text-sm md:text-base">
                        Subtotal
                      </span>
                      <span className="font-medium text-sm md:text-base">
                        {total.toFixed(2)} EGP
                      </span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-gray-600 text-sm md:text-base">
                        Shipping
                      </span>
                      <span className="font-medium text-sm md:text-base">
                        Free
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-base md:text-lg">Total</span>
                      <span className="text-blue-600 text-base md:text-lg">
                        {total.toFixed(2)} EGP
                      </span>
                    </div>
                  </div>

                  <button className="w-full mt-4 md:mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 md:py-3 px-4 md:px-8 rounded-lg transition-colors text-sm md:text-base">
                    Proceed to Checkout
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow p-4 md:p-6 md:w-1/3">
                  <h3 className="text-lg font-bold mb-3 md:mb-4">
                    Discount Code
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mb-3 md:mb-4">
                    Enter your coupon code if you have one.
                  </p>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      className="flex-1 border border-gray-300 rounded-l-md px-3 md:px-4 py-2 text-sm md:text-base"
                    />
                    <button className="bg-blue-600 text-white px-3 md:px-4 rounded-r-md text-sm md:text-base">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Favorites Section */}
      {favorites && favorites.length > 0 && (
        <div className="bg-blue-600 py-6 md:py-8 mt-8 md:mt-12">
          <div className="container mx-auto px-3 md:px-4">
            <div className="mb-6 md:mb-8">
              <h2 className="text-center text-xl md:text-2xl font-bold text-white">
                Favorites
              </h2>
              <div className="w-20 md:w-24 h-1 bg-white mx-auto mt-2 rounded"></div>
            </div>

            {/* Swiper Carousel */}
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              spaceBetween={15}
              slidesPerView={1}
              breakpoints={{
                480: { slidesPerView: 1 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
                1280: { slidesPerView: 4, spaceBetween: 20 },
              }}
              className="pb-10 md:pb-12 relative"
            >
              {favorites.map((product) => (
                <SwiperSlide key={product.id}>
                  <div className="bg-white rounded-lg shadow-md p-3 md:p-4 mx-auto text-center h-56 md:h-64 flex flex-col justify-center">
                    <img
                      src={product.imageURL}
                      alt={product.title}
                      className="h-28 md:h-32 object-contain mx-auto mb-3 md:mb-4"
                    />
                    <p className="text-gray-700 font-semibold text-sm md:text-base">
                      {product.title.length > 20
                        ? `${product.title.substring(0, 20)}...`
                        : product.title}
                    </p>
                    <p className="text-blue-600 font-medium mt-1 md:mt-2 text-sm md:text-base">
                      {product.salePrice || product.price} EGP
                    </p>
                    <button
                      className="mt-2 text-red-500 text-xs md:text-sm"
                      onClick={() => toggleFavorite(product)}
                    >
                      Remove from Favorites
                    </button>
                  </div>
                </SwiperSlide>
              ))}

              {/* Navigation buttons */}
              <div className="swiper-button-prev !text-white after:!text-lg md:after:!text-xl !left-0"></div>
              <div className="swiper-button-next !text-white after:!text-lg md:after:!text-xl !right-0"></div>
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
