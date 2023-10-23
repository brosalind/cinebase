import Sidebar from '../components/Sidebar'
import Container from 'react-bootstrap/Container'
import { Outlet } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import '../assets/movie.css'

function Navigation(){
    return(
        <>
          <Row style={{'--bs-gutter-x': '0', height: '100vh'}} >
            <Col className="col-md-2 bg-light">
            <div className="fixed-sidebar">
                <Sidebar></Sidebar>
                </div>
                </Col>
                <Col className="col-md-10">
                <Outlet></Outlet>
                </Col>
            </Row>
        

      
        </>
    )
}
export default Navigation