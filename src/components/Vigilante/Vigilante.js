import Modal from "../Modal/Modal"
import InsertVigFardamento from "../InsertVigFardamento/InsertVigFardamento"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import './Vigilante.css'

const user = {roles: ['vigilante', 'chefe', 'supervisor']}

const Vigilante = ({Temporal}) => {
    const [vigilante, setVigilante] = useState([])
    const [supervisorDisabled, setSupervisorDisabled] = useState(true)
    const [chefeDisabled, setChefeDisabled] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [hasError, setHasError] = useState(false)
    const vigList = useLocation().state
    const navigate = useNavigate();

    useEffect(()=> {
        const controller = new AbortController();
        const signal = controller.signal;
        fetch(`http://localhost:3003/office/vigilantes/${window.location.href.split("/")[window.location.href.split("/").length - 1]}`, signal)
        .then(response=>response.json())
        .then(data => setVigilante(data[0]))
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
}, [])

console.log(vigilante)


    return (
        <>
        {hasError ? <h1>ERRRRORR NEED TO MAKE COMPONENT</h1> :
        <>
            {isModalOpen &&
            <Modal>
            <InsertVigFardamento isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} vigilante={vigilante} setVigilante={setVigilante}/>
                {/* <InsertWorkplaceModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} workplaceList={workplaceList} setWorkplaceList={setWorkplaceList}/> */}
            </Modal>}
        <div style={{width: "100%", display:'flex', flexWrap:'wrap', justifyContent:"center"}}>

        <div style={{width: "90%", display: 'flex', justifyContent: "center", justifySelf: 'center', marginBottom:"-10px"}}>
        <button 
            className="lock-symbol"
            onClick={()=> {
                if (user.roles.includes('supervisor')) setSupervisorDisabled(!supervisorDisabled)
                setChefeDisabled(!chefeDisabled) 
                console.log('chefe', chefeDisabled)      
                console.log('supervisor', supervisorDisabled)      
                }}
            >{chefeDisabled ? "\uD83D\uDD12" : "\uD83D\uDD13" }</button>
        </div>
        <div style={{width: '90%', margin:'auto'}}>
        <div className='vig-container'>
        <h3>Informações Basicas</h3>
            <label>Mec:</label>
            <input type='text' 
                defaultValue={vigilante.mec} 
                style={{width: '40px'}} 
                className={supervisorDisabled ? null : 'inputsEnabled'} 
                disabled={supervisorDisabled}
                onChange={(event)=>setVigilante({...vigilante, mec:event.target.value})}
                />
            <label>Nome:</label>
            <input 
                type='text' 
                defaultValue={vigilante.nome}
                className={chefeDisabled ? null : 'inputsEnabled'} 
                disabled={chefeDisabled}
                onChange={(event)=>setVigilante({...vigilante, nome:event.target.value})}
                />
            <label>Tel:</label>
            <input 
                type='text' 
                defaultValue={vigilante.telemovel} 
                style={{width: '100px'}}
                className={chefeDisabled ? null : 'inputsEnabled'} 
                disabled={chefeDisabled}
                onChange={(event)=>setVigilante({...vigilante, telemovel:event.target.value})}
                />
            <label>Email:</label>
            <input 
                type='text' 
                defaultValue={vigilante.email} 
                style={{width: '250px'}}
                className={chefeDisabled ? null : 'inputsEnabled'} 
                disabled={chefeDisabled}
                onChange={(event)=>setVigilante({...vigilante, email:event.target.value})}
                />
            <label>Aniversário:</label>
            <input 
                type='date' 
                defaultValue={vigilante.aniversario}
                className={chefeDisabled ? null : 'inputsEnabled'} 
                disabled={chefeDisabled}
                onChange={(event)=>setVigilante({...vigilante, aniversario:event.target.value})}
                />
        </div>
            <div className='vig-container'>
            <h3>Contrato</h3>
            <label>Cargo:</label>
                <select 
                value={vigilante?.roles?.[vigilante?.roles?.length -1]}
                className={supervisorDisabled ? null : 'inputsEnabled'} 
                disabled={supervisorDisabled}
                onChange={(event)=> event.target.value === "vigilante" 
                    ? setVigilante({...vigilante, roles: ["vigilante"]})
                    : event.target.value === "chefe"  
                    ? setVigilante({...vigilante, roles: ['vigilante', 'chefe']})
                    : setVigilante({...vigilante, roles: ['vigilante', 'chefe', 'supervisor']})}
                >
                    <option value='vigilante'>Vigilante</option>
                    <option value='chefe'>Chefe</option>
                    <option value='supervisor'>Supervisor</option>
                </select>    
                <label>Tipo:</label>
                <input 
                type='text' 
                defaultValue={vigilante.contrato?.tipo}
                className={chefeDisabled ? null : 'inputsEnabled'} 
                disabled={chefeDisabled}
                onChange={(event)=>setVigilante({...vigilante, contrato: {...vigilante.contrato, tipo: event.target.value}})}
                />
                <label>Inicio:</label>
                <input 
                    type='date' 
                    defaultValue={vigilante.contrato?.inicio}
                    className={chefeDisabled ? null : 'inputsEnabled'} 
                    disabled={chefeDisabled}
                    onChange={(event)=>setVigilante({...vigilante, contrato: {...vigilante.contrato, inicio: event.target.value}})}
                    />
                <label>Fim:</label>
                <input 
                    type='date' 
                    defaultValue={vigilante.contrato?.fim}
                    className={chefeDisabled ? null : 'inputsEnabled'} 
                    disabled={chefeDisabled}
                    onChange={(event)=>setVigilante({...vigilante, contrato: {...vigilante.contrato, fim: event.target.value}})}
                    />
                <label>Chefia:</label>
                <select 
                    value={vigilante.chefia?._id} 
                    onChange={(event)=> setVigilante({...vigilante, chefia: event.target.value})}
                    className={supervisorDisabled ? null : 'inputsEnabled'} 
                    disabled={supervisorDisabled}>
                    <option value={vigilante.chefia?._id}>{vigilante.chefia?.nome}</option>
                    {
                        vigList.filter(vig => vig?.roles.includes('chefe') && vig?._id !== vigilante.chefia?._id)
                        .map(item => <option key={item._id} id={item._id} value={item._id}>{item.nome}</option>)
                    }
                </select>
            </div>
            <div className='vig-container'>
            <h3>Morada</h3>
                <label>Rua:</label>
                <input 
                    type='text' 
                    defaultValue={vigilante.morada?.rua}
                    className={chefeDisabled ? null : 'inputsEnabled'} 
                    disabled={chefeDisabled}
                    onChange={(event)=>setVigilante({...vigilante, morada: {...vigilante.morada, rua: event.target.value}})}
                    />
                <label>Postal:</label>
                <input 
                    type='text' 
                    defaultValue={vigilante.morada?.postal} 
                    style={{width: '80px'}}
                    className={chefeDisabled ? null : 'inputsEnabled'} 
                    disabled={chefeDisabled}
                    onChange={(event)=>setVigilante({...vigilante, morada: {...vigilante.morada, postal: event.target.value}})}
                    />
                <label>Cidade:</label>
                <input 
                    type='text' 
                    defaultValue={vigilante.morada?.cidade} 
                    style={{width: '150px'}}
                    className={chefeDisabled ? null : 'inputsEnabled'} 
                    disabled={chefeDisabled}
                    onChange={(event)=>setVigilante({...vigilante, morada: {...vigilante.morada, cidade: event.target.value}})}
                    />
            </div>
            <div className='vig-container'>
            <h3>Inserir Ausencias</h3>
                <label>Tipo:</label>
                <select defaultValue='ferias' id='ftipo'>
                    <option value='ferias'>Férias</option>
                    <option value='baixa'>Baixa</option>
                    <option value='falta'>Falta</option>
                    <option value='outro'>Outro</option>
                </select>
                <label>Inicio:</label>
                <input type='date' id='finicio'></input>
                <label>Fim:</label>
                <input type='date' id='ffim'></input>
                <label>Obs:</label>
                <input type='text' id='fobs' placeholder={`Ex: Férias de ${new Date().getFullYear()}`}></input>
                <button style={{marginLeft: '10px'}} className='insert-ausencia' onClick={()=> {
                    const ftipo = document.getElementById('ftipo').value
                    const finicio = document.getElementById('finicio').value
                    const ffim = document.getElementById('ffim').value
                    const fobs = document.getElementById('fobs').value

                    //USAR TEMPORAL PARA VERIFICAR QUE AS DATAS NAO COINCIDEM!
                    //USAR TEMPORAL PARA VERIFICAR QUE AS DATAS NAO COINCIDEM!
                    //USAR TEMPORAL PARA VERIFICAR QUE AS DATAS NAO COINCIDEM!
                    !finicio || !ffim ? alert('Por favor preencha as datas') :
                    vigilante.ausencias.filter(ausencia => ausencia.inicio === finicio || ausencia.fim === ffim).length
                    ? alert('Data já inserida!')
                    : setVigilante({...vigilante, ausencias: [...vigilante.ausencias, {tipo: ftipo, inicio: finicio, fim: ffim, obs:fobs}]})
                    document.getElementById('finicio').value=''
                    document.getElementById('finicio').value=''
                    document.getElementById('ffim').value=''
                    document.getElementById('fobs').value=''
                }}>Inserir</button>
            </div>
            <div className='vig-container' style={{display:'flex', justifyContent: 'space-around', alignItems:'center'}}>
            <div style={{width:'50%'}}>
            <h3>Ausencias</h3>
                {vigilante?.ausencias?.map((ausencia, i) => 
                <div key={i} style={{display: 'flex', justifyContent: 'center'}}>
                    <input type='date' defaultValue={ausencia.inicio}></input>
                    <input type='date' defaultValue={ausencia.fim}></input>
                    <p style={{margin:'0', padding:'0', width: "60%", border: '1px solid black'}}>{ausencia.obs}</p>
                    <button onClick={()=>setVigilante({...vigilante, ausencias: vigilante?.ausencias?.filter((item, index) => index !== i)})}>x</button>
                </div>
                )}
            </div>
            <div style={{width:'30%', display: 'flex', justifyContent:'center', flexWrap:'wrap'}}>
            <h3 style={{width: "100%"}}>Notas</h3>
            <textarea 
                defaultValue={vigilante.notas} 
                onChange={(event)=> setVigilante({vigilante, notas: event.target.value})}
                style={{width: '100%', height: '100px', backgroundColor: 'transparent', overflowY:'scroll'}}>
            </textarea>
            </div>
            <button 
                style={{backgroundColor: 'transparent', marginTop:'10px', height: '50px', width:'150px', borderRadius:'50px', fontSize:'15px', fontWeight: '600'}}
                onClick={()=>setIsModalOpen(!isModalOpen)}>
                Fardamento
            </button>
            </div>
            <div className='vig-container' style={{display:'flex', justifyContent: 'center', alignItems:'center'}}>
                <button 
                    style={{backgroundColor: 'transparent', marginTop:'10px', height: '50px', width:'150px', borderRadius:'50px', fontSize:'15px', fontWeight: '600'}}
                    onClick={() => {
                    fetch(`http://localhost:3003/office/vigilantes/${vigilante._id}`, {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                                vigilante
                            })
                    })
                    .then(()=>navigate("/office/vigilantes", {replace: true}))
                    .catch(setHasError(true))
                    }}>Ok</button>
                <button
                    style={{backgroundColor: 'transparent', marginTop:'10px', height: '50px', width:'150px', borderRadius:'50px', fontSize:'15px', fontWeight: '600'}}
                    onClick={() => {navigate("/office/vigilantes", {replace: true})}}
                    >Cancelar</button>
            </div>
        </div>
        </div>
        </>
        }
        </>
    )
}


export default Vigilante;