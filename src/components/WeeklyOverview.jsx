import { useState } from "react";
import WeeklyCard from "./WeeklyCard.jsx";
import WeeklyCardForm from "./WeeklyCardForm.jsx";
import WeeklyProgress from "./WeeklyProgression.jsx";
import {useStreakStore} from '../stores/cardStore.js'


const WeeklyOverview = () => {

    const {
        updateStreakOnTaskComplete,
        addCards,
        updateCardDay,
        cards
    }  = useStreakStore();

    console.log("Cards from store:", JSON.stringify(cards, null, 2));

    const [showForm, setShowForm] = useState(false);
    
    const submitCard = (newCard ) => {
        console.log("New card being submitted:", JSON.stringify(newCard, null, 2));
        addCards(newCard)
    }

    const toggleDayCheckbox = ( cardIndex, dayIndex) => {
        updateCardDay(cardIndex, dayIndex)
    }



    //HANDLE CHECKBOXES TOGGLE
    console.log(addCards)

    return (
        <div className="flex justify-center items-center flex-col ">
            <div className="flex pb-9 justify-between">
                <h1 className="text-2xl font-semibold">Weekly Overview</h1>   
                <button 
                    className="mx-19 p-2 rounded-lg hover:bg-gray-400 bg-gray-300"
                    onClick={() => setShowForm(!showForm)}
                >
                    Add habits
                </button>
            </div>
            
            
            <div className="shadow-md rounded-lg w-full mx-auto max-w-xl overflow-hidden">
                {/* HEADER ROW */}
                <div className="flex justify-between items-center border-b bg-gray-50 p-3"> 
                <span>Habit</span>
                <span>Description</span>
                <div className="gap-4 flex">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                </div>
            </div>        
            {cards.map((card, index) => (
                <WeeklyCard 
                    key={card.id || index}
                    title={card.title}
                    description={card.description}
                    days={card.days}
                    onToggle={(dayIndex) => toggleDayCheckbox(index, dayIndex)} 
                    isLast={index === cards.length -1}/>
                ))}
            </div>
        
            {showForm && (
                <WeeklyCardForm 
                    onSubmit={submitCard}
                    onClose={() => setShowForm(false)}/>
            )}

            <div>
                <WeeklyProgress tasks={cards}/>
            </div>
        </div>
    )
}

export default WeeklyOverview;