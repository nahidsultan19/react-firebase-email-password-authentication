import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import app from '../../firebase.init';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

const auth = getAuth(app);

const UserForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [registered, setRegistered] = useState(false);
    const [error, setError] = useState('');
    const [validated, setValidated] = useState(false);


    const handleUserName = (event) => {
        setName(event.target.value)
    }
    const handleUserEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleUserPassword = (event) => {
        setPassword(event.target.value)
    }


    const handleRegister = event => {
        setRegistered(event.target.checked);
    }

    // submit form for new user creation
    const handleSubmit = (event) => {
        event.preventDefault();

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            return;
        }
        if (!/(?=.*?[#?!@$%^&*-])/.test(password)) {
            setError('Password should contain at least one special character')
            return;
        }

        setValidated(true);

        setError('')

        if (registered) {
            signInWithEmailAndPassword(auth, email, password)
                .then(result => {
                    const user = result.user;
                    console.log(user)
                })
                .catch(error => {
                    setError(error.message)
                    console.error(error)
                })
        } else {
            createUserWithEmailAndPassword(auth, email, password)
                .then(result => {
                    const user = result.user;
                    console.log(user);
                    setName('');
                    setEmail('');
                    setPassword('');
                    setUserName();
                    emailVerification();
                })
                .catch(error => {
                    setError(error.message);
                    console.log(error);
                })
        }

    }

    const handlePasswordReset = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('Email Sent')
            })
            .catch(error => {
                setError(error.message);
                console.log(error);
            })
    }

    const setUserName = () => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(() => {
                console.log('Update name')
            })
            .catch(error => {
                setError(error.message);
                console.error(error);
            })
    }

    const emailVerification = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log('Email verification sent!!')
            })
    }

    return (
        <div className='w-50 mx-auto'>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className='mt-5'>
                <h2 className='text-primary font-bold'>User {registered ? 'Login' : 'Register'}</h2>
                {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>User Name</Form.Label>
                    <Form.Control onBlur={handleUserName} type="text" placeholder="Enter Your Name" />
                </Form.Group>}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onBlur={handleUserEmail} type="email" placeholder="Enter email" required />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onBlur={handleUserPassword} type="password" placeholder="Password" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check onChange={handleRegister} type="checkbox" label="Already have an Account?" />
                </Form.Group>
                <p className='text-danger'>{error}</p>
                <Button variant="primary" type="submit">
                    {registered ? 'Login' : 'Register'}
                </Button>
                <Button onClick={handlePasswordReset} variant='link'>Forget Password?</Button>
            </Form>
        </div>
    );
};

export default UserForm;