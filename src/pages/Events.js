import { Suspense, useEffect, useState } from "react";

import EventsList from "../components/EventsList";
import { Await, defer, json, useLoaderData } from "react-router-dom";

// function EventsPage() {
//   const data = useLoaderData();
//   if (data.isError) {
//     return <p>{data.message}</p>;
//   }
//   const events = data.events;
//   return <EventsList events={events} />;
// }

function EventsPage() {
  const { event } = useLoaderData();
  useEffect(()=>{console.log(event);},[event])
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={event}>
        {(loadedEvents) => {
        console.log(loadEvents);
         return <EventsList events={loadedEvents} />}}
      </Await>
    </Suspense>
  );
}

export default EventsPage;
//old loader without defer
export const _loader = async () => {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // setError('Fetching events failed.');
    // return {isError : true, message :'Could not fetch events.'}
    // throw { message: "Could not fetch events." };
    // throw new Response(JSON.stringify({message:'Could not fetch data',status:500}));
    throw json({ message: "Could not fetch data" }, { status: 500 });
  } else {
    // const resData = await response.json();
    return response;
  }
};
// end

//defer function
async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    throw json({ message: "Could not fetch data" }, { status: 500 });
  } else {
    const { event } = await response.json();
    console.log("sdvsvaskljvlkasn sj jas a oasnlnal");
    return event;
  }
}

export const loader = () => {
  return defer({event:loadEvents()})
};