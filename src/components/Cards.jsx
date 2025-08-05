import {useEffect, useState} from 'react';
import {useStreakStore} from '../stores/cardStore.js'

export const StreakCard = ( ) => {

    const {
        streak,
        lastCompletedDate
    } = useStreakStore()

    return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-lg font-bold mb-2">Daily Streak</h2>
        <p className='text-md font-bold text-orange-300'>
            {streak} day {streak !== 1 && 's'}
        </p>
        <p className='text-sm text-gray-400'>
            Last completed: {lastCompletedDate || '_'}
        </p>
    </div>
    )
}

