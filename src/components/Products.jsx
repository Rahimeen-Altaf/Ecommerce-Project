import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import products from "../data";

function Products() {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (product) => {
    addToCart(product);
    // Show a toast-like notification
    const notification = document.createElement('div');
    notification.className = 'position-fixed top-0 end-0 p-3';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
      <div class="alert alert-success alert-dismissible fade show" role="alert">
        <i class="fas fa-check-circle me-2"></i>
        ${product.name} added to cart!
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      </div>
    `;
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 3000);
  };

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col">
          <h1 className="display-5 fw-bold text-center mb-3">Our Products</h1>
          <p className="text-muted text-center lead">
            Explore our wide range of products and find the perfect fit for your needs.
          </p>
        </div>
      </div>
      
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-lg-3 col-md-4 col-sm-6" key={product.id}>
            <div className="card h-100 border-0 shadow-sm product-card">
              <div className="position-relative">
                <img 
                  src={product.image} 
                  className="card-img-top" 
                  alt={product.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="position-absolute top-0 end-0 m-2">
                  <span className="badge bg-primary">New</span>
                </div>
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold">{product.name}</h5>
                <p className="card-text text-muted mb-3">
                  High-quality product with excellent features and durability.
                </p>
                <div className="mt-auto">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="h5 text-primary fw-bold mb-0">
                      Rs. {product.price.toLocaleString()}
                    </span>
                    <div className="text-warning">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary w-100"
                    onClick={() => handleAddToCart(product)}
                  >
                    <i className="fas fa-shopping-cart me-2"></i>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
