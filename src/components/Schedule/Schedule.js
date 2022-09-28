import './Schedule.css'

import Day from "../Day/Day"




const Schedule = ({Temporal, selectedSchedule, vigilantes, dates, changeDay, changeDay2, horarios, setTotalHoras, options, feriados, setTotalHorasFeriado, setTotalHorasNoturnas}) => {
    const fullMonthsPT = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Jullho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    const totalDays  = selectedSchedule.id ? (Temporal.PlainDateTime.from(`${selectedSchedule.start} 00:00:00`)
    .until(Temporal.PlainDateTime.from(`${selectedSchedule.end} 23:59:59`))
    .round({ smallestUnit: "days" }).days) : 0

    let arr = [];
    let totalHoras;
    
    for(let i=0; i<totalDays; i++) {
        const currentDay = Temporal.PlainDate.from(selectedSchedule.start).add({ days: i})
        
        arr.push(<Day 
            key={currentDay.toString()} 
            currentDay={currentDay} 
            vigilantes={vigilantes} 
            dates={dates}
            changeDay={changeDay}
            changeDay2={changeDay2}
            horarios={horarios}
            Temporal={Temporal}
            options={options}
            feriados={feriados}

            />)
    }
    return (
        <div className="schedule-box">
        <div className='schedule-props'>
        <p className='mes'>{fullMonthsPT[Temporal.PlainDate.from(selectedSchedule.start).month -1]}</p>
        {vigilantes.map(vigilante => {
            
            let arr2 = [];
            for(let i=0; i<totalDays; i++) {
            const currentDay2 = Temporal.PlainDate.from(selectedSchedule.start).add({ days: i})
            const currentDay3 = currentDay2.subtract({days: 1})
            if(dates[currentDay3.year]?.[currentDay3.month]?.[currentDay3.day]
                && Object.entries(dates[currentDay3.year]?.[currentDay3.month]?.[currentDay3.day]).filter(item=> item[0].includes(vigilante.mec))
                && Object.entries(dates[currentDay3.year]?.[currentDay3.month]?.[currentDay3.day]).filter(item=> item[0].includes(vigilante.mec))
                .some(item => Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).total('hours') <= 0)) {
                    const filtered = Object.entries(dates[currentDay3.year]?.[currentDay3.month]?.[currentDay3.day]).filter(item=> item[0].includes(vigilante.mec))
                    filtered.map(item => {
                        if (Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).total('hours') <= 0) {
                            return arr2.push(Temporal.PlainTime.from("00:00").until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).round({ smallestUnit: "hours" }).total('hours'))
                        } else { 
                            return 0
                        }
                    })
                }
            if (dates[currentDay2.year]?.[currentDay2.month]?.[currentDay2.day]
                && Object.entries(dates[currentDay2.year]?.[currentDay2.month]?.[currentDay2.day]).filter(item=> item[0].includes(vigilante.mec))
                && Object.entries(dates[currentDay2.year]?.[currentDay2.month]?.[currentDay2.day]).filter(item=> item[0].includes(vigilante.mec))
                .some(item => Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).total('hours') <= 0)) {
                    const filtered = Object.entries(dates[currentDay2.year]?.[currentDay2.month]?.[currentDay2.day]).filter(item=> item[0].includes(vigilante.mec))
                    filtered.map(item => {
                        if (Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).total('hours') <= 0) {
                            return arr2.push(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from("23:59")).round({ smallestUnit: "hours" }).total('hours'))
                        } else { 
                            return arr2.push(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).round({ smallestUnit: "hours" }).total('hours'))
                        }
                    })
            }
            if(dates[currentDay2.year]?.[currentDay2.month]?.[currentDay2.day]
                && Object.entries(dates[currentDay2.year]?.[currentDay2.month]?.[currentDay2.day]).filter(item=> item[0].includes(vigilante.mec))
                && Object.entries(dates[currentDay2.year]?.[currentDay2.month]?.[currentDay2.day]).filter(item=> item[0].includes(vigilante.mec))
                .every(item => Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).total('hours') > 0)) {
                const filtered = Object.entries(dates[currentDay2.year]?.[currentDay2.month]?.[currentDay2.day]).filter(item=> item[0].includes(vigilante.mec))
                    filtered.map(item => arr2.push(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).round({ smallestUnit: "hours" }).total('hours')))

            } else {
                arr2.push(0)
            }
            }
            totalHoras = arr2.flat().reduce((acc, curr)=> acc + curr,0)          
                     

            const mappedRows = vigilante.rows.map(row => {
                return (
                    <div key={`${row}-${vigilante.mec}`} className='vig-name-container' style={{display: 'inline-flex', height: '20px'}}>
                       
                        <input className='row-vig' defaultValue={vigilante.nome}></input>
                        {/* <input className='totalHoras' defaultValue={[...document.querySelectorAll(`[mec="${vigilante.mec}"]`)]
                        .reduce((acc, curr) => curr.value.length < 1 ? acc + 0 : acc + Number(document.querySelector(`#${curr.value}horasId`).value),0)}></input>
                             */}
                        <div horas={vigilante.mec} style={{margin: '0', marginLeft: '5px'}} onClick={(event)=>{
                        // setTotalHoras()
                        setTotalHorasFeriado(Temporal)
                        console.log(event.target.textContent)}
                        }>{totalHoras}</div>
                        

                        

                    </div>  
                )
            })
            return mappedRows;
        })}
        

        </div>
        {arr}
        <button id="insertHoras" onClick={()=>{
            document.getElementById('insertHoras').style.boxShadow="2px 2px 15px 1px gray"
            document.querySelectorAll(`[horas]`)[0]?.click()
            
            
            
        }}>Inserir Alteraçoes</button>

        {
            vigilantes.map(vigilante => {
            const horasFeriado= [];
            feriados.map(feriado => {

                const today = Temporal.PlainDate.from(feriado)
                const yesterday = today.subtract({days: 1})
                const letraHoje = document.querySelector(`[mec="${vigilante.mec}"][date="${feriado}"]`)?.value
                const letraOntem = document.querySelector(`[mec="${vigilante.mec}"][date="${yesterday}"]`)?.value

                if(document.querySelector(`[mec="${vigilante.mec}"][date="${yesterday}"]`) && letraOntem &&
                Temporal.PlainTime.from(document.querySelector(`#${letraOntem}horasIdStart`).value)
                .until(Temporal.PlainTime.from(document.querySelector(`#${letraOntem}horasIdEnd`).value))
                .total('hours') <= 0) {
                    horasFeriado.push([vigilante.mec, feriado, Temporal.PlainTime.from("00:00")
                .until(Temporal.PlainTime.from(document.querySelector(`#${letraOntem}horasIdEnd`).value))
                .total('hours')])
                }

                
                if(document.querySelector(`[mec="${vigilante.mec}"][date="${today}"]`) && letraHoje &&
                Temporal.PlainTime.from(document.querySelector(`#${letraHoje}horasIdStart`).value)
                .until(Temporal.PlainTime.from(document.querySelector(`#${letraHoje}horasIdEnd`).value))
                .total('hours') <= 0) {
                    horasFeriado.push([vigilante.mec, feriado, Temporal.PlainTime.from(document.querySelector(`#${letraHoje}horasIdStart`).value)
                .until(Temporal.PlainTime.from("23:59:59"))
                .round({smallestUnit: "minutes"})
                .total('hours')])
                }
                
                if(document.querySelector(`[mec="${vigilante.mec}"][date="${feriado}"]`) && letraHoje &&
                Temporal.PlainTime.from(document.querySelector(`#${letraHoje}horasIdStart`).value)
                .until(Temporal.PlainTime.from(document.querySelector(`#${letraHoje}horasIdEnd`).value))
                .total('hours') > 0) {
                    horasFeriado.push([vigilante.mec, feriado, Temporal.PlainTime.from(document.querySelector(`#${letraHoje}horasIdStart`).value)
                .until(Temporal.PlainTime.from(document.querySelector(`#${letraHoje}horasIdEnd`).value))
                .round({smallestUnit: "minutes"})
                .total('hours')])
                }
            })
            console.log(horasFeriado.reduce((acc, curr)=> acc + curr[2],0))
        })
        
        }
           <button onClick={console.log('j')}></button>
        
        </div>
    )
    
}

export default Schedule;