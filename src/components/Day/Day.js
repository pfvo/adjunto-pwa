import './Day.css'

const getDateWorker = (currentDay, rowId, dates) => {
    return dates[currentDay.year]?.[currentDay.month]?.[currentDay.day]?.[rowId] 
}

const Day = ({currentDay, vigilantes, dates, changeDay, changeDay2, horarios, Temporal}) => {
    const horasDiarias = []
    const weekDaysPT = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];
    const day = currentDay.day < 10 ? '0' + currentDay.day.toString() : currentDay.day;
    const mappedVigilantes = vigilantes.map(vigilante => {
        const mappedRows = vigilante.rows.map(row => {
            return <input 
           
            onChange={(event)=> {
                horarios.filter(horario => horario.id === event.target.value).length ?
                changeDay(event, currentDay) : 
                event.target.value === "" ?
                changeDay2(event, currentDay) :
                alert("Invalid ID")
                }}
            type='text' 
            id={`${row+1}-${vigilante.mec}`}
            mec={vigilante.mec}
            key={`${row+1}-${vigilante.mec}`}
            placeholder={`${row+1}-${vigilante.mec}`} 
            defaultValue={getDateWorker(currentDay, `${row+1}-${vigilante.mec}`, dates)}
            className='letter-input'>
            </input>
        })
        return mappedRows;
    })
    return (
    <div className="single-day">
    {
        currentDay.dayOfWeek === 6 || currentDay.dayOfWeek === 7 ?
        <p className='single-day-heading' style={{backgroundColor: 'lightgrey'}}>{`${day} (${weekDaysPT[currentDay.dayOfWeek -1]})`}</p> :
        <p className='single-day-heading'>{`${day} (${weekDaysPT[currentDay.dayOfWeek -1]})`}</p> 

    }
        {mappedVigilantes}
        
        {vigilantes.forEach(vigilante => {
            let arr2 = [];
            const currentDay2 = Temporal.PlainDate.from(currentDay)
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
            const totalHoras = arr2.flat().reduce((acc, curr)=> acc + curr,0)
            horasDiarias.push(totalHoras)
         
            
})}
        
    <div>{horasDiarias.reduce((acc, curr)=> acc + curr,0)}</div>
    {/* //AQUI SERÁ FEITA A CONDICIONAL (SE totalHoras < (tdu?24 etc) retutn div style=color red) etc etc */}
    </div> 
    )
}

export default Day;