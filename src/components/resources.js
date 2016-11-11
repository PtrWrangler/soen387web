import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createEvent, fetchRooms, fetchUsers, fetchInventory } from '../actions/index';
import DateTime from 'react-datetime';

class Resources extends Component {
	static contextTypes = {
		router: PropTypes.object
	};

	componentWillMount() {
		this.props.fetchRooms();
		this.props.fetchUsers();
		this.props.fetchInventory();
	}

	renderRooms() {
		return this.props.rooms.map((room) => {
			return (
				<option className="form-control" key={room.type}>{room.type}</option>
			);
		});
	}

	renderUsers() {
		return this.props.users.map((user) => {
			return (
				<option className="form-control" key={user.type}>{user.type}</option>
			);
		});
	}

	renderInventory() {
		return this.props.inventory.map((inven) => {
			return (
				<option className="form-control" key={inven.type}>{inven.type}</option>
			);
		});
	}

	onSubmit(props) {
		this.props.createEvent(props).then(() => {
			this.context.router.push('/myEvents');
		});
	}

	render() {
		const { fields: { name, startTime, endTime, resourceName, resourceId }, handleSubmit} = this.props;

		return(
			<div style={{paddingTop:60}}>
		        <div className="container">
		            <div className="row">
		                <div className="col-lg-12">

		                    {/*} Create a New Event Form */}
							<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
							    <div className={`form-group ${name.touched && name.invalid ? 'has-danger' : ''}`}>
									<div><label>Event Info</label><br/></div>
									<label>Name:</label>
									<input type="text" className="form-control" {...name} />
								</div>
								{/*<div className="form-group">
									<label for="eventURL">URL:</label>
									<input type="text" className="form-control" id="eventURL" placeholder="Optional" />
								</div>*/}

							    <br />
							    <div className={`form-group ${startTime.touched && startTime.invalid ? 'has-danger' : ''}`}>
							        <label>Start Time:</label>
							        <DateTime />
							        {/*<input type='text' className="form-control" {...startTime}/>*/}
							    </div>
							    <div className={`form-group ${endTime.touched && endTime.invalid ? 'has-danger' : ''}`}>
							    	<label>End Time:</label>
							    	<DateTime />
							        {/*<input type='text' className="form-control" {...endTime}/>*/}
							    </div>
							    
							    
							        
							    {/*<span style={{color:red}}>Dev Note: </span>start/end times chosen first, then available resources displayed*/}
							    <br />  <br />  
							    <div className="lst-resource">
								    <label>Rooms to Reserve:</label><br />
								    <select className="form-group list-wrapper" {...resourceName} >
								    	{/*{this.renderRooms()}*/}
								    </select>
							    </div>
							    <div className="lst-resource">
								    <label>Tools to Reserve:</label><br />
									<select className="form-group list-wrapper" {...resourceName}>
										{/*{this.renderInventory()}*/}
								    </select>
							    </div>
							    <div className="lst-resource">
								    <label>People to Book</label><br />
								    <select className="form-group list-wrapper" {...resourceName}>
								    	{/*{this.renderUsers()}*/}
								    </select>
							    </div>
							  	<button type="submit" className="btn btn-default btn-submit" id="submit_button">Submit</button>
							  	<button type="reset" className="btn btn-default">Reset</button>
							  	{/*<button type="button" className="btn btn-default btn-delete">Delete</button>*/}
							    
							</form>

		                </div>
		            </div>

		        </div>
		        {/* /.container */}

		    </div>
		);
	}
}

function mapStateToProps(state) {
	return { rooms: state.rooms.all, users: state.users.all, inventories: state.inventories.all }
}


function validate(values) {
	const errors = {};

	if (!values.name) {
		errors.name = "Enter a name for the event";
	}

	if (!values.startTime) {
		errors.startTime = "Enter a start time";
	}

	if(!values.endTime) {
		errors.endTime = "Enter an end time";
	}

	return errors;
}

export default reduxForm({
	form: 'EventCreation',
	fields:['name', 'startTime', 'endTime', 'resourceName', 'resourceId'],
	validate
}, mapStateToProps, { createEvent })(Resources);

























