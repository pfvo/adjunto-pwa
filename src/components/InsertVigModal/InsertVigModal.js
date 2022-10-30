import './InsertVigModal.css'

const InsertVigModal = ({ setIsModalOpen, vigList, setVigList }) => {
    return <div className='insertvig-modal'>
        <div style={{ backgroundColor:'rgb(43, 237, 205)', width: '450px', display:'flex', flexWrap:'wrap', justifyContent: 'center', fontWeight: '500', fontSize: '1.1em' }}>
            <p style={{fontSize: "1.3em"}}>Inserir Vigilante</p>
            <div style={{width: '80%', display:'flex'}}>
            <label style={{marginRight:'auto'}}>Mecanográfico:*</label>
            <input style={{width: '200px'}} type='text' placeholder='Ex: 0001' id='insertVigilante-mec'></input>
            </div>
            <div style={{width: '80%', display:'flex'}}>
            <label style={{marginRight:'auto'}}>Nome:*</label>
            <input style={{width: '200px'}} type='text' placeholder='Ex: Joaquim Carlos' id='insertVigilante-nome'></input>
            </div>
            <div style={{width: '80%', display:'flex'}}>
            <label style={{marginRight:'auto'}}>Telemóvel:*</label>
            <input style={{width: '200px'}} type='text' placeholder='Ex: 912345678' id='insertVigilante-telemovel'></input>
            </div>
            <div style={{width: '80%', display:'flex'}}>
            <label style={{marginRight:'auto'}}>Email:*</label>
            <input style={{width: '200px'}} type='text' placeholder='Ex: exemplo@exemplo.com' id='insertVigilante-email'></input>
            </div>
            <div style={{width: '80%', display:'flex'}}>
            <label style={{marginRight:'auto'}}>Aniversario:</label>
            <input style={{width: '203px'}} type='date' id='insertVigilante-aniversario'></input>
            </div>
            <div style={{width: '80%', display:'flex'}}>
            <label style={{marginRight:'auto'}}>Morada:</label>
            <input style={{width: '200px'}} type='text' placeholder='Ex: Rua de Gil Eanes' id='insertVigilante-rua'></input>
            </div>
            <div style={{width: '80%', display:'flex'}}>
            <label style={{marginRight:'auto'}}>Código Postal:</label>
            <input style={{width: '200px'}} type='text' placeholder='Ex: 2050-123' id='insertVigilante-postal'></input>
            </div>
            <div style={{width: '80%', display:'flex'}}>
            <label style={{marginRight:'auto'}}>Cidade:</label>
            <input style={{width: '200px'}} type='text' placeholder='Ex: Lisboa' id='insertVigilante-cidade'></input>
            </div>
            <div style={{width: '80%', display:'flex'}}>
            <label style={{marginRight:'auto'}}>Tipo de Contrato:</label>
            <input style={{width: '200px'}} type='text' placeholder='Tipo Contrato' id='insertVigilante-tipo'></input>
            </div>
            <div style={{width: '80%', display:'flex'}}>
            <label style={{marginRight:'auto'}}>Data Contrato:</label>
            <input type='date' style={{width: '99px'}} id='insertVigilante-inicio'></input>
            <input type='date' style={{width: '99px'}} id='insertVigilante-fim'></input>
            </div>
             {/* <div style={{width: '80%', display:'flex'}}>
            <label style={{marginRight:'auto'}}>Role:</label>
            <select id='insertVigilante-role' style={{width: '208px'}}>
                <option value='vigilante'>Vigilante</option>
                <option value='chefe'>Responsável de Posto</option>
                <option value='supervisor'>Supervisor</option>
            </select>
            </div> */}
            {/* <div style={{width: '80%', display:'flex'}}>
            <label style={{marginRight:'auto'}}>Chefia:</label>
            <select id='insertVigilante-chefia' style={{width: '208px'}}>
                <option value='N/A'>N/A</option>
                {
                    vigList.filter(vig => vig?.roles.includes('chefe'))
                    .map(item => <option key={item._id} id={item._id} ivalue={item._id}>{item.nome}</option>)
                }
            </select>
            </div> */}
            <div style={{width: '80%', height:'80px', margin:'10px, 0 10px, 0', display:'flex', justifyContent: 'space-around', alignItems:'center'}}>
            <button style={{width: '100px', height: '40px'}} 
            onClick={()=> {
                    const mec = document.getElementById('insertVigilante-mec').value
                    const nome = document.getElementById('insertVigilante-nome').value
                    const telemovel = document.getElementById('insertVigilante-telemovel').value
                    const email = document.getElementById('insertVigilante-email').value
                    const aniversario = document.getElementById('insertVigilante-aniversario').value
                    const rua = document.getElementById('insertVigilante-rua').value
                    const postal = document.getElementById('insertVigilante-postal').value
                    const cidade = document.getElementById('insertVigilante-cidade').value
                    const tipo = document.getElementById('insertVigilante-tipo').value
                    const inicio = document.getElementById('insertVigilante-inicio').value
                    const fim = document.getElementById('insertVigilante-fim').value
                    // const roles = document.getElementById('insertVigilante-role').value
                    // const chefia = document.getElementById('insertVigilante-chefia').value
                    nome && mec && telemovel&& email ? (
                        fetch('http://localhost:3003/office/vigilantes/insert', {
                            method: 'post',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({     
                                mec,
                                nome,
                                telemovel,
                                email,
                                aniversario,
                                morada : {rua, postal, cidade},
                                contrato : {tipo, inicio, fim},
                                })
                        })
                        .then(response => response.json())
                        .then(data => setVigList([...vigList, data]))
                        .catch(console.log)
                    ) : alert("something went wrong")

                    setIsModalOpen(false)
                    }}>Inserir</button>
            <button style={{width: '100px', height: '40px'}} onClick={()=>setIsModalOpen(false)}>Cancelar</button>
            </div>
        </div>
    </div>

};

export default InsertVigModal


// postosFaz: [],
// postosSabe: [],        
// aniversario: 
// morada: { rua: String, postal: String, cidade: String },
// contrato: { tipo: String, inicio: Date, fim: Date },
// chefia: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Vigilante'
// }
