import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import CheckoutModal from "./CheckoutModal";

function Cart() {
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const handleConfirm = (formData) => {
    console.log("Order Confirmed:", formData);
    setOrderConfirmed(true);
    setShowCheckout(false);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8">
          <h1 className="display-5 fw-bold mb-4">
            <i className="fas fa-shopping-cart me-3"></i>
            Shopping Cart
          </h1>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <i className="fas fa-shopping-cart display-1 text-muted mb-4"></i>
              <h3 className="text-muted">Your cart is empty</h3>
              <p className="text-muted">Add some products to get started!</p>
            </div>
          ) : (
            <div className="row">
              {cartItems.map((item) => (
                <div key={item.id} className="col-12 mb-3">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-md-2">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="img-fluid rounded"
                            style={{ height: '80px', objectFit: 'cover' }}
                          />
                        </div>
                        <div className="col-md-4">
                          <h5 className="card-title mb-1">{item.name}</h5>
                          <p className="text-muted mb-0">Rs. {item.price.toLocaleString()}</p>
                        </div>
                        <div className="col-md-3">
                          <div className="input-group">
                            <button 
                              className="btn btn-outline-secondary"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              <i className="fas fa-minus"></i>
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                              className="form-control text-center"
                              style={{ maxWidth: '80px' }}
                            />
                            <button 
                              className="btn btn-outline-secondary"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <i className="fas fa-plus"></i>
                            </button>
                          </div>
                        </div>
                        <div className="col-md-2 text-end">
                          <h6 className="text-primary fw-bold">
                            Rs. {(item.price * item.quantity).toLocaleString()}
                          </h6>
                        </div>
                        <div className="col-md-1 text-end">
                          <button 
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm sticky-top" style={{ top: '100px' }}>
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>
              
              {cartItems.length > 0 && (
                <>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal ({cartItems.length} items):</span>
                    <span>Rs. {getTotal().toLocaleString()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping:</span>
                    <span className="text-success">Free</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3">
                    <strong>Total:</strong>
                    <strong className="text-primary">Rs. {getTotal().toLocaleString()}</strong>
                  </div>
                  
                  <button 
                    className="btn btn-primary w-100 mb-2"
                    onClick={() => setShowCheckout(true)}
                    disabled={cartItems.length === 0}
                  >
                    <i className="fas fa-credit-card me-2"></i>
                    Proceed to Checkout
                  </button>
                  
                  <button 
                    className="btn btn-outline-secondary w-100"
                    onClick={clearCart}
                    disabled={cartItems.length === 0}
                  >
                    <i className="fas fa-trash me-2"></i>
                    Clear Cart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {orderConfirmed && (
        <div className="alert alert-success alert-dismissible fade show mt-4" role="alert">
          <i className="fas fa-check-circle me-2"></i>
          <strong>Order Confirmed!</strong> Thank you for your purchase. You will receive a confirmation email shortly.
          <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        </div>
      )}

      <CheckoutModal
        show={showCheckout}
        handleClose={() => setShowCheckout(false)}
        handleConfirm={handleConfirm}
        total={getTotal()}
      />
    </div>
  );
}

export default Cart;
