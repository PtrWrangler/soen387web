import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { login } from '../actions/index';
import crypto from 'crypto-js';
import toastr from 'toastr';
import Navbar from './navbar';
import Footer from './footer';


class Login extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	onSubmit(props) {
		// const hashedPassword = crypto.SHA256(this.props.values.password);
		// alert("Password: " + this.props.values.password + " & hash: "  + hashedPassword);
		this.props.login(props)
			.then(() => {
				// blog post created, navigate user to the index
				// We navigate by calling this.context.router.push with the new path
				this.context.router.push('/EventCreation');
			}).catch(() => {
				toastr.error("Something went wrong");
			});
	}

	// handleForgotPassword() {
	// 	this.context.router.push('/forgotPassword');
	// }

	render() {
		const {fields: {username, password}, handleSubmit} = this.props;

		return (
			<div>
				{/*<Navbar history={this.props.history} />*/}
				<div className="intro-header">
			        <div className="container">
			            <div className="row">
			                <div className="col-lg-12">
			                    <div className="intro-message">
			                        <h1>Login</h1>
			                        <br/>
			                        <br/>
			                        <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
			                            <div className={`form-group ${username.touched && username.invalid ? 'has-danger' : ''}`}>
			                                <label className="control-label col-sm-4">User Name :</label>
			                                <div className="col-sm-4">
			                                    <input type="text" className="form-control" {...username}/>
			                                    <div className="text-help">
			                                    	{username.touched ? username.erros : ''}
			                                    </div>
			                                </div>
			                            </div>
			                            <div className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}`}>
			                                <label className="control-label col-sm-4">Password :</label>
			                                <div className="col-sm-4">
			                                    <input type="password" className="form-control" {...password}/>
			                                    <div className="text-help">
			                                    	{password.touched ? password.erros : ''}
			                                    </div>
			                                </div>
			                            </div>
			                            <hr className="intro-divider"/>
			                            <div className="form-group">
			                                {/* add hashing of password */}
			                                <button type="submit" className="btn btn-success">Log in</button>
			                                {/*<button type="button" className="btn btn-primary col-xs-offset-2" onClick={handleForgotPassword()}>Forgot Password</button>*/}
			                            </div>
			                        </form>
			                    </div>
			                </div>
			            </div>

			        </div>
			        {/* /.container */}
			    </div>
			    {/*<Footer />*/}
		    </div>
		);
	}
}

function validate(values) {
	const errors = {};

	if(!values.username) {
		errors.username = "Enter a username";
	}

	if (!values.password) {
		errors.password = "Enter a password";
	}

	return errors;
}

export default reduxForm({
	form: 'Login',
	fields: ['username', 'password'],
	validate
}, null, { login })(Login);




