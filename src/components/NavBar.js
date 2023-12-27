import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './styles/navbar.scss'


const NavBar = () => {
  return (
    <Navbar expand="lg" className="nav-bar bg-body-tertiary">
      <Container className='nav-bar__container'>
        <Navbar.Brand href="/"><span className="nav-bar__container--title" >PokeCRUD</span></Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default NavBar;