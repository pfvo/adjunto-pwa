import './Schedule.css'

import Day from "../Day/Day"



const Schedule = ({Temporal, selectedSchedule, vigilantes, dates, changeDay, changeDay2, horarios}) => {
    const fullMonthsPT = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Jullho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    const totalDays  = selectedSchedule.id ? (Temporal.PlainDateTime.from(`${selectedSchedule.start} 00:00:00`)
    .until(Temporal.PlainDateTime.from(`${selectedSchedule.end} 23:59:59`))
    .round({ smallestUnit: "days" }).days) : 0

    let arr = [];


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
            console.log(Temporal.PlainTime.from(document.querySelector(`#bhorasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#bhorasIdEnd`).value)).total('hours'))
            const totalHoras = arr2.flat().reduce((acc, curr)=> acc + curr,0)

            const mappedRows = vigilante.rows.map(row => {
                return (
                    <div key={`${row}-${vigilante.mec}`} className='vig-name-container' >
                        <input className='row-vig' defaultValue={vigilante.nome}></input>
                        {/* <input className='totalHoras' defaultValue={[...document.querySelectorAll(`[mec="${vigilante.mec}"]`)]
                        .reduce((acc, curr) => curr.value.length < 1 ? acc + 0 : acc + Number(document.querySelector(`#${curr.value}horasId`).value),0)}></input>
                             */}

                        {totalHoras}

                    </div>  
                )
            })
            return mappedRows;
        })}

        </div>
        {arr}
        </div>
    )
}

export default Schedule;