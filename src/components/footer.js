import React, { Component } from 'react';
import { Link } from 'react-router';

class Footer extends Component {
	render() {
		return (
			<footer>
		        <div className="container">
		            <div className="row">
		                <div className="col-lg-12">
		                    <ul className="list-inline">
		                        <li>
		                            <Link to="/">Home</Link>
		                        </li>
		                        <li className="footer-menu-divider">&sdot;</li>
		                        <li>
		                            <a href="#about">About</a>
		                        </li>
		                        <li className="footer-menu-divider">&sdot;</li>
		                        <li>
		                            <a href="#services">Register</a>
		                        </li>
		                        <li className="footer-menu-divider">&sdot;</li>
		                        <li>
		                            <a href="#contact">Contact</a>
		                        </li>
		                    </ul>
		                    <p className="copyright text-muted small">SOEN 387 - Reservation UI</p>
		                </div>
		            </div>
		        </div>
		    </footer>
		);
	}
}