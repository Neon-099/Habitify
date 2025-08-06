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
        <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <div className="flex flex-row justify-between items-center mb-6">
                {/*HEADER*/}
                <div className="pr-4 sm:pr-8">
                    <button
                        onClick={handleCurrentChange} 
                        className="p-2 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <img src={left} alt="Previous month" className="w-4 h-4" />
                    </button>
                </div>
                <h2 className="text-lg sm:text-2xl font-semibold text-gray-900 text-center flex-1">
                {new Date(currentYear, currentMonth).toLocaleDateString('default',
                    {   
                        month: 'long',
                        year: 'numeric', 
                    }
                )}
                </h2>
                <div className="pl-4 sm:pl-8">
                    <button
                        onClick={handleMonthChange} 
                        className="p-2 sm:p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        <img src={right} alt="Next month" className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center items-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="font-semibold text-xs sm:text-sm text-gray-500 py-2">
                        {day}
                    </div>
                ))}
                {daysArray.map((day, index) => (
                    <div key={index} className={`h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full text-sm sm:text-base font-medium transition-colors ${
                        isToday(day) 
                            ? 'bg-indigo-500 text-white shadow-md' 
                            : day 
                                ? 'hover:bg-gray-100 text-gray-700' 
                                : 'text-transparent'
                    }`}>
                        {day || ''}
                    </div>
                ))}
            </div>
        </div>    
    )
}


export default Calendar;