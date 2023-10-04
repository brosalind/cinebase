import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { registerAdmin } from '../stores/adminActionCreator'
function Register() {
  const dispatch = useDispatch()
  const { registerSuccess, registerLoading, registerError } = useSelector((state) => {
    return state.admin
  })
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: '',
    username: '',
    phoneNumber: '',
    address: '',

  })

  function handleChange(e) {
    const { value, name } = e.target
    console.log(value, name)
    setRegisterForm({
      ...registerForm,
      [name]: value
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    console.log(registerForm)
    dispatch(registerAdmin(registerForm))
  }

  if (registerLoading) {
    return <h1 className="text-center">Processing your request. Please wait a moment.</h1>
  }

  if (registerSuccess) {
    return <h1 className='text-center'>Success!</h1>
  }

  return (
    <>
      <Container className='d-flex justify-content-center' style={{ margin: '0 auto' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ marginTop: '40px' }}>Register a New Admin</h1>

          <Form onSubmit={handleSubmit} style={{ width: '800px', margin: '0 auto', alignContent: 'center' }}>
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <Form.Label>Username</Form.Label>
              </div>
              <Form.Control type="text" className="form-control" id="register-username" placeholder="Enter your username ..."
                value={registerForm.username} onChange={handleChange} name="username" />
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <Form.Label>Email</Form.Label>
                <Form.Label className="text-danger text-end fw-bold">*</Form.Label>
              </div>
              <Form.Control type="email" className="form-control" id="register-email" name="email" placeholder="Enter email address ..."
                required value={registerForm.email} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <Form.Label>Password</Form.Label>
                <Form.Label className="text-danger text-end fw-bold">*</Form.Label>
              </div>
              <Form.Control type="password" className="form-control" id="register-password" name="password"
                placeholder="Enter your password ..." required value={registerForm.password} onChange={handleChange} />
            </div>
            <div className="mb-3">
            <div className="d-flex justify-content-between">
              <Form.Label>Phone Number</Form.Label>
              </div>
              <Form.Control type="number" className="form-control" id="register-phone" name="phoneNumber"
                placeholder="Enter phone number (optional) ..." value={registerForm.phoneNumber} onChange={handleChange} />
            </div>
            <div className="mb-3">
            <div className="d-flex justify-content-between">
              <Form.Label>Address</Form.Label>
              </div>
              <textarea id="register-address" className="form-control" rows="3" name="address"
                placeholder="Enter your address (optional) ..." value={registerForm.address} onChange={handleChange}></textarea>
            </div>
            <Button className="btn btn-lg btn-dark rounded-pill w-100 p-2 mt-3" type="submit">Sign Up</Button>
          </Form>

        </div>
      </Container>


    </>
  )
}

export default Register