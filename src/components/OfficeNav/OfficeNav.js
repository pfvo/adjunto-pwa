import { Link, Outlet } from "react-router-dom"

const OfficeNav = () => {
    return (
        <>
        <Link to='/office/workplaces'>Office-wokplaceslist</Link>
        <Link to='/office/workplaces/:id'>Workplace(SO TESTES!)</Link>
        <Link to='/office/vigilantes'>Office-vigilanteslist</Link>
        <Link to='/office/vigilantes/:id'>vigilante(SO TESTES!)</Link>
        <Link to='/office/requests'>Office-RequestList</Link>
        <Link to='/office/requests/:id'>Request(SO TESTES)</Link>
        <br></br>
        <input type='text' onChange={(event)=>console.log(event.target.value)} defaultValue='addWorkplace'></input>
        <input type='text' onChange={(event)=>console.log(event.target.value)} defaultValue='addVigilante'></input>
        <input type='text' onChange={(event)=>console.log(event.target.value)} defaultValue='addRequest'></input>
        <Outlet/>
        </>
    )
}

export default OfficeNav