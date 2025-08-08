import { useState } from "react";
import {useStreakStore} from '../stores/cardStore.js'
import {TaskCard } from '../components/Cards.jsx'
import WeeklyCardForm from '../components/WeeklyCardForm.jsx'



const WeeklyOverview = () => {

    const {
        addCards,
        updateCardDay,
        cards,
        deleteCard,
    }  = useStreakStore();

    const [showForm, setShowForm] = useState();
    
    const submitCard = (newCard ) => {
        console.log("New card being submitted:", JSON.stringify(newCard, null, 2));
        addCards(newCard)
    }

    //HANDLE CHECKBOXES TOGGLE
    console.log(addCards)
    console.log(cards)

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-6 sm:pb-9 space-y-4 sm:space-y-0">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Tasks</h1>   
                <button 
                    className="px-4 py-2 rounded-lg hover:bg-indigo-600 bg-indigo-500 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setShowForm(!showForm)}
                >
                    Add habits
                </button>
            </div>
            
            {showForm && 
                <WeeklyCardForm 
                    onClose={() => setShowForm(false)}
                    onSubmit={submitCard}
                />
            }

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {cards.map((card, cardIdx) => {
                    const today = new Date().toISOString().split('T')[0];
                    const todayIndex = card.days ? card.days.findIndex(day => day.date === today) : -1;
                    const isTodayChecked = todayIndex >= 0 && card.days[todayIndex]?.checked;
                    
                    return (
                        <TaskCard
                            key={card.id}
                            title={card.title}
                            description={card.description}
                            color={card.color}
                            checked={isTodayChecked}
                            onToggle={() => {
                                // Only toggle today's day
                                if (todayIndex >= 0) {
                                    updateCardDay(cardIdx, todayIndex);
                                }
                            }}
                            onDelete={() => deleteCard(card.id)}
                        />
                    );
                })}
            </div>
        </div>
    )
}

export default WeeklyOverview;