import { Link } from "react-router-dom";

const DUMMY_EVENTS = [
    { id: 'e1', title: 'some event' },
    { id: 'e2', title: 'another event' },
]
const EventPage = () => {
    return <>
        <h1>EventPage</h1>
        {DUMMY_EVENTS.map(event => <ul key={event.id}><Link to={`${event.id}`}>{event.id} =====> {event.title} </Link></ul>)}
    </>
}

export default EventPage;