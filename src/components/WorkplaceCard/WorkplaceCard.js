import { Link } from "react-router-dom";
 
const user = {
    id: '2601'
}

const WorkplaceCard = ({workplace, workplaceList ,setWorkplaceList, setNeedsUpdate, vigList}) => {
    return <Link to={`/office/workplaces/${workplace._id}`} style={{textDecoration: 'none'}} state={vigList}><div style={{width: '300px', backgroundColor: "lightgray", borderRadius: '25px', margin:'20px'}}>
        <div style={{display: 'flex', justifyContent:'center', alignItems:'center', width:'80%',height:'35px', margin:'auto'}}>
        <p style={{fontSize: '20px', fontWeight: '700', margin: "0"}}>{workplace.nome}</p>
        <button 
            style={{marginLeft: 'auto', border: 'none', backgroundColor: 'rgb(255, 114, 118)', borderRadius:'900px', height: '30px', width:'30px'}}
            
            onClick={(e)=> {
                console.log(workplaceList.filter(place => place._id !== workplace._id))
            e.preventDefault()
            fetch('http://localhost:3003/office/workplaces/delete', {
                            method: 'delete',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({     
                                id: workplace._id
                        })
            })     
            .then(data => setWorkplaceList(workplaceList.filter(place => place._id !== workplace._id)))
            // .then(fetch('http://localhost:3003/office/workplaces', {
            //                 method: 'post',
            //                 headers: {'Content-Type': 'application/json'},
            //                 //TROCAR POR USER ID
            //                 body: JSON.stringify({ userId: user.id})
            //                 })
            // .then(resp=> resp.json())
            // .then(list => setWorkplaceList(list))
            // .catch(e => console.log(e))
            // )
            .catch(e=>console.log(e))
            setNeedsUpdate(true)
            }}
            
            >&#10006;</button>
        </div>
        <p>{workplace.local.localidade}</p>
        <div><input type={'date'} defaultValue={workplace.contrato?.inicio}></input><input type={'date'} defaultValue={workplace.contrato?.fim}></input></div>
        <p>{workplace.contrato?.tipo}</p>
    </div></Link>
}

export default WorkplaceCard;