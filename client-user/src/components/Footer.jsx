import { Container, Row, Col } from "react-bootstrap";

function Footer() {

    return (
        <footer className="bg-black text-white">
            <Container style={{ paddingTop: '80px', paddingBottom: '50px' }}>
                <Row className="align-items-center">
                    <Col md={2}>
                        <ul className="list-unstyled">
                            <li>
                                <a href="/">Home</a>
                            </li>
                            <li>
                                <a href="/movies">Movies</a>
                            </li>
                        </ul>
                    </Col>
                    <Col md={2}>
                        <ul className="list-unstyled">

                            <li>
                                <a href="/about">About</a>
                            </li>
                            <li>
                                <a href="mailto:contact@cinebase.com">Contact</a>
                            </li>
                        </ul>
                    </Col>

                    <Col md={8} className="text-center">
                        <div>
                            <h4>Cinebase   <span style={{ fontSize: '12px', letterSpacing: '5px', marginLeft: '20px' }}> where good films live.</span></h4>
                        </div>
                        <p>© 2023</p>

                    </Col>
   
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
