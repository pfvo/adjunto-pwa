import './VigList.css'

const VigList = ({vigilantes, addVigilanteSchedule, removeVigilanteSchedule, changeVigRows, vigList}) => {
    return (
        <div className="vigList">
            <p>VigList</p>
            <div>
            {/* <input type='text' id='insertVigilanteMec' placeholder='mec'></input> */}
            <input type="text" list="vigmec" id='insertVigilanteMec' placeholder="mec" onChange={(event)=> {
                vigList.map(vig=> {
                    if (vig.mec === event.target.value) {
                        document.querySelector('#insertVigilanteName').value = vig.nome
                }})}}/>
            <input type='text' id='insertVigilanteName' list="programmingLanguages" placeholder='nome'></input>
            <input type='text' id='insertVigilanteRows' defaultValue='1' ></input>
            <datalist id="vigmec">
                {vigList?.map(vig => <option key={vig._id} value={vig.mec}>{vig.nome}</option>)}
                <option value="Objective C">Objective C</option>
            </datalist>
            
            
                <button
                className='add-vig-insert'
                onClick={() => {
                    const insertVigilanteMec = document.querySelector('#insertVigilanteMec').value;
                    const insertVigilanteName = document.querySelector('#insertVigilanteName').value;
                    const insertVigilanteRows = document.querySelector('#insertVigilanteRows').value;
                    document.getElementById('insertHoras').style.boxShadow="0px 0px 25px 4px rgb(0, 255, 175)"
                    const insertVigilanteRowsArray = [];
                    for (let i=0; i<Number(insertVigilanteRows); i++) {
                        insertVigilanteRowsArray.push(i)
                    }
                    addVigilanteSchedule({
                        mec: insertVigilanteMec,
                        nome:insertVigilanteName, 
                        rows: insertVigilanteRowsArray,
                        horas: 0
                    })
                    document.querySelector('#insertVigilanteMec').value = '';
                    document.querySelector('#insertVigilanteName').value = '';
                    document.querySelector('#insertVigilanteRows').value = '1';
                    }
                }>
                +
                </button>
         
            </div>
            <div className='vigList-sub'>
                {vigilantes?.map(vigilante => { 
                    return(
                        <div className='single-vig' key={vigilante.mec + vigilante.rows.length}>
                            <input type='text' className='changeMec' defaultValue={vigilante.mec}></input>
                            <input type='text' className='changeName' defaultValue={vigilante.nome}></input>
                            <input 
                                type='text' 
                                className='changeRows' 
                                defaultValue={vigilante.rows.length} 
                                onChange={(event)=> {
                                    changeVigRows(vigilante, event)
                                }}>
                            </input>
                            <button
                                onClick={()=>{
                                    document.getElementById('insertHoras').style.boxShadow="0px 0px 25px 4px rgb(0, 255, 175)"
                                    removeVigilanteSchedule(vigilante)
                                    }}
                                className='schedule-delete'>-</button>
                        </div>
                    )
                })
                }
    
            </div>       
        </div>
     )
}

export default VigList;