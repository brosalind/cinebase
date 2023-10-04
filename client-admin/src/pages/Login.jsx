import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../stores/adminActionCreator';
import { useNavigate, redirect } from 'react-router-dom';
import { errorLogin, successLogin } from '../stores/adminActionCreator';


function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const {loading, isLoggedIn} = useSelector((state) => {
      return state.admin
  })

    function handleChange(e){
        const {value, name} = e.target
        setLoginForm({
            ...loginForm,
            [name]: value
        })
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(login(loginForm))
        .then(async(response) => {
          console.log("here 2?", response)
          if(!response.ok){
              throw await response.text()
          }
          return response.json()
      }).then ((data) => {
          localStorage.setItem("access_token", data.access_token)
          dispatch(successLogin(true))
          navigate('admin/movies')  
      }).catch((err) => {
          console.log(err,"this is error")
          dispatch(errorLogin(err))
      })
         
    }
    



  return (
    <Container className="d-flex align-items-center justify-content-center" style={{height: '100vh'}}>
      <div style={{textAlign: 'center'}}>
      <h1 className='text-center' style={{marginBottom: '20px', marginTop: '-50px'}}>Sign In</h1>
      
    <Form onSubmit={handleSubmit} style={{margin: '0 auto'}}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={loginForm.email} onChange={handleChange} />
        <Form.Text className="text-muted text-center">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={loginForm.password} onChange={handleChange} />
      </Form.Group>
      <Button variant="dark" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </Container>
  );
}

export default Login;