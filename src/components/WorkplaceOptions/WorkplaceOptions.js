import "./WorkplaceOptions.css"
const WorkplaceOptions = ({toggleModal, options, workplace, setWorkplaceOptions, vigilantes, addDefaultVigilante, removeDefaultVigilante, changeDefaultVigRows, feriados, addFeriado, removeFeriado}) => {
    return (
        <div className="workplace-modal">
        <div className="modal-box">   
                
                <input id='workplace-name' type="text" defaultValue={workplace.nome}/>
            <div className="main-box-modal">
            <div className="week-form">
                <div className="week-day" onChange={(event)=> {
                    document.getElementById('insertHoras').style.boxShadow="0px 0px 25px 4px rgb(0, 255, 175)"}}>
                    <label>Segunda:</label>
                    <input id='segunda-inicio' type="time" defaultValue={options.segunda.inicio}/>
                    <input id='segunda-fim' type="time" defaultValue={options.segunda.fim}/>
                </div>
                <div className="week-day">
                    <label>Terça:</label>
                    <input id='terça-inicio' type="time" defaultValue={options.terça.inicio}/>
                    <input id='terça-fim' type="time" defaultValue={options.terça.fim}/>
                </div>
                <div className="week-day">
                    <label>Quarta:</label>
                    <input id='quarta-inicio' type="time" defaultValue={options.quarta.inicio}/>
                    <input id='quarta-fim' type="time" defaultValue={options.quarta.fim}/>
                </div>
                <div className="week-day">
                    <label>Quinta:</label>
                    <input id='quinta-inicio' type="time" defaultValue={options.quinta.inicio}/>
                    <input id='quinta-fim' type="time" defaultValue={options.quinta.fim}/>
                </div>
                <div className="week-day">
                    <label>Sexta:</label>
                    <input id='sexta-inicio' type="time" defaultValue={options.sexta.inicio}/>
                    <input id='sexta-fim' type="time" defaultValue={options.sexta.fim}/>
                </div>
                <div className="week-day">
                    <label>Sábado:</label>
                    <input id='sabado-inicio' type="time" defaultValue={options.sabado.inicio}/>
                    <input id='sabado-fim' type="time" defaultValue={options.sabado.fim}/>
                </div>
                <div className="week-day">
                    <label>Domingo:</label>
                    <input id='domingo-inicio' type="time" defaultValue={options.domingo.inicio}/>
                    <input id='domingo-fim' type="time" defaultValue={options.domingo.fim}/>
                </div>
                <div className="week-day">
                    <label>Feriado:</label>
                    <input id='feriado-inicio' type="time" defaultValue={options.feriado.inicio}/>
                    <input id='feriado-fim' type="time" defaultValue={options.feriado.fim}/>
                </div>
            </div>
            <div className='default-vig'>
                <div style={{marginLeft: '10px'}}>
                <input type='text' id='insertDefaultVigilanteMec' placeholder='mec'></input>
                <input type='text' id='insertDefaultVigilanteName' placeholder='nome' style={{width: "162.400px"}}></input>
                <input type='text' id='insertDefaultVigilanteRows' defaultValue='1' ></input>
                    <button
                    className='add-vig-insert'
                    onClick={() => {
                        const insertDefaultVigilanteMec = document.querySelector('#insertDefaultVigilanteMec').value;
                        const insertDefaultVigilanteName = document.querySelector('#insertDefaultVigilanteName').value;
                        const insertDefaultVigilanteRows = document.querySelector('#insertDefaultVigilanteRows').value;
                        document.getElementById('insertHoras').style.boxShadow="0px 0px 25px 4px rgb(0, 255, 175)"
                        const insertDefaultVigilanteRowsArray = [];
                        for (let i=0; i<Number(insertDefaultVigilanteRows); i++) {
                            insertDefaultVigilanteRowsArray.push(i)
                        }
                        addDefaultVigilante({
                            mec: insertDefaultVigilanteMec,
                            nome:insertDefaultVigilanteName, 
                            rows: insertDefaultVigilanteRowsArray,
                            horas: 0
                        })
                        document.querySelector('#insertDefaultVigilanteMec').value = '';
                        document.querySelector('#insertDefaultVigilanteName').value = '';
                        document.querySelector('#insertDefaultVigilanteRows').value = '';
                        }
                    }>
                    +
                    </button>
            
                </div>
                {vigilantes.map(vigilante => {
                    return <div key={vigilante.mec + vigilante.rows.length}>
                    <input type='text' className='changeMec' defaultValue={vigilante.mec}></input>
                                <input type='text' defaultValue={vigilante.nome}></input>
                                <input 
                                    type='text' 
                                    className='changeRows' 
                                    defaultValue={vigilante.rows.length} 
                                    onChange={(event)=> {
                                       changeDefaultVigRows(vigilante, event)
                                    }}>
                                </input>
                                <button
                                    onClick={()=>{
                                        document.getElementById('insertHoras').style.boxShadow="0px 0px 25px 4px rgb(0, 255, 175)"
                                        removeDefaultVigilante(vigilante)
                                        }}
                                    className='schedule-delete'>-</button>
                    </div>
                })}
                
                </div>
                </div>
                    <div style={{fontSize: '20px', fontWeight: '500', margin: '7px'}}>Feriados</div>
                <div style={{display: 'flex', flexDirection:"column", flexWrap: 'wrap', justifyContent:'center', width:"100%", height: '140px', backgroundColor: "rgba(10, 229, 229, 1)"}}>
                    {feriados.map(feriado => <div key={feriado}>
                    <input type='date' defaultValue={feriado}/>
                    <button
                                    onClick={()=>{
                                        document.getElementById('insertHoras').style.boxShadow="0px 0px 25px 4px rgb(0, 255, 175)"
                                        removeFeriado(feriado)
                                        }}
                                    className='schedule-delete'>-</button>
                    </div>)}
                    {<div>
                    <input type='date' id='addFeriado'/>
                    <button onClick={()=>{
                                        !(document.getElementById('addFeriado').value.length) ?
                                        alert("Inserir data") :
                                        document.getElementById('insertHoras').style.boxShadow="0px 0px 25px 4px rgb(0, 255, 175)"
                                        addFeriado(document.getElementById('addFeriado').value)
                                        }}
                                    className='schedule-delete'>+</button></div>}
                </div>
                <div className="workplace-modal-buttons">
                    <button onClick={()=> {
                        setWorkplaceOptions()
                        toggleModal()
                    }}>Ok</button>
                    <button onClick={()=>toggleModal()}>Cancelar</button>
            </div>
        </div>
        </div>
    )
}

export default WorkplaceOptions;