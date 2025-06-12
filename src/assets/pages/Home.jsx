import ProductList from "../components/ProductList";
import { Container } from "react-bootstrap";

function Home() {
  return (
    <Container className="my-4">
      <h1 className="text-center mb-4 display-4 fw-bold text-dark">Bienvenidos...</h1>
      <ProductList/>
    </Container>
  );
}

export default Home;
