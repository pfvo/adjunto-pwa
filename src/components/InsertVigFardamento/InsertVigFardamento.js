import { useState } from 'react';

import './InsertVigFardamento.css'


const InsertVigFardamento = ({isModalOpen, setIsModalOpen, vigilante, setVigilante}) => {
    const [insertFardaClassica, setInsertFardaClassica] = useState({tipo: '', tamanho: '', quantidade: ''})
    const [insertFardaTatica, setInsertFardaTatica] = useState({tipo: '', tamanho: '', quantidade: ''})
    const [insertFardaOutra, setInsertFardaOutra] = useState({tipo: '', quantidade: ''})
   
    console.log(insertFardaClassica)
    console.log(vigilante.fardamento)
    return <div className='insertvigfardamento-modal'>
        <div className='fardamento-modal'>
            <h1 style={{width:'100%'}}>Fardamento</h1>
            <div className='subfardamento-modal'>
                <h2>Clássico</h2>
                <div className='subfardamentoitem-modal'>
                    <select style={{width: '134px'}} id='classicatipo' defaultValue='' onChange={(event)=> {
                        setInsertFardaClassica({tipo: event.target.value, tamanho:'', quantidade: ''})
                        document.getElementById('classicatamanho').value = ''
                        document.getElementById('classicaquantidade').value = ''
                        }
                        }>
                        <option disabled value=''></option>
                        <option value='Camisa Comprida'>Camisa Comprida</option>
                        <option value='Camisa Curta'>Camisa Curta</option>
                        <option value='Blusão Classico'>Blusão Classico</option>
                        <option value='Polo C/Mangas'>Polo C/Mangas</option>
                        <option value='Polo S/Mangas'>Polo S/Mangas</option>
                        <option value='Calças Classicas'>Calças Classicas</option>
                    </select>
                    { insertFardaClassica.tipo === 'Calças Classicas' ?
                    <select style={{width: '52px'}} id='classicatamanho' defaultValue={insertFardaClassica.tamanho} onChange={(event)=> setInsertFardaClassica({...insertFardaClassica, tamanho: event.target.value})}>
                        <option disabled value=''></option>
                        <option value='32'>32</option>
                        <option value='34'>34</option>
                        <option value='36'>36</option>
                        <option value='38'>38</option>
                        <option value='40'>40</option>
                        <option value='42'>42</option>
                        <option value='44'>44</option>
                        <option value='46'>46</option>
                        <option value='48'>48</option>
                        <option value='50'>50</option>
                        <option value='52'>52</option>
                        <option value='54'>54</option>
                        <option value='56'>56</option>
                        <option value='58'>58</option>
                        <option value='60'>60</option>
                    </select>
                    :
                    <select style={{width: '52px'}} id='classicatamanho' defaultValue={insertFardaClassica.tamanho} onChange={(event)=>setInsertFardaClassica({...insertFardaClassica, tamanho: event.target.value})}>
                        <option disabled value=''></option>
                        <option value='XXS'>XXS</option>
                        <option value='XS'>XS</option>
                        <option value='L'>L</option>
                        <option value='XL'>XL</option>
                        <option value='XXL'>XXL</option>
                        <option value='3XL'>3XL</option>
                        <option value='4XL'>4XL</option>
                    </select> 
                    }
                    <input id='classicaquantidade' type='number' defaultValue={''} onChange={(event)=>setInsertFardaClassica({...insertFardaClassica, quantidade: event.target.value})}/>
                    <button onClick={()=>{
                        vigilante.fardamento.classico.some(item => item.tipo === insertFardaClassica.tipo && item.tamanho === insertFardaClassica.tamanho) || (document.getElementById('classicatipo').value === '' || document.getElementById('classicatamanho').value === '')
                        ? alert('Artigo já inserido') :
                        setVigilante({...vigilante, fardamento:{...vigilante.fardamento, classico:[...vigilante.fardamento.classico, insertFardaClassica]}})
                        document.getElementById('classicatipo').value = ''
                        document.getElementById('classicatamanho').value = ''
                        document.getElementById('classicaquantidade').value = ''
                        }}>+</button>
                    {vigilante.fardamento.classico.map((item) => <div key={ item.tipo + item.tamanho} style={{width:'100%'}}>
                        <input type='text' defaultValue={item.tipo} style={{width: '130px'}} disabled></input>
                        <input type='text' defaultValue={item.tamanho} style={{width: '48px'}} disabled></input>
                        <input 
                            type='number' 
                            defaultValue={item.quantidade} 
                            style={{width: '40px'}} 
                            onChange={(event)=>{setVigilante(
                            {...vigilante, fardamento: {...vigilante.fardamento, classico:
                             vigilante.fardamento.classico.map(farda => farda !== item ? farda : {...farda, quantidade: event.target.value})}})
                       
                            }}>
                        </input>
                        <button style={{width: '40px'}} onClick={(event)=>{setVigilante(
                            {...vigilante, fardamento: {...vigilante.fardamento, classico:
                             vigilante.fardamento.classico.filter(farda => farda !== item)}})
                            }}>-</button>
                    </div>)}
                </div>
            </div>
            <div className='subfardamento-modal'>
                <h2>Tático</h2>
                <div className='subfardamentoitem-modal'>
                    <select style={{width: '134px'}} id='taticatipo' defaultValue='' onChange={(event)=> {
                        setInsertFardaTatica({tipo: event.target.value, tamanho:'', quantidade: ''})
                        document.getElementById('taticatamanho').value = ''
                        document.getElementById('taticaquantidade').value = ''
                        }
                        }>
                        <option disabled value=''></option>
                        <option value='Polo Comprido'>Polo Comprido</option>
                        <option value='Polo Curto'>Polo Curto</option>
                        <option value='Blusão Tatico'>Blusão Tatico</option>
                        <option value='Calças Taticas'>Calças Taticas</option>
                    </select>
                    { insertFardaTatica.tipo === 'Calças Taticas' ?
                    <select style={{width: '52px'}} id='taticatamanho' defaultValue={insertFardaTatica.tamanho} onChange={(event)=> setInsertFardaTatica({...insertFardaTatica, tamanho: event.target.value})}>
                        <option disabled value=''></option>
                        <option value='32'>32</option>
                        <option value='34'>34</option>
                        <option value='36'>36</option>
                        <option value='38'>38</option>
                        <option value='40'>40</option>
                        <option value='42'>42</option>
                        <option value='44'>44</option>
                        <option value='46'>46</option>
                        <option value='48'>48</option>
                        <option value='50'>50</option>
                        <option value='52'>52</option>
                        <option value='54'>54</option>
                        <option value='56'>56</option>
                        <option value='58'>58</option>
                        <option value='60'>60</option>
                    </select>
                    :
                    <select style={{width: '52px'}} id='taticatamanho' defaultValue={insertFardaTatica.tamanho} onChange={(event)=>setInsertFardaTatica({...insertFardaTatica, tamanho: event.target.value})}>
                        <option disabled value=''></option>
                        <option value='XXS'>XXS</option>
                        <option value='XS'>XS</option>
                        <option value='L'>L</option>
                        <option value='XL'>XL</option>
                        <option value='XXL'>XXL</option>
                        <option value='3XL'>3XL</option>
                        <option value='4XL'>4XL</option>
                    </select> 
                    }
                    <input id='taticaquantidade' type='number' defaultValue={''} onChange={(event)=>setInsertFardaTatica({...insertFardaTatica, quantidade: event.target.value})}/>
                    <button onClick={()=>{
                        vigilante.fardamento.tatico.some(item => item.tipo === insertFardaTatica.tipo && item.tamanho === insertFardaTatica.tamanho) || (document.getElementById('taticatipo').value === '' || document.getElementById('taticatamanho').value === '')
                        ? alert('Artigo já inserido') :
                        setVigilante({...vigilante, fardamento:{...vigilante.fardamento, tatico:[...vigilante.fardamento.tatico, insertFardaTatica]}})
                        document.getElementById('taticatipo').value = ''
                        document.getElementById('taticatamanho').value = ''
                        document.getElementById('taticaquantidade').value = ''
                        }}>+</button>
                    {vigilante.fardamento.tatico.map((item) => <div key={ item.tipo + item.tamanho} style={{width:'100%'}}>
                        <input type='text' defaultValue={item.tipo} style={{width: '130px'}} disabled></input>
                        <input type='text' defaultValue={item.tamanho} style={{width: '48px'}} disabled></input>
                        <input 
                            type='number' 
                            defaultValue={item.quantidade} 
                            style={{width: '40px'}} 
                            onChange={(event)=>{setVigilante(
                            {...vigilante, fardamento: {...vigilante.fardamento, tatico:
                             vigilante.fardamento.tatico.map(farda => farda !== item ? farda : {...farda, quantidade: event.target.value})}})
                       
                            }}>
                        </input>
                        <button style={{width: '40px'}} onClick={(event)=>{setVigilante(
                            {...vigilante, fardamento: {...vigilante.fardamento, tatico:
                             vigilante.fardamento.tatico.filter(farda => farda !== item)}})
                            }}>-</button>
                    </div>)}
                </div>
            </div>
            <div className='subfardamento-modal'>
                <h2>Outro</h2>
                <div className='subfardamentoitem-modal'>
                    <select style={{width: '134px'}} id='outratipo' defaultValue='' onChange={(event)=> {
                        setInsertFardaOutra({tipo: event.target.value, quantidade: ''})
                        document.getElementById('outraquantidade').value = ''
                        }
                        }>
                        <option disabled value=''></option>
                        <option value='Fita Identificativa'>Fita Identificativa</option>
                        <option value='Gravata Cinza'>Gravata Cinza</option>
                        <option value='Gravata Vermelha'>Gravata Vermelha</option>
                    </select>
                    <input id='outraquantidade' type='number' defaultValue={''} onChange={(event)=>setInsertFardaOutra({...insertFardaOutra, quantidade: event.target.value})}/>
                    <button onClick={()=>{
                        vigilante.fardamento.outro.some(item => item.tipo === insertFardaOutra.tipo && item.tamanho === insertFardaOutra.tamanho) || document.getElementById('outratipo').value === ''
                        ? alert('Artigo já inserido') :
                        setVigilante({...vigilante, fardamento:{...vigilante.fardamento, outro:[...vigilante.fardamento.outro, insertFardaOutra]}})
                        document.getElementById('outratipo').value = ''
                        document.getElementById('outraquantidade').value = ''
                        }}>+</button>
                    {vigilante.fardamento.outro.map((item) => <div key={ item.tipo + item.tamanho} style={{width:'100%'}}>
                        <input type='text' defaultValue={item.tipo} style={{width: '130px'}} disabled></input>
                        <input 
                            type='number' 
                            defaultValue={item.quantidade} 
                            style={{width: '40px'}} 
                            onChange={(event)=>{setVigilante(
                            {...vigilante, fardamento: {...vigilante.fardamento, outro:
                             vigilante.fardamento.outro.map(farda => farda !== item ? farda : {...farda, quantidade: event.target.value})}})
                       
                            }}>
                        </input>
                        <button style={{width: '40px'}} onClick={(event)=>{setVigilante(
                            {...vigilante, fardamento: {...vigilante.fardamento, outro:
                             vigilante.fardamento.outro.filter(farda => farda !== item)}})
                            }}>-</button>
                    </div>)}
                </div>
            </div>
            <div style={{width: "100%"}}>
                <button onClick={()=> {
                    fetch(`http://localhost:3003/office/vigilantes/${vigilante._id}/fardamento`, {
                        method: 'put',
                        headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({     
                                fardamento: vigilante.fardamento                                
                                })
                    })
                    .then(()=>setIsModalOpen(!isModalOpen))
                    .catch(e => console.log(e))
                }}>Inserir</button>
                <button onClick={()=>setIsModalOpen(!isModalOpen)}>Cancelar</button>
            </div>
        </div>
    </div>
};

export default InsertVigFardamento;