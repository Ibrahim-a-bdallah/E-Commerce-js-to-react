import { useState, useEffect, useContext } from "react";
import { Heart, Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CartContext from "@/store/cart/CartContext";

const Home = () => {
  const { toggleFavorite, isFavorite, removeFromCart, addToCart, isCart } =
    useContext(CartContext);
  // console.log(isCart(1));
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const sampleProducts = [
      {
        id: 1,
        title: "Dell G15-5520",
        category: "Labtop",
        color: "Black",
        price: 36870,
        salePrice: 36270,
        imageURL: "images/Labtop1.jpg",
      },
      {
        id: 2,
        title: "Lenovo V15",
        category: "Labtop",
        color: "gray",
        price: 13333,
        salePrice: 13011,
        imageURL: "images/Labtop2.jpg",
      },
      {
        id: 3,
        title: "HP Victus",
        category: "Labtop",
        color: "Black",
        price: 47699,
        salePrice: 47438,
        imageURL: "images/Labtop3.jpg",
      },
      {
        id: 4,
        title: "Dell Vostro",
        category: "Labtop",
        color: "Black",
        price: 29660,
        salePrice: 29320,
        imageURL: "images/Labtop4.jpg",
      },
      {
        id: 5,
        title: "R50i",
        category: "Earbuds",
        color: "Black",
        price: 1699,
        salePrice: 1399,
        imageURL: "images/Earbuds1.jpg",
      },
      {
        id: 6,
        title: "R100",
        category: "Earbuds",
        color: "White",
        price: 1600,
        salePrice: 1499,
        imageURL: "images/Earbuds.jpg",
      },
      {
        id: 7,
        title: "Life P2",
        category: "Earbuds",
        color: "Black",
        price: 2899,
        salePrice: 2699,
        imageURL: "images/Earbuds3.jpg",
      },
      {
        id: 8,
        title: "Life Note E",
        category: "Earbuds",
        color: "Black",
        price: 2485,
        salePrice: 1600,
        imageURL: "images/Earbuds4.jpg",
      },
      {
        id: 8,
        title: "Generic",
        category: "Over Ear",
        color: "Blue",
        price: 215,
        salePrice: 185,
        imageURL: "images/Over Ear1.jpg",
      },
      {
        id: 9,
        title: "Panduo",
        category: "smart watch",
        color: "Green",
        price: 450,
        salePrice: 375,
        imageURL: "images/smartwatch1.jpg",
      },
      {
        id: 10,
        title: "Muktrics",
        category: "smart watch",
        color: "Black",
        price: 400,
        salePrice: 350,
        imageURL: "images/smartwatch2.jpg",
      },
      {
        id: 11,
        title: "BigPlayer",
        category: "smart watch",
        color: "Brown",
        price: 730,
        salePrice: 650,
        imageURL: "images/smartwatch3.jpg",
      },
      {
        id: 12,
        title: "Samsung Galaxy A34",
        category: "phone",
        color: "Awesome Silver",
        price: 11286,
        salePrice: 10400,
        imageURL: "images/phone1.jpg",
      },
      {
        id: 13,
        title: "A24",
        category: "phone",
        color: "Black",
        price: 49900,
        salePrice: 38090,
        imageURL: "images/phone2.jpg",
      },
      {
        id: 14,
        title: "Oppo Reno 8T",
        category: "phone",
        color: "gray",
        price: 12900,
        salePrice: 12090,
        imageURL: "images/phone3.jpg",
      },
      {
        id: 15,
        title: "Galaxy S22",
        category: "phone",
        color: "Green",
        price: 24299,
        salePrice: 24899,
        imageURL: "images/phone4.jpg",
      },
      {
        id: 16,
        title: "Galaxy S22 Ultra",
        category: "phone",
        color: "Phantom Black",
        price: 32800,
        salePrice: 33400,
        imageURL: "images/phone5.jpg",
      },
      {
        id: 17,
        title: "Galaxy S21",
        category: "phone",
        color: "Light Green",
        price: 21990,
        salePrice: 19299,
        imageURL: "images/phone6.jpg",
      },
      {
        id: 18,
        title: "Galaxy Z Fold5",
        category: "phone",
        color: "	Light blue",
        price: 73930,
        salePrice: 66000,
        imageURL: "images/phone7.jpg",
      },
    ];

    setProducts(sampleProducts);
    setFilteredProducts(sampleProducts);
  }, []);

  useEffect(() => {
    let result = products;

    if (searchTerm) {
      result = result.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (selectedColor !== "all") {
      result = result.filter((product) => product.color === selectedColor);
    }

    result = result.filter((product) =>
      product.salePrice
        ? product.salePrice >= priceRange[0] &&
          product.salePrice <= priceRange[1]
        : product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(result);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedColor, priceRange, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const uniqueColors = [...new Set(products.map((product) => product.color))];
  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Amazing Products
          </h1>
          <p className="text-xl mb-8">
            Find the best deals on quality products
          </p>

          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for products..."
              className="pl-10 pr-4 py-6 rounded-full text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="w-full md:w-1/4">
              <Card className="sticky top-4">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center">
                      <Filter className="mr-2 h-5 w-5" /> Filters
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedCategory("all");
                        setSelectedColor("all");
                        setPriceRange([0, 1000]);
                        setSearchTerm("");
                      }}
                    >
                      Clear All
                    </Button>
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Category</h3>
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {uniqueCategories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Color Filter */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Color</h3>
                    <Select
                      value={selectedColor}
                      onValueChange={setSelectedColor}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select color" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Colors</SelectItem>
                        {uniqueColors.map((color) => (
                          <SelectItem key={color} value={color}>
                            {color.charAt(0).toUpperCase() + color.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Filter */}
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Price Range</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1000"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            parseInt(e.target.value),
                          ])
                        }
                        className="w-full"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="w-full md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Products</h2>
                <p className="text-gray-600">
                  {filteredProducts.length} products found
                </p>
              </div>

              {currentProducts.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-gray-600 text-lg">
                    No products found. Try adjusting your filters.
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentProducts.map((product) => (
                      <Card
                        key={product.id}
                        className="overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative">
                          <img
                            src={product.imageURL}
                            alt={product.title}
                            className="w-full h-48 object-cover"
                          />
                          <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 rounded-full bg-white/80 hover:bg-white"
                            onClick={() => toggleFavorite(product)}
                          >
                            <Heart
                              className={`h-5 w-5 ${
                                isFavorite(product.id)
                                  ? "fill-red-500 text-red-500"
                                  : "text-gray-600"
                              }`}
                            />
                          </Button>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-1">
                            {product.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2 capitalize">
                            {product.category} • {product.color}
                          </p>
                          <div className="flex  flex-col justify-between ">
                            {product.salePrice ? (
                              <div className="flex items-center">
                                <span className="text-lg font-bold">
                                  ${product.salePrice}
                                </span>
                                <span className="ml-2 text-sm text-gray-500 line-through">
                                  ${product.price}
                                </span>
                              </div>
                            ) : (
                              <span className="text-lg font-bold">
                                ${product.price}
                              </span>
                            )}
                            {isCart(product.id) ? (
                              <Button
                                size="sm"
                                onClick={() =>
                                  removeFromCart(product.id, product.color)
                                }
                                className="mt-2 cursor-pointer bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 text-sm"
                              >
                                Remove from Cart
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() =>
                                  addToCart(product, product.color)
                                }
                                className="mt-2 cursor-pointer bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 text-sm"
                              >
                                Add to Cart
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <Pagination className="mt-8">
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            onClick={() =>
                              currentPage > 1 && paginate(currentPage - 1)
                            }
                            className={
                              currentPage === 1
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>

                        {Array.from(
                          { length: totalPages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <PaginationItem key={page}>
                            <PaginationLink
                              isActive={currentPage === page}
                              onClick={() => paginate(page)}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        ))}

                        <PaginationItem>
                          <PaginationNext
                            onClick={() =>
                              currentPage < totalPages &&
                              paginate(currentPage + 1)
                            }
                            className={
                              currentPage === totalPages
                                ? "pointer-events-none opacity-50"
                                : "cursor-pointer"
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
