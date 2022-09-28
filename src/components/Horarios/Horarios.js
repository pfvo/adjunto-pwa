import './Horarios.css'

const Horarios = ({horarios, Temporal, addHorario, removeHorario, changeHorario}) => {
    return (
        <div className="scheduleList">
            <p>Horarios</p>
            <div>
                <input id='insertHorarioID' type='text' placeholder='ID' className='horarioListId'></input>
                <input
                    className='times'
                    id='insertHorarioStart'
                    type='time'>
                </input>
                <input
                    className='times'
                    id='insertHorarioEnd'                            
                    type='time'>
                </input>
                <button
                onClick={()=> {
                    const id = document.querySelector("#insertHorarioID").value
                    const start = document.querySelector("#insertHorarioStart").value
                    const end = document.querySelector("#insertHorarioEnd").value
                    document.getElementById('insertHoras').style.boxShadow="0px 0px 25px 4px rgb(0, 255, 175)"         
                    horarios.filter(horario => horario.id === id).length ?
                    alert('invalid ID') :
                    addHorario({id, start, end})
                    document.querySelector("#insertHorarioID").value = ''
                    document.querySelector("#insertHorarioStart").value = ''
                    document.querySelector("#insertHorarioEnd").value = ''
                }} 
                className='add-horario-insert'>
                +
                </button>
         
            </div>
            <div className='scheduleList-sub'>
                {horarios.map(horario => {
                    return(
                        <div 
                            className='single-schedule' 
                            key={horario.id} 
                            onChange={()=>{
                                document.getElementById('insertHoras').style.boxShadow="0px 0px 25px 4px rgb(0, 255, 175)"
                                return document.querySelector(`#${horario.id}horasId`).value = Temporal.PlainTime.from(document.querySelector(`#${horario.id}horasIdStart`).value).until(document.querySelector(`#${horario.id}horasIdEnd`).value).total('hours') > 0 ?
                                    Temporal.PlainTime.from(document.querySelector(`#${horario.id}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${horario.id}horasIdEnd`).value)).total('hours').toString() :
                                    24 - Temporal.PlainTime.from(document.querySelector(`#${horario.id}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${horario.id}horasIdEnd`).value)).abs().total('hours')}
                            }>
                            <input 
                                type='text' 
                                placeholder='ID'
                                className='scheduleListId' 
                                defaultValue={horario.id}
                                >
                            </input>
                            <input
                                id={`${horario.id}horasIdStart`}
                                className="times" 
                                type='time' 
                                defaultValue = {horario.start}
                                onChange={(event)=>changeHorario(event, 'start', horario.id)}
                                >
                            </input>     
                            <input
                                id={`${horario.id}horasIdEnd`}
                                className="times"                         
                                type='time' 
                                defaultValue = {horario.end}
                                onChange={(event)=>changeHorario(event, 'end', horario.id)}
                                 >
                            </input>
                            <input
                                id={`${horario.id}horasId`}
                                type='text' 
                                style={{width: '20px'}}
                                defaultValue={
                                    Temporal.PlainTime.from(horario.start).until(Temporal.PlainTime.from(horario.end)).total('hours') > 0 ?
                                    Temporal.PlainTime.from(horario.start).until(Temporal.PlainTime.from(horario.end)).total('hours').toString() :
                                    24 - Temporal.PlainTime.from(horario.start).until(Temporal.PlainTime.from(horario.end)).abs().total('hours')
                                }>
                            </input>
                            <button
                                onClick={() => {
                                    document.getElementById('insertHoras').style.boxShadow="0px 0px 25px 4px rgb(0, 255, 175)"
                                    removeHorario(horario.id)
                                    }} 
                                className='schedule-delete'
                                >
                                -
                            </button>
                        </div>
                    )
                })
                }
    
            </div>       
        </div>
     )
}

export default Horarios;