import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rating } from "./index";

export default function Product({ product }) {
  return (
    <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 1 }}>
      <Card className="rounded my-3 p-3">
        <Link to={`/products/${product._id}`}>
          <Card.Img src={product.image} variant="top" fluid />
        </Link>

        <Card.Body>
          <Link to={`/products/${product._id}`}>
            <Card.Title as="div" className="product-title">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="h3">₹ {product.price}</Card.Text>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
