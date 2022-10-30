import { useEffect, useState } from "react";
import WorkplaceCard from "../WorkplaceCard/WorkplaceCard"
import Modal from "../Modal/Modal";
import InsertWorkplaceModal from "../InsertWorkplaceModal/InsertWorkplaceModal";

const user = {id: '2601'}
const WorkplaceList = () => {
    const [workplaceList, setWorkplaceList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [needsUpdate, setNeedsUpdate] = useState (false)
    const [hasError, setHasError] = useState(false)

    useEffect(()=> {
        const controller = new AbortController();
        const signal = controller.signal;
       fetch('http://localhost:3003/office/workplaces', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ userId: user.id}),
        signal
       })
       .then(resp=> resp.json())
       .then(list => setWorkplaceList(list))
       .then(()=> setNeedsUpdate(false))
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
    },[needsUpdate])

    return ( 
        <>
        {hasError ? <h1>ERRRRORR NEED TO MAKE COMPONENT Error Loading Workplaces</h1> :
        <>
            {isModalOpen &&
            <Modal>
                <InsertWorkplaceModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} workplaceList={workplaceList} setWorkplaceList={setWorkplaceList}/>
            </Modal>}
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: "center", width: '80%'}}>
            <div style={{display: 'flex', width: '300px', height: '145px', boxShadow:"2px 2px 15px 1px gray", borderRadius:'20px', backgroundColor: "trasnparent", margin:'20px', padding: 'none', justifyContent: 'center', alignItems: "center"}}
            onClick={()=>setIsModalOpen(!isModalOpen)}>
            <div style={{fontSize: "6em", marginTop:'-20px', padding: 'none'}}>+</div>
        </div>
        {workplaceList.map(workplace =><WorkplaceCard key={workplace._id} workplace={workplace} workplaceList={workplaceList} setWorkplaceList={setWorkplaceList} setNeedsUpdate={setNeedsUpdate}/>)}
        </div>
        </>
        }
    </>
)}

export default WorkplaceList;