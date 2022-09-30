import ScheduleList from "../components/ScheduleList/ScheduleList";
import Schedule from "../components/Schedule/Schedule";
import { Component } from "react";
import VigList from "../components/VigList/VigList";
import Horarios from "../components/Horarios/Horarios";
import Modal from "../components/Modal/Modal";
import WorkplaceOptions from "../components/WorkplaceOptions/WorkplaceOptions";
import { Temporal } from "@js-temporal/polyfill";


const initialState = {
    workplace: 'hotel',
    isModalOpen: false,
    options: {
        segunda: {
            inicio: "00:00",
            fim: "23:59"
        },
        terça: {
            inicio: "00:00",
            fim: "23:59"
        },
        quarta: {
            inicio: "00:00",
            fim: "23:59"
        },
        quinta: {
            inicio: "00:00",
            fim: "23:59"
        },
        sexta: {
            inicio: "00:00",
            fim: "23:59"
        },
        sabado: {
            inicio: "00:00",
            fim: "23:59"
        },
        domingo: {
            inicio: "00:00",
            fim: "23:59"
        },
        feriado: {
            inicio: "00:00",
            fim: "23:59"
        }
    },
    feriados: ["2022-07-05", "2022-08-07", "2022-09-07", "2022-01-07", "2022-10-01", "2022-11-07", "2022-12-07", "2022-02-17", "2022-09-17", "2022-01-17", "2022-10-17", "2022-11-17", "2022-12-27", "2022-07-07", "2022-02-08", "2022-02-09"],
    vigilantes: [
        {
            mec: '2600',
            nome: 'Luis Ramos',
            rows: [0],
            horas: 0
        },
        {
            mec: '2601',
            nome: 'Pedro Oliveira',
            rows: [0],
            horas: 0
        },
        {
            mec: '2629',
            nome: 'Rafael Santos',
            rows: [0],
            horas: 0
        },
        {
            mec: '2620',
            nome: 'João Romão',
            rows: [0],
            horas: 0
        }
    ],
    horarios:[
        {
            id: "a",
            start: "08:00",
            end: "20:00"
        },
        {
            id: "b",
            start: "20:00",
            end: "08:00"
        },
        {
            id: "c",
            start: "12:00",
            end: "12:00"
        },
        {
            id: "d",
            start: "12:00",
            end: "04:00"
        }
    ],
    schedules: [
        { 
            id : 1,
            start: "2022-01-01",
            end: "2022-01-31",
            vigilantes: [
                {
                    mec: '2600',
                    nome: 'Luis Humberto Costa Ramos',
                    rows: [0],
                },
                {
                    mec: '2622200',
                    nome: 'L2amos',
                    rows: [0]
                },
                {
                    mec: '2620',
                    nome: 'João Romão',
                    rows: [0,1,2]
                }
            ]
        },
        { 
            id : 2,
            start: "2022-02-01",
            end: "2022-02-28",
            vigilantes: []
        },
        { 
            id : 3,
            start: "2022-03-01",
            end: "2022-03-31",
            vigilantes: []
        },
        { 
            id : 4,
            start: "2022-03-01",
            end: "2022-03-31",
            vigilantes: []
        },
        { 
            id : 5,
            start: "2022-07-01",
            end: "2022-07-31",
            vigilantes: [
                {
                    mec: '2620',
                    nome: 'João Romão',
                    rows: [0],
                    horas: 12
                }
            ]
        }
    ],
    dates: {
        //talvez tentar com full date 2022-07-01: {vig: horario}
        2022: {
            7: {
                1: {
                    '1-2620': 'a',
                    '1-2601': 'b',
                    '1-2629': 'c'
                }
            }
        }
    },
    selectedSchedule: { 
        id : 5,
        start: "2022-07-01",
        end: "2022-07-31",
        vigilantes: []
    }
}

