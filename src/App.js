import React from 'react';
import { Temporal } from '@js-temporal/polyfill';
import Workplace from './containers/Workplace';

// import logo from './logo.svg';
import './App.css';

function App() {
  return (
  <div className='App'>
  {/* {console.log(Temporal.ZonedDateTime.from({
    year: 2022,
    month: 7,
    day: 1,
    timeZone: 'Europe/Lisbon',
    hour:0
    })
      .until(Temporal.ZonedDateTime.from({
        year: 2022,
        month: 7,
        day: 31,
        timeZone: 'Europe/Lisbon',
        hour:24
}
           )).round({ smallestUnit: "days" }).days)} */}

  <Workplace Temporal={Temporal}/>
  <h1>{Temporal.Now.zonedDateTimeISO().toString()}</h1>
    <h1>{Temporal.ZonedDateTime.from({year: 2022, month: 8, day: 1, timeZone: 'Europe/Lisbon'}).toString()}</h1>
    <input type='datetime-local' defaultValue='00:00'></input>
    <input type='date'></input>
    <input type='time' defaultValue='00:00'></input>
  </div>
  );
}

export default App;
