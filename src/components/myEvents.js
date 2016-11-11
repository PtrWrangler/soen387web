import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMyEvents } from '../actions/index';
import { Link } from 'react-router';

class MyEvents extends Component {
	componentWillMount() {
		this.props.fetchMyEvents();
	}

	renderEvents() {
		return this.props.events.map((event) => {
			return (

			);
		});
	}

	render() {
		return (
			<div>

			</div>
		);
	}
}

function mapStateToProps(state) {
	return { events: state.events.all }
}

export default connect(mapStateToProps, { fetchMyEvents })(MyEvents);