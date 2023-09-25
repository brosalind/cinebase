import Sidebar from '../components/Sidebar'
import Container from 'react-bootstrap/Container'
import { Outlet } from 'react-router-dom'

function Navigation(){
    return(
        <>
          <Container>
            <div className="row">
                <div className="col-md-2">
                <Sidebar></Sidebar>
                </div>
                <div className="col-md-8">
                <Outlet></Outlet>
                </div>
            </div>
          
        </Container>

      
        </>
    )
}
export default Navigation