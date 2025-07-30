import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const CheckoutModal = ({ show, handleClose, handleConfirm, total }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleConfirm(formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
    });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>
          <i className="fas fa-credit-card me-2"></i>
          Checkout
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-8">
            <Form onSubmit={handleSubmit}>
              <h5 className="mb-3">Shipping Information</h5>
              
              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name *</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange} 
                      required 
                      placeholder="Enter your full name"
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address *</Form.Label>
                    <Form.Control 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange} 
                      required 
                      placeholder="Enter your email"
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number *</Form.Label>
                    <Form.Control 
                      type="tel" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleChange} 
                      required 
                      placeholder="Enter your phone number"
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>City *</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="city" 
                      value={formData.city}
                      onChange={handleChange} 
                      required 
                      placeholder="Enter your city"
                    />
                  </Form.Group>
                </div>
              </div>

              <Form.Group className="mb-3">
                <Form.Label>Shipping Address *</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  name="address" 
                  value={formData.address}
                  onChange={handleChange} 
                  required 
                  placeholder="Enter your complete shipping address"
                />
              </Form.Group>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>ZIP Code *</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="zipCode" 
                      value={formData.zipCode}
                      onChange={handleChange} 
                      required 
                      placeholder="Enter ZIP code"
                    />
                  </Form.Group>
                </div>
              </div>

              <div className="d-flex gap-2">
                <Button variant="primary" type="submit" className="flex-grow-1">
                  <i className="fas fa-check me-2"></i>
                  Confirm Order
                </Button>
                <Button variant="outline-secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
          
          <div className="col-md-4">
            <div className="card border-0 bg-light">
              <div className="card-body">
                <h6 className="card-title">Order Summary</h6>
                <hr />
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>Rs. {total.toLocaleString()}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span className="text-success">Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong className="text-primary">Rs. {total.toLocaleString()}</strong>
                </div>
                
                <div className="alert alert-info small">
                  <i className="fas fa-info-circle me-2"></i>
                  Your order will be processed securely and shipped within 2-3 business days.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CheckoutModal;
