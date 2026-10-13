import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { tokenContext } from "../../Context/TokenContext";
import { cartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishlistContext";


export default function Navbar() {
  const [navToggle, setNavToggle] = useState(false);
  const userName = localStorage.getItem("userName"); // Retrieve user's name
  let { token, setToken } = useContext(tokenContext);
  let { cartCounter, setCartCounter, getCart } = useContext(cartContext);
  let {
    wishlistCounter,
    setWishlistCounter,
    getWishlist,
    setWishlistProductsId,
  } = useContext(wishlistContext);

  let navigate = useNavigate();

  function handleNavToggle() {
    setNavToggle(!navToggle);
  }

  function handleNavLinkClick() {
    setNavToggle(false); 
  }

  function logOut() {
    localStorage.clear();
    setToken(null);
    navigate("/auth/signin");
  }

  useEffect(() => {
    if (token) {
      (async () => {
        let cartResponse = await getCart();
        if (cartResponse?.response?.data?.statusMsg === "fail") {
          setCartCounter(0);
        } else {
          setCartCounter(cartResponse?.data?.numOfCartItems);
        }

        let wishlistResponse = await getWishlist();
        if (wishlistResponse?.data?.status === "success") {
          setWishlistCounter(wishlistResponse?.data?.count);
          const wishlistIds = wishlistResponse?.data?.data.map(
            (item) => item.id
          );
          setWishlistProductsId(wishlistIds);
        }
      })();
    }
  }, [token, getCart, getWishlist, setCartCounter, setWishlistCounter, setWishlistProductsId]);

  return (
    <nav className="navbar navbar-expand-md bg-main-light fixed-top border-bottom">
      <div className="container py-2">
        <NavLink className="navbar-brand mb-md-2" to="/home">
          <img src={logo} alt="Fresh-Cart Logo" className="w-100" />
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          onClick={handleNavToggle}
          aria-expanded={navToggle}
          aria-label="Toggle navigation"
        >
          <i className={`fa-solid ${navToggle ? "fa-xmark" : "fa-bars"} fs-4`}></i>
        </button>

        <div className={`collapse navbar-collapse ${navToggle ? "show" : ""}`} id="navbarSupportedContent">
          {token ? (
            <>
              {/* Left-side navigation links */}
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/home" onClick={handleNavLinkClick}>
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/products" onClick={handleNavLinkClick}>
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/categories" onClick={handleNavLinkClick}>
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/brands" onClick={handleNavLinkClick}>
                    Brands
                  </NavLink>
                </li>
                <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/allorders"
                        onClick={() => {
                          handleNavLinkClick();
                        }}
                      >
                        All-Orders
                      </NavLink>
                    </li>
                    
              </ul>

              {/* Right-side Icons (Cart & Wishlist) */}
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link position-relative" to="/cart" onClick={handleNavLinkClick}>
                    <i className="fa-solid fa-cart-shopping ms-2 cart-icon"></i>
                    {cartCounter > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge bg-main">
                        {cartCounter}
                      </span>
                    )}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link position-relative" to="/wishlist" onClick={handleNavLinkClick}>
                    <i className="fa-solid fa-heart ms-2 wish-icon"></i>
                    {wishlistCounter > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge bg-main">
                        {wishlistCounter}
                      </span>
                    )}
                  </NavLink>
                </li>
                
              </ul>

              {/* Social Media Links */}
              <div className="d-flex gap-3 ms-5 me-5">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-tiktok"></i>
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>

              {/* Logout Button */}
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={logOut}>
                    Log Out
                  </button>
                </li>
              </ul>
            </>
          ) : (
            <>
              {/* Sign-in and Sign-up Links */}
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/auth/signin" onClick={handleNavLinkClick}>
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/auth/signup" onClick={handleNavLinkClick}>
                    Sign Up
                  </NavLink>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
