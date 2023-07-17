import {
  Link,
  json,
  useRouteLoaderData,
  useParams,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

const EventDetailPage = () => {
  const param = useParams();
  const {event,events} = useRouteLoaderData("event-detail");

  return (
    <>
      <h1>EventDetailPage</h1>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadEvent) => <EventItem event={loadEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>
          {(loadEvents) => <EventsList events={loadEvents} />}
        </Await>
      </Suspense>
      <p style={{ textAlign: "center" }}>
        <Link style={{ padding: '10px' ,border : '3px solid white',borderRadius:'10px'}} to={".."} relative="path">
          Back
        </Link>
      </p>
    </>
  );
};

export default EventDetailPage;

export const loader = async ({ request, params }) => {
  const id = params.eventId;
  
  return defer({
    event : await loadEvent(id),
    events : loadEvents()
  })
};

export const action = async ({ request, params }) => {
  const eventId = params.eventId;
  console.log(eventId);
  const response = await fetch(`http://localhost:8080/events/${eventId}`, {
    method: request.method,
  });
  console.log(response);
  if (!response.ok) {
    throw json({ message: "Could not delete event." }, { status: 500 });
  }
  return redirect("..");
};

async function loadEvent(id){
  const response = await fetch(`http://localhost:8080/events/${id}`);
  if (!response.ok) {
    throw json(
      { message: "Could not fetch details for selected event." },
      { status: 500 }
    );
  } else {
    const resData = await response.json()
    return resData.event;
  }
} 

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw json({ message: "Could not fetch data" }, { status: 500 });
  } else {
    const { events } = await response.json();
    console.log("sdvsvaskljvlkasn sj jas a oasnlnal");
    return events;
  }
}
