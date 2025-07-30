import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container-fluid p-0">
      <section className="bg-primary text-white align-items-center justify-content-center d-flex" style={{ height: '100vh' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-4">
                Welcome to E-Shop
              </h1>
              <p className="lead mb-4">
                Discover amazing products at unbeatable prices. Shop the latest trends 
                in electronics, fashion, and more with our secure and fast checkout process.
              </p>
              <Link to="/products" className="btn btn-light btn-lg me-3">
                Shop Now
              </Link>
              <Link to="/cart" className="btn btn-outline-light btn-lg">
                View Cart
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
  );
}

export default Home;