class Workplace extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    
    }


    selectSchedule = (id) => {
        const filteredSchedules = this.state.schedules.filter(schedule => schedule.id === id)
        this.setState({selectedSchedule: filteredSchedules[0]})
    }

    checkYearMonth = (date) => {
        const year = this.props.Temporal.PlainDate.from(date).year
        const month = this.props.Temporal.PlainDate.from(date).month
        if(!(this.state.dates.hasOwnProperty([year]) && this.state.dates[year].hasOwnProperty(month))) {
            return this.setState((prevState)=>{
                return {dates: {...prevState.dates, [year]:{ ...prevState.dates[year], [month]:{}}}}
            })
        }
        return;
    }
    
    addSchedule = (inserted) => {
        this.checkYearMonth(inserted.start)
        this.checkYearMonth(inserted.end)
        this.setState({schedules: [...this.state.schedules, inserted] }, ()=>this.selectSchedule(inserted.id))
        // this.selectSchedule(inserted.id) dá erro, foi usada uma callback como segundo parametro do setstate
    }

    changeSchedule = (id, time, event) => {
        const mappedSchedules = this.state.schedules.map(schedule => {
          if (!(id === schedule.id)) {
            return schedule
          } else if (id === schedule.id && time === 'start') {
            return {...schedule, start: event.target.value}
          } else if (id === schedule.id && time === 'end') {
            return {...schedule, end: event.target.value}
          } else {
            return schedule
          }
        })
        this.setState({schedules: mappedSchedules}, ()=>this.selectSchedule(this.state.selectedSchedule.id))
    }

    removeSchedule = (scheduleId) => {
        this.setState({schedules: this.state.schedules.filter(schedule => schedule.id !== scheduleId)})
    }

    addVigilanteSchedule = (vig) => {
        const addVigSchedule = this.state.schedules.map(schedule => {
            if(schedule.id === this.state.selectedSchedule.id) {
                // return {...schedule, vigilantes: schedule.vigilantes.concat(vig)} ambos funcionam
                return {...schedule, vigilantes: [...schedule.vigilantes, (vig)]}
            } else {
                return schedule
            }
        })
        this.setState({schedules: addVigSchedule}, ()=>this.selectSchedule(this.state.selectedSchedule.id))
    }

    removeVigilanteSchedule = (vig) => {
        const removeVigSchedule = this.state.schedules.map(schedule => {
            if(schedule.id === this.state.selectedSchedule.id) {
                const cleanArray = schedule.vigilantes.filter(vigilante => vigilante.mec !== vig.mec)
                return {...schedule, vigilantes: cleanArray}
            } else {
                return schedule
            }
        })
        this.setState({schedules: removeVigSchedule}, ()=>this.selectSchedule(this.state.selectedSchedule.id))
    }

    changeVigRows = (vig, event) => {
        const changeRows = this.state.schedules.map(schedule => {
            if (schedule.id === this.state.selectedSchedule.id) {
                const changedVig = schedule.vigilantes.map(vigilante => {
                    const changedArray = [];
                    for (let i=0; i<Number(event.target.value); i++) {
                        changedArray.push(i)
                    }
                    if (vigilante.mec === vig.mec) {
                        return {...vigilante, rows: changedArray}
                    } else {
                        return vigilante
                    }
                })
                return {...schedule, vigilantes: changedVig}
            } else {
                return schedule
            }
        })
        this.setState({schedules: changeRows}, ()=>this.selectSchedule(this.state.selectedSchedule.id))
    }

    addHorario = (inserted) => {
        this.setState({horarios: [...this.state.horarios, inserted] })
    }

    removeHorario = (horarioId) => {
        this.setState({horarios: this.state.horarios.filter(horario => horario.id !== horarioId)})
    }

    changeHorario = (event, input, horarioId) => {
        const changeHorarios = this.state.horarios.map(horario => {
            if (input === 'start' && horario.id === horarioId) {
                return {...horario, start: event.target.value}
            } else if (input === 'end' && horario.id === horarioId) {
                return {...horario, end: event.target.value}
            } else {
                return horario
            }
        })
        this.setState({horarios: changeHorarios})
    }
    
    setTotalHorasFeriado = (Temporal) => {
        const { feriados, dates } = this.state
        const changeTotalHoras = this.state.schedules.map(schedule => {
            if (schedule.id === this.state.selectedSchedule.id) {
                const changedVig = schedule.vigilantes.map(vigilante => {
                    const hFeriado= [];       
                    feriados.filter(item => {
                        return Temporal.PlainDate.compare(Temporal.PlainDate.from(item), Temporal.PlainDate.from(schedule.start)) >= 0
                        && Temporal.PlainDate.compare(Temporal.PlainDate.from(item), Temporal.PlainDate.from(schedule.end)) <= 0
                    }).map(feriado => {
                        const today = Temporal.PlainDate.from(feriado)
                        const yesterday = today.subtract({days: 1})
                                                        
                        if(dates[yesterday.year]?.[yesterday.month]?.[yesterday.day]
                            && Object.entries(dates[yesterday.year]?.[yesterday.month]?.[yesterday.day]).filter(item=> item[0].includes(vigilante.mec))
                            && Object.entries(dates[yesterday.year]?.[yesterday.month]?.[yesterday.day]).filter(item=> item[0].includes(vigilante.mec))
                            .some(item => Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).total('hours') <= 0)) {
                                const filtered = Object.entries(dates[yesterday.year]?.[yesterday.month]?.[yesterday.day]).filter(item=> item[0].includes(vigilante.mec))
                                filtered.map(item => {
                                    if (Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).total('hours') <= 0) {
                                        return hFeriado.push(Temporal.PlainTime.from("00:00").until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).round({ smallestUnit: "hours" }).total('hours'))
                                    } else { 
                                        return hFeriado.push(0)
                                    }    
                                })    
                            }        
                            if(dates[today.year]?.[today.month]?.[today.day]
                                && Object.entries(dates[today.year]?.[today.month]?.[today.day]).filter(item=> item[0].includes(vigilante.mec))
                                && Object.entries(dates[today.year]?.[today.month]?.[today.day]).filter(item=> item[0].includes(vigilante.mec))
                                .every(item => Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).total('hours') > 0)) {
                                    const filtered = Object.entries(dates[today.year]?.[today.month]?.[today.day]).filter(item=> item[0].includes(vigilante.mec))    
                                    filtered.map(item => hFeriado.push(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).round({ smallestUnit: "hours" }).total('hours')))
                                    
                                }        
                                
                                if (dates[today.year]?.[today.month]?.[today.day]
                                && Object.entries(dates[today.year]?.[today.month]?.[today.day]).filter(item=> item[0].includes(vigilante.mec))    
                                && Object.entries(dates[today.year]?.[today.month]?.[today.day]).filter(item=> item[0].includes(vigilante.mec))
                                .some(item => Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).total('hours') <= 0)) {
                                    
                                    const filtered = Object.entries(dates[today.year]?.[today.month]?.[today.day]).filter(item=> item[0].includes(vigilante.mec))
                                    filtered.map(item => {
                                        if (Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).total('hours') <= 0) {
                                            return hFeriado.push(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from("23:59")).round({ smallestUnit: "hours" }).total('hours'))
                                        } else { 
                                            return hFeriado.push(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).round({ smallestUnit: "hours" }).total('hours'))
                                        }    
                                    })
                                }
                                return hFeriado.push(0)        
                        })    
                        return {...vigilante, horasFeriado: hFeriado.reduce((acc, curr)=> acc + curr,0)}
                    })                
                    return {...schedule, vigilantes: changedVig}
                } else {
                    return schedule
            }
        })
        this.setState(prevState => ({...prevState, schedules: changeTotalHoras}), ()=>this.selectSchedule(this.state.selectedSchedule.id))
        console.log(this.state.schedules)
    } 
    
    setTotalHorasNoturnas = (Temporal) => {
        
        const { selectedSchedule, dates } = this.state
        const changeTotalHoras = this.state.schedules.map(schedule => {
            if (schedule.id === this.state.selectedSchedule.id) {
                const changedVig = schedule.vigilantes.map(vigilante => {
                    const hNoturnas= [];
                    console.log(selectedSchedule)     
                    const totalDays  = selectedSchedule.id ? (Temporal.PlainDateTime.from(`${selectedSchedule.start} 00:00:00`)
                    .until(Temporal.PlainDateTime.from(`${selectedSchedule.end} 23:59:59`))
                    .round({ smallestUnit: "days" }).days) : 0
                    
                    for(let i=0; i<totalDays; i++) {
                        const today = Temporal.PlainDate.from(selectedSchedule.start).add({ days: i})
                        const yesterday = today.subtract({days: 1})
                        
                        if(dates[yesterday.year]?.[yesterday.month]?.[yesterday.day]
                            && Object.entries(dates[yesterday.year]?.[yesterday.month]?.[yesterday.day]).filter(item=> item[0].includes(vigilante.mec))
                            && Object.entries(dates[yesterday.year]?.[yesterday.month]?.[yesterday.day]).filter(item=> item[0].includes(vigilante.mec))
                            .some(item => Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).total('hours') <= 0)) {
                                const filtered = Object.entries(dates[yesterday.year]?.[yesterday.month]?.[yesterday.day]).filter(item=> item[0].includes(vigilante.mec))
                                filtered.map(item => {
                                    if (Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).total('hours') <= 0 
                                    && Temporal.PlainTime.compare(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value), Temporal.PlainTime.from('06:00')) >= 0) {
                                        return hNoturnas.push(Temporal.PlainTime.from("00:00").until(Temporal.PlainTime.from('06:00')).round({ smallestUnit: "hours" }).total('hours'))
                                    } else if(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).total('hours') <= 0) {
                                        return hNoturnas.push(Temporal.PlainTime.from("00:00").until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).round({ smallestUnit: "hours" }).total('hours'))
                                    } else { 
                                        return hNoturnas.push(0)
                                    }    
                                })    
                            }        
                            if(dates[today.year]?.[today.month]?.[today.day]
                                && Object.entries(dates[today.year]?.[today.month]?.[today.day]).filter(item=> item[0].includes(vigilante.mec))
                                && Object.entries(dates[today.year]?.[today.month]?.[today.day]).filter(item=> item[0].includes(vigilante.mec))
                                .every(item => Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).total('hours') > 0)) {
                                    const filtered = Object.entries(dates[today.year]?.[today.month]?.[today.day]).filter(item=> item[0].includes(vigilante.mec))    
                                    filtered.map(item => {
                                        if(Temporal.PlainTime.compare(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value), Temporal.PlainTime.from('21:00')) <= 0
                                        && Temporal.PlainTime.compare(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value), Temporal.PlainTime.from('21:00')) > 0) {
                                        return hNoturnas.push(Temporal.PlainTime.from('21:00').until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).round({ smallestUnit: "hours" }).total('hours'))
                                    } else if (Temporal.PlainTime.compare(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value), Temporal.PlainTime.from('21:00')) > 0) {
                                        return hNoturnas.push(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).round({ smallestUnit: "hours" }).total('hours'))
                                        } else {
                                            return hNoturnas.push(0)
                                        }
                                    })
                                }        
                                
                                if (dates[today.year]?.[today.month]?.[today.day]
                                && Object.entries(dates[today.year]?.[today.month]?.[today.day]).filter(item=> item[0].includes(vigilante.mec))    
                                && Object.entries(dates[today.year]?.[today.month]?.[today.day]).filter(item=> item[0].includes(vigilante.mec))
                                .some(item => Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).total('hours') <= 0)) {
                                    const filtered = Object.entries(dates[today.year]?.[today.month]?.[today.day]).filter(item=> item[0].includes(vigilante.mec))
                                    filtered.map(item => {
                                        if (Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value)).total('hours') <= 0) {
                                            if (Temporal.PlainTime.compare(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value), Temporal.PlainTime.from('21:00')) <= 0) {
                                                return hNoturnas.push(Temporal.PlainTime.from('21:00').until(Temporal.PlainTime.from('23:59:59')).round({ smallestUnit: "hours" }).total('hours'))
                                            } else {
                                                return hNoturnas.push(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from('23:59:59')).round({ smallestUnit: "hours" }).total('hours'))
                                            }
                                        } else {
                                            if (Temporal.PlainTime.compare(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value), Temporal.PlainTime.from('21:00')) <= 0) {
                                                return hNoturnas.push(Temporal.PlainTime.from(document.querySelector("21:00").until(Temporal.PlainTime.from(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value))).round({ smallestUnit: "hours" }).total('hours')))
                                            } else {
                                                return hNoturnas.push(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdStart`).value).until(Temporal.PlainTime.from(Temporal.PlainTime.from(document.querySelector(`#${item[1]}horasIdEnd`).value))).round({ smallestUnit: "hours" }).total('hours'))   
                                            }
                                        }    
                                    })
                                }                                    
                            }    
                        console.log(vigilante, hNoturnas.reduce((acc, curr)=> acc + curr,0) )
                        return {...vigilante, horasNoturnas: hNoturnas.reduce((acc, curr)=> acc + curr,0)}
                    })                
                    return {...schedule, vigilantes: changedVig}
                } else {
                    return schedule
                }
            })
            this.setState(prevState => ({...prevState, schedules: changeTotalHoras}), ()=>this.setTotalHorasFeriado(Temporal))
    }
             
    setTotalHoras = (Temporal) => {
        const changeTotalHoras = this.state.schedules.map(schedule => {
            if (schedule.id === this.state.selectedSchedule.id) {
                const changedVig = schedule.vigilantes.map(vigilante => {
                        return {...vigilante, horas: Number(document.querySelectorAll(`[horas="${vigilante.mec}"]`)[0].textContent)}
                    })                
                return {...schedule, vigilantes: changedVig}
            } else {
                return schedule
            }
        })
        this.setState(prevState=>({...prevState, schedules: changeTotalHoras}), ()=>this.setTotalHorasNoturnas(Temporal))
    }

    changeDay = (event, currentDay) => {
        const {dates} = this.state;
        this.setState({dates: {
                ...dates, 
                [currentDay.year]: {
                    ...dates[currentDay.year],
                     [currentDay.month] : {
                        ...dates[currentDay.year][currentDay.month],
                        [currentDay.day] : {
                            ...dates[currentDay.year][currentDay.month][currentDay.day],
                            [event.target.id] : event.target.value
                        }
                    }
                }
            }
        })
    }

    changeDay2 = (event, currentDay) => {
        const {dates} = this.state;
        const listedVig = dates[currentDay.year][currentDay.month][currentDay.day]

        if(dates[currentDay.year][currentDay.month][currentDay.day]?.[event.target.id]) {
            delete listedVig[event.target.id]
            this.setState({dates: {
                    ...dates, 
                    [currentDay.year]: {
                        ...dates[currentDay.year],
                         [currentDay.month] : {
                            ...dates[currentDay.year][currentDay.month],
                            [currentDay.day] : 
                                listedVig
                            
                        }
                    }
                }
            })
        }
    }

    toggleModal = () => {
        this.setState(prevState=> ({
            ...prevState, isModalOpen: !prevState.isModalOpen
        }))
    }

    setWorkplaceOptions = () => {
        this.setState({
            options: {
                segunda: {inicio: document.getElementById('segunda-inicio').value, fim: document.getElementById('segunda-fim').value},
                terça: {inicio: document.getElementById('terça-inicio').value, fim: document.getElementById('terça-fim').value},
                quarta: {inicio: document.getElementById('quarta-inicio').value, fim: document.getElementById('quarta-fim').value},
                quinta: {inicio: document.getElementById('quinta-inicio').value, fim: document.getElementById('quinta-fim').value},
                sexta: {inicio: document.getElementById('sexta-inicio').value, fim: document.getElementById('sexta-fim').value},
                sabado: {inicio: document.getElementById('sabado-inicio').value, fim: document.getElementById('sabado-fim').value},
                domingo: {inicio: document.getElementById('domingo-inicio').value, fim: document.getElementById('domingo-fim').value},
                feriado: {inicio: document.getElementById('feriado-inicio').value, fim: document.getElementById('feriado-fim').value}
        }})
    }

    addDefaultVigilante = (vig) => {
      if(this.state.vigilantes.filter(v => v.mec === vig.mec).length) {
        alert('Vigilante Já Inserido')
      } else {
          this.setState(prevState => ({
            ...prevState, vigilantes: [...prevState.vigilantes, vig]
        }))
      }        
    }

    removeDefaultVigilante = (vig) => {
        
        const removeDefaultVig = this.state.vigilantes.filter(v => v.mec !== vig.mec)
        this.setState(prevState => ({
            ...prevState, vigilantes: removeDefaultVig
        }))
    }

    changeDefaultVigRows = (vig, event) => {
        const changedVig = this.state.vigilantes.map(vigilante => {
            const changedArray = [];
            for (let i=0; i<Number(event.target.value); i++) {
                changedArray.push(i)
            }
            if (vigilante.mec === vig.mec) {
                return {...vigilante, rows: changedArray}
            } else {
                return vigilante
            }
        })
        this.setState({vigilantes: changedVig})
    }

    addFeriado = (date) => {
        this.state.feriados.filter(feriado => feriado === date).length ?
        alert('Feriado Já Inserido') :
        this.setState(prevState => ({
            ...prevState, feriados: [...prevState.feriados, date]
        }))
    }
    
    removeFeriado = (date) => {
        this.setState(prevState => ({
            ...prevState, feriados: this.state.feriados.filter(feriado => feriado !== date)
        }))
    }

    turboScheduleInputClick = () => {
        
        [...document.querySelectorAll(`[insertion]`)].forEach(insertion => {
            const {dates} = this.state;
            const currentDay = Temporal.PlainDate.from(insertion.getAttribute("date"));
            const id = (insertion.getAttribute("id"));
            const listedVig = dates[currentDay.year][currentDay.month][currentDay.day]
            
                if(insertion.value === "" && dates[currentDay.year][currentDay.month][currentDay.day]?.[id]) {
                    delete listedVig[id]
                    this.setState(prevState=>({dates: {
                            ...prevState.dates, 
                            [currentDay.year]: {
                                ...prevState.dates[currentDay.year],
                                 [currentDay.month] : {
                                    ...prevState.dates[currentDay.year][currentDay.month],
                                    [currentDay.day] : 
                                        listedVig
                                    
                                }
                            }
                        }
                    }))
                } else if (this.state.horarios.filter(horario => horario.id === insertion.value).length) {
                    this.setState(prevState => ({dates: {
                        ...prevState.dates, 
                        [currentDay.year]: {
                            ...prevState.dates[currentDay.year],
                             [currentDay.month] : {
                                ...prevState.dates[currentDay.year][currentDay.month],
                                [currentDay.day] : {
                                    ...prevState.dates[currentDay.year][currentDay.month][currentDay.day],
                                    [id] : insertion.value
                                }
                            }
                        }
                    }
                }))
                }else if (insertion.value !== ""){
                    insertion.style.backgroundColor= 'red'
                }                
        })
    }

    fastScheduleInput = (event, currentDay) => {
        const {dates} = this.state;
        const listedVig = dates[currentDay.year][currentDay.month][currentDay.day]

        if(event.target.value === "" && dates[currentDay.year][currentDay.month][currentDay.day]?.[event.target.id]) {
            delete listedVig[event.target.id]
            this.setState(prevState => ({dates: {
                ...prevState.dates, 
                    [currentDay.year]: {
                        ...prevState.dates[currentDay.year],
                         [currentDay.month] : {
                            ...prevState.dates[currentDay.year][currentDay.month],
                            [currentDay.day] : 
                                listedVig
                            
                        }
                    }
                }
            }))
        }  else if (this.state.horarios.filter(horario => horario.id === event.target.value).length) {
            this.setState(prevState => ({dates: {
                ...prevState.dates, 
                [currentDay.year]: {
                    ...prevState.dates[currentDay.year],
                     [currentDay.month] : {
                        ...prevState.dates[currentDay.year][currentDay.month],
                        [currentDay.day] : {
                            ...prevState.dates[currentDay.year][currentDay.month][currentDay.day],
                            [event.target.id] : event.target.value
                        }
                    }
                }
            }
        }))
    
        }else if (event.target.value !== ""){
            event.target.style.backgroundColor= 'red'
        }
    }
    
    

    render() {
        return (
            <div>

            <div style={{fontSize: "3em", width: "100%", display: 'flex'}}>
                {this.state.workplace}
                <button onClick={()=>this.toggleModal()} style={{marginLeft: "auto", marginRight: "1%", width: "5%", fontSize: '1em', fontWeight: '1000', marginTop: '0.2%', borderRadius: '20px'}}>&#9881;</button>
            </div>
            <div style={{display: 'flex', justifyContent:'space-evenly'}}>
            {this.state.isModalOpen && 
            <Modal>
                <WorkplaceOptions 
                    toggleModal={this.toggleModal} 
                    options={this.state.options} 
                    workplace={this.state.workplace}
                    setWorkplaceOptions={this.setWorkplaceOptions}
                    vigilantes={this.state.vigilantes}
                    addDefaultVigilante={this.addDefaultVigilante}
                    removeDefaultVigilante={this.removeDefaultVigilante}
                    changeDefaultVigRows={this.changeDefaultVigRows}
                    feriados={this.state.feriados}
                    addFeriado={this.addFeriado}
                    removeFeriado={this.removeFeriado}
                    />
            </Modal>
            }
            <ScheduleList 
                Temporal={this.props.Temporal} 
                schedules={this.state.schedules} 
                selectSchedule={this.selectSchedule}
                addSchedule={this.addSchedule}
                changeSchedule={this.changeSchedule}
                removeSchedule={this.removeSchedule}
                vigilantes={this.state.vigilantes}
            />
            <VigList 
                vigilantes={this.state.selectedSchedule.vigilantes}
                addVigilanteSchedule={this.addVigilanteSchedule}
                removeVigilanteSchedule={this.removeVigilanteSchedule}
                changeVigRows={this.changeVigRows}
            />
            <Horarios 
                horarios={this.state.horarios}
                Temporal={this.props.Temporal}
                addHorario={this.addHorario}
                removeHorario={this.removeHorario}
                changeHorario={this.changeHorario}
                />
            </div>
            <Schedule 
                Temporal={this.props.Temporal} 
                selectedSchedule={this.state.selectedSchedule}
                vigilantes={this.state.selectedSchedule.vigilantes}
                dates={this.state.dates}
                changeDay={this.changeDay}
                changeDay2={this.changeDay2}
                horarios={this.state.horarios}
                setTotalHoras={this.setTotalHoras}
                options={this.state.options}
                feriados={this.state.feriados}
                setTotalHorasFeriado={this.setTotalHorasFeriado}
                setTotalHorasNoturnas={this.setTotalHorasNoturnas}
                fastScheduleInput={this.fastScheduleInput}
                turboScheduleInputClick={this.turboScheduleInputClick}
                speed={this.props.speed}

                />
            </div>
    );
    
    }   
}
export default Workplace;