import './ScheduleList.css';

const ScheduleList = ({schedules, selectSchedule, addSchedule, changeSchedule, removeSchedule, vigilantes}) => {
    return (
        <div className="scheduleList">
        <p>ScheduleList</p>
        <div>
            <input id='insertScheduleID' type='text' placeholder='ID' className='scheduleListId'></input>
            <input
                id='insertScheduleStart'
                type='date'>
            </input>
            <input
                id='insertScheduleEnd'                            
                type='date'>
            </input>
            <button
            onClick={()=> {
                const id = Number(document.querySelector("#insertScheduleID").value)
                const start = document.querySelector("#insertScheduleStart").value
                const end = document.querySelector("#insertScheduleEnd").value
                schedules.filter(schedule => schedule.id === id).length ?
                alert('invalid ID') :
                addSchedule({id, start, end, vigilantes})
                document.querySelector("#insertScheduleID").value = ''
                document.querySelector("#insertScheduleStart").value = ''
                document.querySelector("#insertScheduleEnd").value = ''
                document.getElementById('insertHoras').style.boxShadow="0px 0px 25px 4px rgb(0, 255, 175)";
            }} 
            className='add-schedule-insert'>
            +
            </button>
     
        </div>
        <div className='scheduleList-sub'>
            {schedules.map(schedule => {
                return(
                    <div className='single-schedule' key={schedule.id}>
                        <input type='text' placeholder='ID' className='scheduleListId' defaultValue={schedule.id}></input>
                        <input  
                            type='date' 
                            defaultValue = {schedule.start}
                            onChange={(event)=>{
                                changeSchedule(schedule.id, "start", event)
                                document.getElementById('insertHoras').style.boxShadow="0px 0px 25px 4px rgb(0, 255, 175)"
                                }}>
                        </input>
  
                        <input                             
                            type='date' 
                            defaultValue = {schedule.end}
                            onChange={(event)=>{
                                changeSchedule(schedule.id, "end", event)
                                document.getElementById('insertHoras').style.boxShadow="0px 0px 25px 4px rgb(0, 255, 175)"
                                }} >
                        </input>
                        <label className="select-schedule">
                            <input
                            type="radio"
                            name="select-schedule" 
                            className="select-schedule-radio"
                            onClick={() => {
                                selectSchedule(schedule.id)
                                }}>
                            </input>
                        </label>
                        <button 
                            className='schedule-delete'
                            onClick={()=> {
                                removeSchedule(schedule.id)
                                document.getElementById('insertHoras').style.boxShadow="0px 0px 25px 4px rgb(0, 255, 175)"
                                }}>
                            -
                        </button>
                    </div>
                )
            }).reverse()
            }

        </div>       
    </div>
 )
}

export default ScheduleList;