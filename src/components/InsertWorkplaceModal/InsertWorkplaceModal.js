import './InsertWorkplaceModal.css'

const user = {id: '2601'}

const InsertWorkplaceModal = ({isModalOpen, setIsModalOpen, workplaceList, setWorkplaceList}) => {
    return <div className="insertworkplace-modal">
        <div className='modal-box'>
        <h1>Inserir Novo Posto</h1>
            <div className='workplace-form' style={{width: "80%", display: 'flex', flexWrap: 'wrap', justifyContent: 'center', fontSize: '1.5em'}}>
                <label style={{width: "30%"}}>Nome</label>
                <input id='insertWorkplace-nome' type='text' placeholder='Ex: Hotel da Praia' style={{width: "58%",marginLeft: "auto"}}></input>
                <br></br>
                <label style={{width: "30%"}}>Morada</label>
                <input id='insertWorkplace-morada' type='text' placeholder='Ex: Avenida Dna. Inês de Castro 1' style={{width: "58%",marginLeft: "auto"}}></input>
                <br></br>
                <label style={{width: "30%"}}>Postal</label>
                <input id='insertWorkplace-postal' type='text' placeholder='Ex: 2510-451' style={{width: "58%",marginLeft: "auto"}}></input>
                <br></br>
                <label style={{width: "30%"}}>Localidade</label>
                <input id='insertWorkplace-localidade' type='text' placeholder='Ex: Vale de Janelas' style={{width: "58%",marginLeft: "auto"}}></input>
                <br></br>
                <label style={{width: "30%"}}>Distrito</label>
                <input id='insertWorkplace-distrito' type='text' placeholder='Ex: Leiria' style={{width: "58%",marginLeft: "auto"}}></input>
                <br></br>
                <label style={{width: "30%"}}>Tipo</label>
                <input type='text' id='insertWorkplace-tipo' placeholder='Ex: TDA' style={{width: "58%",marginLeft: "auto"}}></input>
                <br></br>
                <div style={{width: "100%", display: 'flex'}}>
                <label style={{width: "30%", marginRight: "auto"}}>Contrato</label>
                <div style={{width: "60%", padding:"none", margin:'0', display: 'flex'}}>
                    <input type='date' id='insertWorkplace-inicio' style={{width: "48%", marginLeft: "auto"}}></input>
                    <input type='date' id='insertWorkplace-fim' style={{width: "48%", marginLeft: "auto"}}></input>
                </div>
                </div>
            </div>
            <div className="workplace-modal-buttons">
                <button onClick={()=>{
                    //NOTAS: CONDICIONAIS DATA FIM > DATA INICIO, REQUIRED CHECK, ETC
                    const nome = document.getElementById('insertWorkplace-nome').value
                    const morada = document.getElementById('insertWorkplace-morada').value
                    const postal = document.getElementById('insertWorkplace-postal').value
                    const localidade = document.getElementById('insertWorkplace-localidade').value
                    const distrito = document.getElementById('insertWorkplace-distrito').value
                    const tipo = document.getElementById('insertWorkplace-tipo').value
                    const inicio = document.getElementById('insertWorkplace-inicio').value
                    const fim = document.getElementById('insertWorkplace-fim').value
                    nome && localidade ? (
                        fetch('http://localhost:3003/office/workplaces/insert', {
                            method: 'post',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({     
                                nome,
                                local: {
                                    morada,
                                    postal,
                                    localidade,
                                    distrito,
                                },
                                chefia: ['2601'],
                                contrato: {
                                    tipo,
                                    inicio,
                                    fim
                                } 
                                })
                        })
                        .then(response => response.json())
                        .then (data => setWorkplaceList([...workplaceList, data]))
                        .then(setIsModalOpen(!isModalOpen))
                        .catch(e=>console.log(e))
                    ) : alert("something went wrong")
                    }}>Ok</button>
                <button onClick={()=>setIsModalOpen(!isModalOpen)}>Cancel</button>
            </div>
        </div>
    </div>
        
}

export default InsertWorkplaceModal;