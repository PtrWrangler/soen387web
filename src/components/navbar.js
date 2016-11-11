import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { logout } from '../actions/index';
import { Link } from 'react-router';

class Navbar extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	onLogout() {
		this.props.logout(this.props.user.id).then(() => { this.context.router.push('/'); });
	}

	render() {
		return (
			<nav className="navbar navbar-default navbar-fixed-top topnav" role="navigation">
		        <div className="container topnav">
		            {/* Brand and toggle get grouped for better mobile display */}
		            <div className="navbar-header">
		                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
		                    <span className="sr-only">Toggle navigation</span>
		                    <span className="icon-bar"></span>
		                    <span className="icon-bar"></span>
		                    <span className="icon-bar"></span>
		                </button>
		                <Link className="navbar-brand topnav" to="/">Home</Link>
		            </div>
		            {/* Collect the nav links, forms, and other content for toggling */}
		            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
		                <ul className="nav navbar-nav navbar-right">
		                    <li>
		                        <a href="#EventCreation">Reserve</a>
		                    </li>
		                    <li>
		                        <a href="#View">View</a>
		                    </li>
		                    <li>
		                        <a href="#Contact">Contact</a>
		                    </li>
		                    <li>
		                        <a href="#" onClick={this.onLogout.bind(this)}>Logout</a>
		                    </li>
		                </ul>
		            </div>
		            {/* /.navbar-collapse */}
		        </div>
		        {/* /.container */}
		    </nav>
		);
	}
};


//Will need to replace second arg by { logout } to map state to props once implemented
export default connect(null, null)(Navbar);