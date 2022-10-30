import React from 'react';
import Signin from './components/Signin/Signin';
import Office from './containers/Office/Office';
import WorkplaceList from './components/WorkplaceList/WorkplaceList';
import Workplace from './containers//Workplace';
import OfficeNav from './components/OfficeNav/OfficeNav'
import VigilanteList from './components/VigilanteList/VigilanteList';
import { Temporal } from '@js-temporal/polyfill';
import { Link, Route, Routes } from 'react-router-dom';

// import logo from './logo.svg';
import './App.css';


function App() {
  return (
  <div className='App'>

  <nav>
    <ul>
      <li><Link to='/'>Landing</Link></li>
      <li><Link to='/signin'>Signin</Link></li>
      <li><Link to='/register'>Register</Link></li>
      <li><Link to='/home'>Home</Link></li>
      <li><Link to='/office'>Office</Link></li> 
          
    </ul>
  </nav>
  <Routes>
    <Route path='/' element={<h1>Landing Page</h1>}/>
    <Route path='/signin' element={<Signin/>}/>
    <Route path='/register' element={<h1>Register Page</h1>}/>
    <Route path='/home' element={<h1>Home Page</h1>}/>

    <Route path="/office" element={<OfficeNav/>}>
      <Route index element={<Office/>} /> 
      <Route path='workplaces' element={<div style={{display: "flex", width: '100%',justifyContent: 'center', alignItems: 'center'}}><WorkplaceList/></div>}/>
      <Route path='vigilantes' element={<VigilanteList/>}/>
      <Route path='workplaces/:id' element={<Workplace Temporal={Temporal} speed={'fast'}/>}/>
      <Route path='vigilantes/:id' element={<h1>VIGILANTE</h1>}/>
    </Route>
  </Routes>
  
  </div>
  );
}

export default App;
