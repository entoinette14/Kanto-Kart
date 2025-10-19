import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

// images
import KKLogo from "./images/KK_Logo.png";
import img1 from "./images/riceimg.png";
import img2 from "./images/eggsimg.png";
import img3 from "./images/c2drink.png";
import ee from "./images/a_category.png";
import ee2 from "./images/a_category2.png";
import ee3 from "./images/a_category3.png";
import ee4 from "./images/a_category4.png";

// products
import prodEggs from "./images/eggcart.png";
import prodWatermelon from "./images/watermelon.png";
import prodKnorr from "./images/knorrcube.png";
import prodOnion from "./images/whiteonion.png";
import prodSpaghetti from "./images/delmontespag.png";
import prodCabbage from "./images/cabbage.png";
import prodPork from "./images/pork.png";
import prodGrapes from "./images/grapes.png";
import prodCarrots from "./images/carrots.png";
import prodKareKare from "./images/mamasita.png";

//dummy users
import userPlaceholder from "./images/dummy user 3.png";

//icons
import fbIcon from "./images/fb.png";
import xIcon from "./images/twtx.png";
import igIcon from "./images/ig.png";
import ttIcon from "./images/tt.png";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [visibleFeaturedIndex, setVisibleFeaturedIndex] = useState(0);
  const [testiIndex, setTestiIndex] = useState(0);
  const testiAutoRef = useRef(null);
  const sliderRef = useRef(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState(null);
  const [quickView, setQuickView] = useState(null);
  const [isReducedMotion] = useState(false);
  const [simulatedProducts, setSimulatedProducts] = useState([]);
  const searchInputRef = useRef(null);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const navLinks = ["Home", "Catalog", "Shop", "Contact"];

  const categories = [
    {
      name: "All Products",
      items: "152 items",
      image: ee,
      gradient: "from-brand-mint to-brand-yellow",
    },
    {
      name: "Vegetables",
      items: "65 items",
      image: ee3,
      gradient: "from-brand-peach to-brand-orange",
    },
    {
      name: "Fruits",
      items: "32 items",
      image: ee4,
      gradient: "from-brand-red to-brand-pink",
    },
    {
      name: "Meat",
      items: "41 items",
      image: ee2,
      gradient: "from-brand-purple to-brand-mint",
    },
  ];

  const featuredProducts = [
    { category: "Vegetables", name: "Half-dozen brown eggs", price: "Php 48.50", image: prodEggs },
    { category: "Fruits", name: "Watermelon", price: "Php 215.50", image: prodWatermelon },
    { category: "Vegetables", name: "Knorr Cubes - Beef", price: "Php 48.50", image: prodKnorr },
    { category: "Vegetables", name: "White Onion", price: "Php 21.50", image: prodOnion },
    { category: "Vegetables", name: "Del Monte Spaghetti Sauce", price: "Php 75.50", image: prodSpaghetti },
    { category: "Vegetables", name: "Cabbage", price: "Php 30.50", image: prodCabbage },
    { category: "Meat", name: "Pork Liempo", price: "Php 180.50", image: prodPork },
    { category: "Fruits", name: "Sweet Grapes", price: "Php 58.50", image: prodGrapes },
    { category: "Vegetables", name: "Carrots", price: "Php 48.50", image: prodCarrots },
    { category: "Vegetables", name: "Mama Sita’s Kare-Kare Mix", price: "Php 25.50", image: prodKareKare },
  ];

  useEffect(() => {
    const t = setTimeout(() => {
      setSimulatedProducts(featuredProducts.slice(0, 6));
    }, 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    startTestiAuto();
    return () => stopTestiAuto();
  }, []);

  const testimonials = useMemo(
    () => [
      { username: "@username1", rating: 5, text: "Great service, fresh products, will order again!" },
      { username: "@username2", rating: 4, text: "Fast delivery and helpful customer support." },
      { username: "@username3", rating: 5, text: "Quality produce — my family loved it." },
    ],
    []
  );

  function startTestiAuto() {
    stopTestiAuto();
    testiAutoRef.current = setInterval(() => {
      setTestiIndex((i) => (i + 1) % testimonials.length);
    }, 4500);
  }

  function stopTestiAuto() {
    if (testiAutoRef.current) {
      clearInterval(testiAutoRef.current);
      testiAutoRef.current = null;
    }
  }

  function handleAddToCart(product) {
    setCartCount((c) => c + 1);

    setNewsletterMsg(`${product.name} added to cart. Cart: ${cartCount + 1}`);
    setTimeout(() => setNewsletterMsg(null), 2200);
  }

  useEffect(() => {
    const saved = localStorage.getItem("kanto_newsletter_email");
    if (saved) {
      setNewsletterEmail(saved);
    }
  }, []);

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function handleNewsletterSubmit(e) {
    e.preventDefault();
    if (!newsletterEmail || !validateEmail(newsletterEmail)) {
      setNewsletterMsg("Please enter a valid email address.");
      setTimeout(() => setNewsletterMsg(null), 3000);
      return;
    }
    localStorage.setItem("kanto_newsletter_email", newsletterEmail);
    setNewsletterMsg("Thanks! You're subscribed to Kanto.Kart newsletter.");
    setTimeout(() => setNewsletterMsg(null), 3000);
  }

  function slideNext() {
    setVisibleFeaturedIndex((i) => (i + 1) % featuredProducts.length);
  }
  function slidePrev() {
    setVisibleFeaturedIndex((i) => (i - 1 + featuredProducts.length) % featuredProducts.length);
  }

  useEffect(() => {
    function onKey(e) {
      if (document.activeElement === searchInputRef.current) return; // avoid interfering while typing
      if (e.key === "ArrowRight") slideNext();
      if (e.key === "ArrowLeft") slidePrev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function openQuickView(prod) {
    setQuickView(prod);
    setTimeout(() => {
      const closeBtn = document.querySelector("#quickview-close");
      if (closeBtn) closeBtn.focus();
    }, 80);
  }
  function closeQuickView() {
    setQuickView(null);
  }

  const liveRegionRef = useRef(null);
  useEffect(() => {
    if (newsletterMsg && liveRegionRef.current) {
      liveRegionRef.current.textContent = newsletterMsg;
    }
  }, [newsletterMsg]);

  const searchResults = useMemo(() => {
    if (!debouncedSearch) return [];
    const q = debouncedSearch.toLowerCase();
    return featuredProducts.filter(
      (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    );
  }, [debouncedSearch, featuredProducts]);

  function handleAddToCart(product) {
    setCartItems((prev) => [...prev, product]);
    setCartCount((c) => c + 1);
    setNewsletterMsg(`${product.name} added to cart. Cart: ${cartCount + 1}`);
    setTimeout(() => setNewsletterMsg(null), 2200);
  }

  function toggleCart() {
    setIsCartOpen((prev) => !prev);
  }

  return (
    <div className="font-sans text-gray-800 bg-white">
      <div
        ref={liveRegionRef}
        aria-live="polite"
        className="sr-only"
        aria-atomic="true"
        id="live-region"
      />

      {/* NAVBAR */}
      <nav
        className="navbar"
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="flex items-center gap-2">
          <img
            src={KKLogo}
            alt="KantoKart Logo"
            className="w-12 sm:w-14 md:w-16 object-contain"
            loading="lazy"
          />
        </div>

        <ul className="nav-links" role="menubar" aria-hidden={false}>
          {navLinks.map((link) => (
            <li
              key={link}
              className="nav-item"
              role="menuitem"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                }
              }}
            >
              {link}
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              aria-label="Search products"
              placeholder="Search..."
              className="search-box"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {debouncedSearch && (
              <div
                className="absolute z-40 mt-1 right-0 w-64 bg-white border border-gray-200 rounded-md shadow-lg p-2"
                role="listbox"
                aria-label="Search suggestions"
              >
                {searchResults.length === 0 ? (
                  <div className="text-sm text-gray-500 p-2">No results</div>
                ) : (
                  searchResults.slice(0, 5).map((r, i) => (
                    <button
                      key={r.name}
                      className="w-full text-left px-2 py-2 text-sm hover:bg-[#FAF9F6] rounded focus:outline-none focus:ring-2 focus:ring-[#A3B899]"
                      role="option"
                      onClick={() => {
                        openQuickView(r);
                        setSearchTerm("");
                        setDebouncedSearch("");
                      }}
                    >
                      {r.name} <span className="text-xs text-gray-400">({r.category})</span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          <button
            className="cart-btn relative"
            aria-label={`Cart with ${cartCount} items`}
            title="Cart"
            onClick={toggleCart}
          >
            🛒
            {cartCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute -top-2 -right-2 bg-[#F5E6A1] text-[#4C705A] w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold shadow"
              >
                {cartCount}
              </span>
            )}
          </button>


          <button className="signup-btn">Sign Up</button>
          {/* ===== CART MODAL ===== */}
          {isCartOpen && (
            <div className="cart-overlay" onClick={toggleCart}>
              <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
                <div className="cart-header">
                  <h3 className="cart-title">Your Cart</h3>
                  <button className="cart-close" onClick={toggleCart}>✕</button>
                </div>

                {cartItems.length === 0 ? (
                  <p className="cart-empty">Your cart is empty.</p>
                ) : (
                  <div className="cart-items">
                    {cartItems.map((item, i) => (
                      <div key={i} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-img" />
                        <div className="cart-item-info">
                          <p className="cart-item-name">{item.name}</p>
                          <p className="cart-item-price">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {cartItems.length > 0 && (
                  <div className="cart-footer">
                    <button className="checkout-btn" onClick={() => alert("Checkout clicked!")}>
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}


        </div>

        <button
          className="menu-btn md:hidden"
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* MOBILE NAV */}
      {menuOpen && (
        <ul className="mobile-nav md:hidden" role="menu" aria-label="Mobile Menu">
          {navLinks.map((link) => (
            <li key={link} className="mobile-item" role="menuitem" tabIndex={0}>
              {link}
            </li>
          ))}
        </ul>
      )}

      <section className="featured-section" aria-labelledby="featured-heading">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          <div
            className="featured-banner bg-brand-mint md:col-span-2"
            role="region"
            aria-label="Large featured banner"
          >
            <img src={img3} alt="C2 Drinks" className="featured-img" loading="lazy" />
            <button className="banner-btn-animated" onClick={() => alert("Shop Now clicked!")}>
              Shop Now
            </button>
          </div>

          <div className="flex flex-col gap-6">
            <div className="featured-banner bg-brand-peach">
              <img src={img2} alt="Eggs" className="featured-img-small" loading="lazy" />
              <button className="banner-btn-animated">Shop Now</button>
            </div>
            <div className="featured-banner bg-brand-cream">
              <img src={img1} alt="Rice" className="featured-img-small" loading="lazy" />
              <button className="banner-btn-animated">Shop Now</button>
            </div>
          </div>

        </div>
      </section>

      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-content">
          <div className="hero-text-box">
            <h2 id="hero-heading" className="hero-title">Fresh Groceries Delivered to You</h2>
            <p className="hero-subtext">
              Shop farm-fresh vegetables, fruits, and meat at unbeatable prices — all from the comfort of your home.
            </p>
            <button className="hero-btn" onClick={() => window.scrollTo({ top: 600, behavior: "smooth" })}>
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* ======== CATEGORIES ========= */}
      <section className="section" aria-labelledby="categories-heading">
        <div className="flex justify-between items-center mb-8 px-2 sm:px-0">
          <h3 id="categories-heading" className="section-title mb-0">Top Categories</h3>
        </div>
        <div className="category-grid">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`category-card bg-gradient-to-br ${cat.gradient}`}
              onClick={() => alert(`${cat.name} clicked`)}
              aria-label={`Open ${cat.name} category`}
            >
              <img src={cat.image} alt={cat.name} className="category-img" loading="lazy" />
              <h4 className="category-name">{cat.name}</h4>
              <p className="category-items">({cat.items})</p>
            </button>
          ))}
        </div>
      </section>

      {/* ======== FEATURED PRODUCTS ========= */}
      <section className="section bg-gray-50" aria-labelledby="featured-products-heading">
        <div className="flex justify-between items-center mb-8 px-2 sm:px-0">
          <h3 id="featured-products-heading" className="section-title mb-0">Featured Products</h3>
          <div className="flex items-center gap-3">
            <button
              className="view-all-btn"
              onClick={() => alert("View All clicked")}
              aria-label="View all featured products"
            >
              View All
            </button>
          </div>
        </div>

        <div className="hidden md:grid featured-grid">
          {featuredProducts.map((item, index) => (
            <article key={index} className="product-card" aria-label={`${item.name} product card`}>
              <div className="product-category">{item.category}</div>
              <div className="product-img-box">
                <img src={item.image} alt={item.name} className="product-img" loading="lazy" />
              </div>
              <p className="product-price">{item.price}</p>
              <h4 className="product-name">{item.name}</h4>
              <div className="mt-4 flex justify-center items-center gap-3 sm:gap-4">
                <button
                  className="add-btn"
                  onClick={() => handleAddToCart(item)}
                  aria-label={`Add ${item.name} to cart`}
                >
                  Add to Cart
                </button>

                <button
                  className="quick-view-btn"
                  onClick={() => openQuickView(item)}
                  aria-label={`Quick view ${item.name}`}
                >
                  Quick View
                </button>
              </div>

            </article>
          ))}
        </div>

        <div className="md:hidden mt-4">
          <div className="relative overflow-hidden" ref={sliderRef} aria-roledescription="carousel">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${visibleFeaturedIndex * 100}%)`, width: `${featuredProducts.length * 100}%` }}
            >
              {featuredProducts.map((item, idx) => (
                <div
                  key={idx}
                  className="w-full flex-shrink-0 px-2"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} of ${featuredProducts.length}`}
                >
                  <article className="product-card">
                    <div className="product-category">{item.category}</div>
                    <div className="product-img-box">
                      <img src={item.image} alt={item.name} className="product-img" loading="lazy" />
                    </div>
                    <p className="product-price">{item.price}</p>
                    <h4 className="product-name">{item.name}</h4>
                    <div className="mt-3 flex justify-center gap-2">
                      <button
                        className="add-btn"
                        onClick={() => handleAddToCart(item)}
                        aria-label={`Add ${item.name} to cart`}
                      >
                        Add to Cart
                      </button>
                      <button
                        className="px-3 py-2 bg-white border rounded-full text-sm shadow-sm hover:shadow-md"
                        onClick={() => openQuickView(item)}
                        aria-label={`Quick view ${item.name}`}
                      >
                        Quick View
                      </button>
                    </div>
                  </article>
                </div>
              ))}
            </div>

            {/* Carousel Indicators */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex justify-center items-center gap-2 sm:gap-3">
              {featuredProducts.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`
        transition-all duration-300 rounded-full 
        ${i === visibleFeaturedIndex
                      ? "bg-[#4C705A] w-3 h-3 sm:w-3.5 sm:h-3.5 shadow-md"
                      : "bg-[#E5E3DF] w-2.5 h-2.5 sm:w-3 sm:h-3 hover:bg-[#C9DABF]"}
      `}
                  onClick={() => setVisibleFeaturedIndex(i)}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

      <section className="free-banner" aria-label="Free delivery banner">
        <div className="free-banner-content">
          <div className="free-banner-icon" aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 13.5V6a1.5 1.5 0 011.5-1.5h9.75A1.5 1.5 0 0115.75 6v7.5m0 0H19.5a1.5 1.5 0 001.5-1.5v-2.25a1.5 1.5 0 00-.44-1.06l-2.56-2.56A1.5 1.5 0 0016.94 6H15.75m0 7.5v3.75M6.75 17.25a1.5 1.5 0 11-3 0m13.5 0a1.5 1.5 0 11-3 0"
              />
            </svg>
          </div>

          <div className="free-banner-text">
            <h3 className="free-banner-title">Free Delivery!</h3>
            <p className="free-banner-sub">
              Enjoy <span className="highlight">free delivery</span> on your first order — straight to your door!
            </p>
            <button className="free-banner-btn">Shop Now</button>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="feedback-heading">
        <div className="flex justify-between items-center mb-8 px-2 sm:px-0">
          <h3 id="feedback-heading" className="section-title mb-0">Customer Feedback</h3>
        </div>

        <div className="hidden sm:grid feedback-grid">
          {testimonials.map((user) => (
            <div key={user.username} className="feedback-card">
              <div className="feedback-user-info">
                <img
                  src={userPlaceholder}
                  alt="User Avatar"
                  className="feedback-avatar"
                  loading="lazy"
                />
                <div>
                  <p className="feedback-user">{user.username}</p>
                  <p className="feedback-role">Verified Customer</p>
                </div>
              </div>

              <div>
                <p className="feedback-text mt-4">"{user.text}"</p>
              </div>

              <div>
                <div className="feedback-rating" aria-hidden="true">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={index < user.rating ? "#FFC519" : "none"}
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke={index < user.rating ? "#FFC519" : "#d1d5db"}
                      className="w-5 h-5 inline-block"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.175 4.41a.563.563 0 00.424.307l4.868.707a.563.563 0 01.312.96l-3.52 3.43a.563.563 0 00-.162.498l.83 4.845a.563.563 0 01-.817.594l-4.356-2.29a.563.563 0 00-.524 0l-4.356 2.29a.563.563 0 01-.817-.594l.83-4.845a.563.563 0 00-.162-.498l-3.52-3.43a.563.563 0 01.312-.96l4.868-.707a.563.563 0 00.424-.307l2.175-4.41z"
                      />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="sm:hidden text-center">
          {testimonials.map((user, i) => {
            const isActive = testiIndex === i;
            return (
              <div
                key={user.username}
                className={`feedback-card mx-auto ${isActive ? "ring-2 ring-[#A3B899]" : ""}`}
                aria-hidden={!isActive}
                style={{ display: isActive ? "flex" : "none" }}
              >
                <div className="feedback-user-info">
                  <img
                    src={userPlaceholder}
                    alt="User Avatar"
                    className="feedback-avatar"
                    loading="lazy"
                  />
                  <div>
                    <p className="feedback-user">{user.username}</p>
                    <p className="feedback-role">Verified Customer</p>
                  </div>
                </div>

                <div>
                  <p className="feedback-text mt-4">"{user.text}"</p>
                </div>

                <div>
                  <div className="feedback-rating" aria-hidden="true">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={index < user.rating ? "#FFC519" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke={index < user.rating ? "#FFC519" : "#d1d5db"}
                        className="w-5 h-5 inline-block"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.175 4.41a.563.563 0 00.424.307l4.868.707a.563.563 0 01.312.96l-3.52 3.43a.563.563 0 00-.162.498l.83 4.845a.563.563 0 01-.817.594l-4.356-2.29a.563.563 0 00-.524 0l-4.356 2.29a.563.563 0 01-.817-.594l.83-4.845a.563.563 0 00-.162-.498l-3.52-3.43a.563.563 0 01.312-.96l4.868-.707a.563.563 0 00.424-.307l2.175-4.41z"
                        />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex justify-center gap-3 mt-3">
            <button
              aria-label="Previous testimonial"
              onClick={() => setTestiIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
              className="px-3 py-2 bg-white border rounded-md shadow-sm"
            >
              ◀
            </button>
            <button
              aria-label="Next testimonial"
              onClick={() => setTestiIndex((i) => (i + 1) % testimonials.length)}
              className="px-3 py-2 bg-white border rounded-md shadow-sm"
            >
              ▶
            </button>
          </div>
        </div>
      </section>



      {/* ========= FOOTER ======== */}
      <footer className="footer" aria-labelledby="footer-heading">
        <div className="footer-container">

          <div className="footer-grid">

            <div>
              <h4 className="footer-title">About</h4>
              <ul className="footer-links">
                <li><a href="#">About Us</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Account</h4>
              <ul className="footer-links">
                <li><a href="#">Feedback</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Get in Touch</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Contact</h4>
              <p>📍 1234 Elm Street, Metro City, Philippines</p>
              <p>📞 +63 9123456790</p>
              <p>✉️ Kanto.KartPH@example.com</p>

              <div className="social-icons">
                <a href="#" className="social-link" aria-label="Facebook">
                  <img src={fbIcon} alt="Facebook" className="social-icon" loading="lazy" />
                </a>
                <a href="#" className="social-link" aria-label="X">
                  <img src={xIcon} alt="X" className="social-icon" loading="lazy" />
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <img src={igIcon} alt="Instagram" className="social-icon" loading="lazy" />
                </a>
                <a href="#" className="social-link" aria-label="TikTok">
                  <img src={ttIcon} alt="TikTok" className="social-icon" loading="lazy" />
                </a>
              </div>
            </div>
          </div>

          <div className="footer-divider"></div>

          <form
            onSubmit={handleNewsletterSubmit}
            className="footer-newsletter flex flex-col sm:flex-row items-center justify-between mt-4 sm:mt-6 gap-3 sm:gap-0"
            aria-label="Subscribe to newsletter form"
          >
            <p className="newsletter-title mb-2 sm:mb-0">Subscribe to our newsletter</p>
            <div className="newsletter-form flex w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="newsletter-input"
                aria-label="Enter your email to subscribe"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <button
                type="submit"
                className="newsletter-btn"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </div>
          </form>

          {newsletterMsg && (
            <div className="mt-3 text-center" role="status" aria-live="polite">
              <span className="text-sm bg-[#F5E6A1]/80 px-3 py-2 rounded">{newsletterMsg}</span>
            </div>
          )}

          <p className="footer-copy mt-4 sm:mt-6">
            © {new Date().getFullYear()} <span className="brand-name">KantoKart</span>. All Rights Reserved.
          </p>
        </div>
      </footer>

      {quickView && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Quick view ${quickView.name}`}
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={closeQuickView}
            aria-hidden="true"
          />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 z-60">
            <button
              id="quickview-close"
              className="absolute top-4 right-4 text-sm p-2 bg-[#FAF9F6] rounded-full"
              onClick={closeQuickView}
              aria-label="Close quick view"
            >
              ✕
            </button>

            <div className="flex gap-4 items-center">
              <div className="w-32 h-32 bg-[#F0F3EC] rounded-xl flex items-center justify-center overflow-hidden">
                <img src={quickView.image} alt={quickView.name} className="object-contain w-full h-full" />
              </div>
              <div>
                <h4 className="font-bold text-[#3B5947]">{quickView.name}</h4>
                <p className="text-[#4C705A] font-semibold mt-1">{quickView.price}</p>
                <p className="text-sm mt-2 text-gray-600">{quickView.category}</p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      handleAddToCart(quickView);
                      closeQuickView();
                    }}
                    className="add-btn"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => closeQuickView()}
                    className="quick-view-btn"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
