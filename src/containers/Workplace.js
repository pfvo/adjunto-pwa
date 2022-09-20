import ScheduleList from "../components/ScheduleList/ScheduleList";
import Schedule from "../components/Schedule/Schedule";
import { Component } from "react";
import VigList from "../components/VigList/VigList";
import Horarios from "../components/Horarios/Horarios";

const initialState = {
    workplace: 'hotel',
    type: 'TDA',
    vigilantes: [
        {
            mec: '2600',
            nome: 'Luis Humberto Costa Ramos',
            rows: [0]
        },
        {
            mec: '2601',
            nome: 'Pedro Filipe Viana Oliveira',
            rows: [0]
        },
        {
            mec: '2629',
            nome: 'Rafael Miguel Santos',
            rows: [0]
        },
        {
            mec: '2620',
            nome: 'João Romão',
            rows: [0]
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
            end: "08:00"
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
                    rows: [0]
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
                    '1-2601': 'B',
                    '1-2629': 'C'
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
        console.log(this.state)
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
    
    setTotalHoras = (vig, total) => {
        const changeTotalHoras = this.state.schedules.map(schedule => {
            if (schedule.id === this.state.selectedSchedule.id) {
                const changedVig = schedule.vigilantes.map(vigilante => {
                    if (vigilante.mec === vig.mec) {
                        return {...vigilante, horas: total}
                    } else {
                        return vigilante
                    }
                })
                return {...schedule, vigilantes: changedVig}
            } else {
                return schedule
            }
        })
        this.setState({schedules: changeTotalHoras}, ()=>console.log(this.state.schedules))
        console.log(this.state.schedules)
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

    

    render() {
        return (
            <div>
            {/* {console.log(this.props.Temporal.ZonedDateTime.from({
                year: 2022,
                month: 7,
                day: 1,
                timeZone: 'Europe/Lisbon',
                hour:0
                })
                .until(this.props.Temporal.ZonedDateTime.from({
                    year: 2022,
                    month: 7,
                    day: 31,
                    timeZone: 'Europe/Lisbon',
                    hour:24
            }
                    )).round({ smallestUnit: "days" }).days)} */}

                    

            <h1>{this.state.workplace}</h1>
            <div style={{display: 'flex', justifyContent:'space-evenly'}}>
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
                horas={this.state.horas}

                />
            </div>
    );
    
    }   
}
export default Workplace;