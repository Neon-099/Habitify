import { useState } from "react";
import {left, right} from '../assets'

const Calendar = () => {

const today = new Date(); //initialize DATE
const [currentYear, setCurrentYear] = useState(today.getFullYear());
const [currentMonth, setCurrentMonth]  = useState(today.getMonth());

//GET FIRST DAY OF THE MONTH 
const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

//FOR CALENDAR DAYS
const daysArray = [];

//TO ADD EMPTY SLOTS BEFORE FIRST DAY
for(let day = 1; day < firstDayOfMonth; day++) {
    daysArray.push(null);
}

//ADD ACTUAL DAYS
for(let day = 1; day <= daysInMonth; day++) {
    daysArray.push(day);
}

const handleCurrentChange = () => {
    if(currentMonth === 0) {
        setCurrentMonth(11); 
        setCurrentYear((prev) => prev - 1);
    }   else {
        setCurrentMonth((prev) => prev - 1)
    }
}

    
//HANDLE MONTH CHANGE
const handleMonthChange = () => {
    if(currentMonth === 11) {
        setCurrentMonth(0); 
        setCurrentYear((prev) => prev + 1);
    }   else {
        setCurrentMonth((prev) => prev + 1)
    }
}

//ARROW WITH IMPLICIT RETURN: it auto returns the result of an expression (day)
const isToday = (day) =>  //becuz if have {} it will return always as undefined
    day === today.getDate() && 
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

    return (
        <div className="flex justify-center items-center flex-col w-full mx-auto max-w-md">
            <div className="flex flex-row justify-between items-center mb-4">
                {/*HEADER*/}
                <div className="pr-8 py-3">
                    <button
                        onClick={handleCurrentChange} 
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded">
                        <img src={left} alt="" />
                    </button>
                </div>
                <h2 className="text-2xl w-38  text-center">
                {new Date(currentYear, currentMonth).toLocaleDateString('default',
                    {   
                        month: 'long',
                        year: 'numeric', 
                    }
                )}
                </h2>
                <div className="px-3">
                    <button
                        onClick={handleMonthChange} 
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded">
                        <img src={right} alt="" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center items-center py-5">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="font-bold text-sm text-gray-500">
                        {day}
                    </div>
                ))}
                {daysArray.map((day, index) => (
                    <div key={index} className={`h-10 w-10 flex items-center justify-center rounded-full ${
                        isToday(day) 
                            ? 'bg-blue-500' : 'bg-white'
                    }`}>
                        {day || ''}
                    </div>
                ))}
            </div>
        </div>    
    )
}


export default Calendar;