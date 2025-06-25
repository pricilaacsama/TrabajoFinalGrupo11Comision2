import ProductList from "../components/ProductList";
import { Container } from "react-bootstrap";
import "../../App.css"

function Home() {
  return (
    <Container className="my-4 home-container">
      <div className="text-center mb-4">
        <h1 className="display-4 fw-bold text-primary">Bienvenidos a Click&Go 🚀</h1>
        <p className="lead text-muted mt-3"> <strong>
          Explora, elige y compra los mejores productos al instante.  
          <br /> ¡Tu compra está a un clic de distancia!</strong>
        </p>
      </div>
      <ProductList/>
    </Container>
  );
}

export default Home;
