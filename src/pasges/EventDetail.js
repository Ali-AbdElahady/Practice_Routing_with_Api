import { Link, json, useRouteLoaderData, useParams } from "react-router-dom";
import EventItem from '../components/EventItem'

const EventDetailPage = () => {
    const param = useParams()
    const data = useRouteLoaderData("event-detail");
    
    console.log(data);
    return <>
        <h1>EventDetailPage</h1>
        <EventItem event={data.event}/>
        <Link to={'..'} relative="path">Back</Link>
    </>
}

export default EventDetailPage;

export const loader = async ({request,params}) =>{
    const id = params.eventId;
    const response = await fetch(`http://localhost:8080/events/${id}`);
    if(!response.ok){
        return json({message:'Could not fetch details for selected event.'},{status:500})
    }else{
        // const d = await response.json()
        // console.log(d);
        return response;
    }
}