import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { Message, Meta } from "../components";
import { addToCart, removeFromCart } from "../slices/cartSlice";

export default function CartScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  // Add to Cart
  function addToCartHandler(product, qty) {
    dispatch(addToCart({ ...product, qty }));
  }

  //   Remove from Cart
  function removeFromCartHandler(id) {
    dispatch(removeFromCart(id));
  }

  // After cart navigate to shipping screen
  function checkoutHandler() {
    navigate("/login?redirect=/shipping");
  }

  return (
    <>
      <Meta title="ShopNow - Cart Items" />
      <Row>
        <Col md={8}>
          <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/">Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item ley={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image fluid rounded src={item.image} alt={item.name} />
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>₹ {item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        style={{ margin: "5px" }}
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  )
                </h2>
                ₹{" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}
