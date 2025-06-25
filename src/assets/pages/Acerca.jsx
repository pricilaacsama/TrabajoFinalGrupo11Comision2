import { Container, Carousel } from 'react-bootstrap';
import "../../App.css"

import img1 from '../../img/img1.jpg';
import img2 from '../../img/img2.jpg';
import img3 from '../../img/img3.jpg';

const integrantes = [
  {
    nombre: 'Juan Eduardo Lamas',
    github: 'https://github.com/juanjujuy',
    foto: img3,
  },
  {
    nombre: 'Pricila Acsama',
    github: 'https://github.com/pricilaacsama',
    foto: img1,
  },
  {
    nombre: 'Delia Maribel Cusipuma',
    github: 'https://github.com/Delia150',
    foto: img2,
  },
];

function Acerca() {
  return (
    <Container className="acerca-container">
      <h2 className="acerca-titulo">👥 CONOCÉ AL GRUPO 11</h2>
      <p className="acerca-descripcion">
        Este proyecto fue realizado por estudiantes de Programación Visual.<br />
        Trabajamos de manera colaborativa, asignando roles claros, compartiendo ideas y resolviendo desafíos juntos para lograr una experiencia de aprendizaje significativa.
      </p>

      <Carousel data-bs-theme="dark" className="acerca-carousel" interval={3000} fade>
        {integrantes.map((persona, index) => (
          <Carousel.Item key={index}>
            <div className="acerca-slide">
              <img
                src={persona.foto}
                alt={persona.nombre}
                className="acerca-img shadow"
              />
              <Carousel.Caption className="acerca-caption text-light">
                <h3>{persona.nombre}</h3>
                <p>
                  <a href={persona.github} target="_blank" rel="noopener noreferrer" style={{ color: 'lightblue' }}>
                    Repositorio GitHub
                  </a>
                </p>
              </Carousel.Caption>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default Acerca;
