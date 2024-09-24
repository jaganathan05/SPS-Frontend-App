import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

import './Register.css';
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate()
    const [formvalid,setformvalid] = useState(false)
    const [isvalidated,setValidated]=useState(false)
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onRegister = async(e) => {
        e.preventDefault();
       
        if (name.trim().length <= 2) {
            alert('Enter a valid Name (min 3 characters)');
            setValidated(false);
            return;
        }
        if (!email.trim().includes('@')) {
            alert('Enter a valid Email');
            setValidated(false);
            return;
        }
        if (password.trim().length <= 5) {
            alert('Password must be at least 6 characters');
            setValidated(false);
            return;
        }
        
            setformvalid(true)
            setValidated(true)
            
          

          if(formvalid){
            const data ={
                name : name ,
                email : email ,
                password : password
      } 
      console.log(data)

      const response = await axios.post('http://localhost:4000/register',
        data
      )

      if(response){
        alert(response.data.message)
        console.log('signup successfull')
        navigate('/login')

      }
      else {
        setValidated(false)
        alert('Signup failed')
    }
    

    }
}

    return (
        <div>
            <Form validated={isvalidated} className="register-container" onSubmit={onRegister}>
                <h3 className="mb-3">Register</h3>

             
                <Form.Group>
                    <Form.Label className='text-start d-block mb-2'>Name</Form.Label>
                    <Form.Control
                        placeholder="Enter Your Name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

             
                <Form.Group>
                    <Form.Label className="text-start d-block mb-2">Email</Form.Label>
                    <Form.Control
                        placeholder="Enter Your Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

               
                <Form.Group>
                    <Form.Label className="text-start d-block mb-2">Password</Form.Label>
                    <Row>
                        <Col xs={10}>
                            <Form.Control
                                placeholder="Enter Password"
                                type={!showPassword ? 'password' : 'text'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Col>
                        <Col xs={2}>
                            <Button
                                variant="secondary"
                                onClick={() => setShowPassword((prev) => !prev)}
                                type="button"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </Button>
                        </Col>
                    </Row>
                </Form.Group>

               
                <Button type="submit" className="mt-4">Submit</Button>

              
                <p>If You Have An Account <Link to={'/login'}>Login!</Link></p>
            </Form>
        </div>
    );
}

export default Register;
