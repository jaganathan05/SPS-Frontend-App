import { Form, Button, Row, Col } from "react-bootstrap";
import { useContext, useState } from "react";
import axios from "axios";
import './Register.css';
import { Link, useNavigate } from "react-router-dom";
import Auth_context from "../../Store/Auth_Context";

function Login() {
    const Auth_Ctx = useContext(Auth_context)
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isValidated, setValidated] = useState(false);

    const onLogin = async (e) => {
        e.preventDefault();

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

       
        setValidated(true);

        const data = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post('http://54.85.8.79:4000/login', data);

            if (response && response.data) {
                localStorage.setItem('username', response.data.playerName)
                localStorage.setItem('usertoken', response.data.token)
                alert(response.data.message);
                Auth_Ctx.loginHandler(response.data.token, response.data.playerName )
                console.log('Login successful');
                navigate('/home'); 
            }
        } catch (error) {
            setValidated(false);
            alert('Login failed');
            console.error('Error during login:', error);
        }
    };

    return (
        <div  className="register-container">
            <Form noValidate validated={isValidated} className="register-box" onSubmit={onLogin}>
                <h3 className="mb-3">Login</h3>

               
                <Form.Group>
                    <Form.Label className="form-label text-start d-block mt-2 mb-2">Email</Form.Label>
                    <Form.Control
                        placeholder="Enter Your Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>

               
                <Form.Group>
                    <Form.Label className="form-label text-start d-block mt-2 mb-2">Password</Form.Label>
                    <Row>
                        <Col xs={9}>
                            <Form.Control
                                placeholder="Enter Password"
                                type={!showPassword ? 'password' : 'text'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid password with at least 6 characters.
                            </Form.Control.Feedback>
                        </Col>
                        <Col xs={2}>
                            <Button
                                variant="dark"
                                onClick={() => setShowPassword((prev) => !prev)}
                                type="button"
                            >
                                {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                            </Button>
                        </Col>
                    </Row>
                </Form.Group>

                
                <Button type="submit" className="mt-4 mb-4">Submit</Button>

                
                <p className='text-light'>If You Don't Have An Account <Link  className="text-decoration-none text-bg-warning"  to={'/register'}>Register!</Link></p>
            </Form>
        </div>
    );
}

export default Login;
