import { useEffect, useState } from "react";
import InsertVigModal from "../InsertVigModal/InsertVigModal";
import Modal from "../Modal/Modal";
import { Link } from "react-router-dom";

const VigilanteList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [vigList, setVigList] = useState([])
    const [hasError, setHasError] = useState(false)
    const [needsUpdate, setNeedsUpdate] = useState(false)

    useEffect(()=> {
        const controller = new AbortController();
        const signal = controller.signal;
        fetch('http://localhost:3003/office/vigilantes', {
        method: 'get',
        headers: {'Content-Type': 'application/json'},
        signal
        })
        .then(resp=> resp.json())
        .then(list => setVigList(list))
        .then(()=>setNeedsUpdate(false))
        .catch(e => {
            if(e.name === 'AbortError') {
                return
            } else {
                setHasError(true) 
            }
        })   
        return () => {
        controller.abort();
        }
    }, [needsUpdate])


       return (
        <>
        { hasError ? <h1>ERROR, NEED TO MAKE ERROR COMPONENT</h1> :
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap'}}>
            {isModalOpen &&
            <Modal>
                <InsertVigModal setIsModalOpen={setIsModalOpen} vigList={vigList} setVigList={setVigList}/>
            </Modal>}
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: "center", width: '80%'}}>
            <div style={{display: 'flex', width: '300px', height: '130px', boxShadow:"2px 2px 15px 1px gray", borderRadius:'20px', backgroundColor: "trasnparent", margin:'20px', padding: 'none', justifyContent: 'center', alignItems: "center"}}
            onClick={()=>setIsModalOpen(!isModalOpen)}>
            <div style={{fontSize: "6em", marginTop:'-20px', padding: 'none'}}>+</div>
            </div>
            </div>
            <div style={{width: '80%', boxShadow: "5px 5px 15px grey", borderRadius: '20px', padding: '15px 60px', height: '350px', overflowY: 'scroll'}}>
        {vigList.map(vigilante => <div key={vigilante._id} style={{height: '30px'}}>
        <input type='text' defaultValue={vigilante.mec} disabled></input>
        <input type='text' defaultValue={vigilante.nome} disabled></input>
        <input type='text' defaultValue={vigilante.email} disabled></input>
        <input type='text' defaultValue={vigilante.telemovel} disabled></input>
        <input type='text' defaultValue={vigilante.chefia?.nome} disabled></input>
        <Link to={`/office/vigilantes/${vigilante._id}`} state={vigList}><button style={{border: 'none', backgroundColor: 'none', borderRadius:'900px', height: '25px', width:'25px'}}>
            &#9998;</button></Link>
        <button 
            style={{border: 'none', backgroundColor: 'rgb(255, 114, 118)', borderRadius:'900px', height: '25px', width:'25px'}}
            onClick={(e)=> {
            e.preventDefault()
            fetch('http://localhost:3003/office/vigilantes/delete', {
                            method: 'delete',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({     
                                id: vigilante._id
                        })
            })     
            .then(data => setVigList(prevState => prevState.filter(vig => vig._id !== vigilante._id)))
            //  .then(fetch('http://localhost:3003/office/vigilantes', {
            //                  method: 'post',
            //                  headers: {'Content-Type': 'application/json'},
            //                  //TROCAR POR USER ID
            //                  body: JSON.stringify({ userId: user.id})
            //                  })
            //  .then(resp=> resp.json())
            //  .then(list => setVigList(list))
            //  .catch(e => console.log(e))
            //  )
            .catch(e=>console.log(e))
            setNeedsUpdate(true)
            }}
            
            >&#10006;</button>
        </div>)
        }
        </div>
        </div>
        }
        </>
    )
};

export default VigilanteList;