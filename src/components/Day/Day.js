import './Day.css'

const teste =(event, currentDay) => {
console.log({[currentDay.toString()]: event.target})
}

const getDateWorker = (currentDay, rowId, dates) => {
    return dates[currentDay.year]?.[currentDay.month]?.[currentDay.day]?.[rowId] 
}

const Day = ({currentDay, vigilantes, dates, changeDay, changeDay2, horarios}) => {
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
        {
        mappedVigilantes.reduce((acc, curr) => Number(acc) + Number(document.querySelector(`#${curr[0].props.defaultValue}horasId`)?.value || 0), 0)
        }

    </div> 
    )
}

export default Day;