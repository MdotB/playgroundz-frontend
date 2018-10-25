import React, { Component } from 'react';
import EventList from '../EventList/EventList';
import './Home.css';

class Home extends Component {

    state = {
        event: []
    }

    componentDidMount() {
        fetch('http://localhost:4004/')
            .then(res => (res.json()))
            .then(event => this.setState({ event }))
    }

    // const events = props.event;
    // const listEvents = events.map(evt => {

    render() {
        return (
            <div>
                <h1 className="upcoming-games-header">Upcoming Pickup Games</h1>
                <EventList listOfEvents={this.state.event} />
                {/* <ul>
            <li key={evt.id}>{evt.sport}{" "}{evt.locationName}</li>
                <li key={evt.id}>{" "}{evt.address.street}{evt.address.city}{evt.address.state}{evt.address.zip}</li>
                <li key={evt.id}>{" "}{evt.eventDate}</li>
                <img src={evt.locationImg} alt=""></img>
                <li key={evt.id}>{evt.age}</li>
                {/* <li key={evt.id}>{evt.sport}{" "}{evt.locationName}</li>
                <li key={evt.id}>{" "}{evt.address.street}{evt.address.city}{evt.address.state}{evt.address.zip}</li>
                <li key={evt.id}>{" "}{evt.eventDate}</li>
                <img src={evt.locationImg} alt=""></img>
                <li key={evt.id}>{evt.age}</li> */}
                {/* </ul> */}
            </div>
        )
    }
}

export default Home;