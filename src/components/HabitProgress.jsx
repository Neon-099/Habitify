import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useStreakStore } from '../stores/cardStore';

const timeRanges = [
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
];


export const HabitProgress = () => {
    const [selectedRange, setSelectedRange] = useState('week');

    const {cards} = useStreakStore();

    //RESTRUCTURING TO BECOME DATA
    const habitNames = cards.map(card => card.title);
    const allDates = [...new Set(cards.flatMap(card => card.days.map(day => day.date)))].sort();

    const data = allDates.map(date => {
        const entry = {date};
        cards.forEach(card => {
            const day = card.days.find(d => d.date === date);
            entry[card.title] = day && day.checked ? 1 : 0;
        });
        return entry;
    })

    console.log(data)
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 w-full">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Habit Progress</h2>
        <div className="flex space-x-2">
          {timeRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => setSelectedRange(range.value)}
              className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-medium focus:outline-none transition-colors duration-150 text-sm ${
                selectedRange === range.value
                  ? 'bg-indigo-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Chart Container */}
      <div className="w-full h-64 sm:h-80 lg:h-96">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              {cards.map((card) => (
                <linearGradient key={card.id} id={`color-${card.id}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={card.color} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={card.color} stopOpacity={0.1}/>
                </linearGradient>
              ))}
            </defs>
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              }}
            />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              labelFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                });
              }}
            />
            <Legend />
            {cards.map((card) => (
              <Area 
                key={card.id}
                type="monotone"
                dataKey={card.title}
                stroke={card.color}
                fill={`url(#color-${card.id})`}
                strokeWidth={2}
                dot={{ fill: card.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: card.color, strokeWidth: 2 }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
