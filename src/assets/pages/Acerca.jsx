import { Container, Carousel } from 'react-bootstrap';

import img1 from '../../img/img1.jpg';
import img2 from '../../img/img2.jpg';
import img3 from '../../img/img3.jpg';

const integrantes = [
  {
    nombre: 'Juan Eduardo Lamas',
    descripcion: 'Líder del grupo.',
    foto: img3,
  },
  {
    nombre: 'Pricila Acsama',
    descripcion: 'Organizador de Proyectos.',
    foto: img1,
  },
  {
    nombre: 'Delia Maribel Cusipuma',
    descripcion: 'Control y Dar formato a Proyectos.',
    foto: img2,
  },
];

function Acerca() {
  return (
    <>
      <Container className="py-5">
      <h2 className="text-center fw-bold mb-3">CONOCE AL GRUPO 11 👥</h2>
      <p className="text-center text-muted mb-4 fs-5">
        Este proyecto fue realizado por estudiantes de Programación Visual.<br></br>
        Trabajamos de manera colaborativa, asignando roles claros, compartiendo ideas y resolviendo desafíos juntos para lograr una experiencia de aprendizaje significativa.

      </p>


      <Carousel data-bs-theme="dark" className="custom-carousel mx-auto" interval={2500}>
        {integrantes.map((persona, index) => (
          <Carousel.Item key={index}>
            <div className="carousel-card mx-auto p-4">
              <img
                src={persona.foto}
                alt={persona.nombre}
                className="shadow"
                style={{
                  width: '600px',
                  height: '450px',
                  objectFit: 'cover',
                  border: '3px solid',
                  margin: '0 auto 1rem auto',
                  display: 'block',
                }}
              />
              <Carousel.Caption className="carousel-caption-custom">
              <h3>{persona.nombre}</h3>
              <p>{persona.descripcion}</p>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
    </>
  );
}

export default Acerca;
