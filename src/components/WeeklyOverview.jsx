import { useState } from "react";
import {format, addDays, startOfWeek} from 'date-fns';


const WeeklyOverview = () => {
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    //GET CURRENT WEEKS
    const weekStart = startOfWeek(new Date(), {weekStartsOn: 1});
    const days = Array.from({length: 7}, (_, i) => {
        const date = addDays(weekStart, i)
        return {
            label: format(date, 'EEE', 'MMM d'),
            date: format(date, 'yyyy-MM-dd'),
        };
    });


    return (
        <div className="flex justify-center items-center flex-col ">
            <div className="flex flex-row pb-9   items-center justify-between">
                <h1 className="text-2xl text-start">Weekly Overview</h1>   
                <button 
                    className="mx-19 p-2 rounded-lg hover:bg-gray-400 bg-gray-300"
                    onClick={() => setShowForm(!showForm)}
                >
                    Add task
                </button>
            </div>
            
            <div className=" rounded-lg border w-full mx-auto max-w-xl"> 
                <span>Habit</span>
                <span>Description</span>
            </div>

            {showForm && (
                <form className="border ">
                    <div className="flex flex-col border">
                        <label>Title</label>
                        <input 
                        type="text"
                        placeholder="title" 
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)} 
                    />
                    </div>
                    
                    <div>
                        <label>Description</label>
                       <textarea
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} 
                    /> 
                    </div>
                    
                    <div>
                        <label className="-block font-semibold mb-2">
                            <div>
                                {days.map((day, i) => (
                                    <div key={i} className="flex items-center space-x-1">
                                        <input type="checkbox" />
                                    </div>
                                ))} 
                            </div>
                        </label>
                    </div>

                    <button type="submit" className="bg-gray-300 text-black px-4 py-2">
                        Submit
                    </button>
                </form>
            )}
        </div>
    )
}

export default WeeklyOverview;