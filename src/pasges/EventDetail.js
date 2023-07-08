import { Link, useParams } from "react-router-dom";

const EventDetailPage = () => {
    const param = useParams()
    return <>
        <h1>EventDetailPage</h1>
        <p>event {param.eventId}</p>
        <Link to={'..'} relative="path">Back</Link>
    </>
}

export default EventDetailPage;