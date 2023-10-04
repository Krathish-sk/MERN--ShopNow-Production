import { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FormContainer, CheckoutSteps } from "../components";
import { savePaymentMethod } from "../slices/cartSlice";

export default function Paymentscreen() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState("EasyPay");
  const dispatch = useDispatch();

  function submitHandler(e) {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Mode</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          {/* <Form.Label as="legend">Select Methd</Form.Label> */}
          <Col>
            <Form.Check
              className="my-2"
              type="radio"
              label="Easy-Pay"
              id="EasyPay"
              name="paymentMethod"
              value="EasyPay"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}
