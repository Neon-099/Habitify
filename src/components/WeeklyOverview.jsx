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
        <div className="w-full max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 sm:pb-9 space-y-4 sm:space-y-0">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Weekly Overview</h1>   
                <button 
                    className="px-4 py-2 rounded-lg hover:bg-indigo-600 bg-indigo-500 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setShowForm(!showForm)}
                >
                    Add habits
                </button>
            </div>
            
            
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                {/* HEADER ROW */}
                <div className="flex justify-between items-center border-b bg-gray-50 p-3 sm:p-4"> 
                    <span className="font-medium text-gray-900 text-sm sm:text-base">Habit</span>
                    <span className="font-medium text-gray-900 text-sm sm:text-base hidden sm:block">Description</span>
                    <div className="gap-2 sm:gap-4 flex">
                        <span className="text-xs sm:text-sm font-medium text-gray-600">Mon</span>
                        <span className="text-xs sm:text-sm font-medium text-gray-600">Tue</span>
                        <span className="text-xs sm:text-sm font-medium text-gray-600">Wed</span>
                        <span className="text-xs sm:text-sm font-medium text-gray-600">Thu</span>
                        <span className="text-xs sm:text-sm font-medium text-gray-600">Fri</span>
                        <span className="text-xs sm:text-sm font-medium text-gray-600">Sat</span>
                        <span className="text-xs sm:text-sm font-medium text-gray-600">Sun</span>
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

            <div className="mt-6 sm:mt-8">
                <WeeklyProgress tasks={cards}/>
            </div>
        </div>
    )
}

export default WeeklyOverview;