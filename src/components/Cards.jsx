import {useEffect, useState} from 'react';
import {useStreakStore} from '../stores/cardStore.js'



export const StreakCard = ( ) => {
    
    const {
        streak,
    } = useStreakStore()

    return (
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md w-full relative overflow-hidden hover:shadow-lg transition-shadow">
        {/* Straight border design on the right */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600"></div>
        
        {/* Content */}
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">Current Streak</h2>
                {/* Flame icon */}
                <div className="bg-blue-100 p-2 rounded-lg">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
            <p className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>
                {streak} days
            </p>
            <div className="flex items-center text-xs sm:text-sm">
                <span className="text-green-500 mr-1">↑</span>
                <span className="text-green-500 font-medium">28% from last week</span>
            </div>
        </div>
    </div>
    )
}

    
const getWeekRange = (offset = 0) => {
        const today = new  Date();
        const currentDay = today.getDay();
        const monday = new Date(today);
        monday.setDate(today.getDate() - currentDay + -offset * 7);

        const week = [];
        for(let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i)
            week.push(d.toISOString().split("T")[0]);
        }

        return week;
    }

export const CompletionRateCard = () => {
    const {cards} = useStreakStore();

    const allDays = cards.flatMap(task => task.days || []);
    const completedCount = allDays.filter(task => task.checked).length;
    const total = allDays.length
    const rawProgress = total === 0 ? 0 : (completedCount / total ) * 100
    const progressionRate = Math.min(rawProgress, 100); 



    const getCompletedCountByWeek = (cards, weekDates) => {
        let count = 0;

        cards.forEach(card => { //ITERATE CARD then..
            card.days.forEach(day => { //after get card, next is days
                if(day.checked && weekDates.includes(day.date)) {
                    count++;
                }
            });
        });
        return count; //to use later on
    };

    const thisWeekDates = getWeekRange(); 
    const lastWeekDates = getWeekRange(1);

    const thisWeekCompleted = getCompletedCountByWeek(cards, thisWeekDates);
    const lastWeekCompleted = getCompletedCountByWeek(cards, lastWeekDates);

    const [weekCompleted, setWeekCompleted] = useState(false);

    //TO ENSURE THAT THE STATE IS ONLY UPDATED WHEN DEPS changes
    useEffect(() => {
       if(thisWeekCompleted > lastWeekCompleted) {
            setWeekCompleted(true);
        }   else {
            setWeekCompleted(false);
        } 
    }, [thisWeekCompleted, lastWeekCompleted]);
    

    return (
        <div className='bg-white p-4 sm:p-6 rounded-xl shadow-md w-full relative overflow-hidden hover:shadow-lg transition-shadow'>
            {/* Straight border design on the left */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-green-400 to-green-600"></div>
            
            {/* Content */}
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">Completion Rate</h2>
                    {/* Checkmark icon */}
                    <div className="bg-green-100 p-2 rounded-lg">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <p className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>
                    {Math.round(progressionRate)}%
                </p>
                <div className="flex items-center text-xs sm:text-sm">
                    <span className={` ${weekCompleted ? 'text-green-500' : 'text-red-500'} mr-1`}>{ weekCompleted ? "↑" : '↓' } </span>
                    <span className={` ${weekCompleted ? 'text-green-500' : 'text-red-500'} font-medium`}>{ thisWeekCompleted + '% from last week'}</span>
                </div>
            </div>
        </div>  
    )
}

export const TasksCard = () => {
    const {cards} = useStreakStore();

    const [activeTask, setActiveTask] = useState(0);

    useEffect(() => {           //to match only the specific condition
        const completedCards = cards.filter((card) => //fil: collects only the card where all days are checked 
            card.days.every((day) => day.checked) //check, then it will return as true
        );

        setActiveTask(completedCards.length);
    }, [cards])

    
    //TRACKS CREATED TASKS
    const isDateInWeek = (dateStr, weekDates) => {
        return weekDates.includes(dateStr);
    }

    const getNewCardsInWeek = (cards, weekDates) => {
        return cards.filter(card => weekDates.includes(card.createdAt.split("T")[0]))
    }

    const thisWeekDates = getWeekRange(0);

    const newCards = getNewCardsInWeek(cards, thisWeekDates);
    const newCardsCount = newCards.length;

    return (
        <div className='bg-white p-4 sm:p-6 rounded-xl shadow-md w-full relative overflow-hidden hover:shadow-lg transition-shadow'>
            {/* Straight border design on the left */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-orange-600"></div>
            
            {/* Content */}
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">Active Habits</h2>
                    {/* List/Tasks icon */}
                    <div className="bg-orange-100 p-2 rounded-lg">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <p className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>
                    {cards.length - activeTask} 
                </p>
                <div className="flex items-center text-xs sm:text-sm">
                    <span className="text-green-500 mr-1">+</span>
                    <span className="text-green-500 font-medium">{newCardsCount} new this week</span>
                </div>
            </div>
        </div>  
    )
}

export const AchievementsCard = () => {
    const {highestStreak} = useStreakStore();
    
    return (
        <div className='bg-white p-4 sm:p-6 rounded-xl shadow-md w-full relative overflow-hidden hover:shadow-lg transition-shadow'>
            {/* Straight border design on the left */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 to-yellow-600"></div>
            
            {/* Content */}
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">Highest Streak</h2>
                    {/* Trophy icon */}
                    <div className="bg-yellow-100 p-2 rounded-lg">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2L7.5 4H4a1 1 0 00-1 1v3a1 1 0 001 1h.5L6 12.5V16a1 1 0 001 1h6a1 1 0 001-1v-3.5L15.5 9H16a1 1 0 001-1V5a1 1 0 00-1-1h-3.5L10 2zM8 8a2 2 0 114 0 2 2 0 01-4 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <p className='text-2xl sm:text-3xl font-bold text-gray-800 mb-2'>
                    {highestStreak}
                </p>
            </div>
        </div>  
    )
} 

export const TaskCard = ( {title, description, color} ) => {
    return (
         <div className='bg-white p-4 sm:p-6 rounded-xl shadow-md w-full relative overflow-hidden hover:shadow-lg transition-shadow'>
            {/* Straight border design on the left */}
            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b`}style={{
    background: `linear-gradient(to right, ${color}, ${color})`
    }}></div>
            
            {/* Content */}
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">{title}</h2>
                    {/* Checkmark icon */}
                    <div className="bg-green-100 p-2 rounded-lg">
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="text-sm text-gray-600">
                    <span>{description}</span>
                </div>
            </div>
        </div>  
    )
}
