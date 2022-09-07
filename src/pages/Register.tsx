import React, {Component, SyntheticEvent} from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

// This class demonstrates how we can create a form - capture those values into variables, and then submit those values
// into a form
// This uses class components
class Register extends Component{
    firstName = '';
    lastName = '';
    email = '';
    password = '';
    passwordConfirm = '';

    // Because we want to redirect the user we need to create a state variable
    state = {
        redirect: false
    }

    submit = async (e: SyntheticEvent) => {
        console.log("am I even being called here?")
        e.preventDefault();

        await axios.post('register', {
            first_name: this.firstName,
            last_name: this.lastName,
            email: this.email,
            password: this.password,
            password_confirm: this.passwordConfirm
        });

        // If we submit the form we want to change the state to be true
        this.setState({
            redirect: true
        })
    }

    render() {

        // If state is true, then redirect the user because they have submited the form already
        if (this.state.redirect){
            return <Navigate to={'/login'}/>
        }

        return (
            <main className={"form-signin w-100 m-auto"}>
                <form onSubmit={this.submit}>
                    <h1 className="h3 mb-3 fw-normal">Please Register</h1>

                    <div className="form-floating">
                        <input className="form-control" placeholder="first name"
                            onChange={e => this.firstName = e.target.value}
                        />
                        <label>First name</label>
                    </div>

                    <div className="form-floating">
                        <input className="form-control" placeholder="last name"
                            onChange={e => this.lastName = e.target.value}
                        />
                        <label>Last name</label>
                    </div>

                    <div className="form-floating">
                        <input type="email" className="form-control" placeholder="name@example.com"
                               onChange={e => this.email = e.target.value}
                        />
                        <label>Email address</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="Password"
                               onChange={e => this.password = e.target.value}
                        />
                        <label>Password</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control"
                               placeholder="Confirm password"
                               onChange={e => this.passwordConfirm = e.target.value}/>
                        <label>Confirm password</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Submit</button>
                </form>
            </main>
        );
    }
};

export default Register;