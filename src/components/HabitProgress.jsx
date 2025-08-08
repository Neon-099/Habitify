import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useStreakStore } from '../stores/cardStore';

const timeRanges = [
  { label: 'Week', value: 'week' },
  { label: 'Month', value: 'month' },
  { label: 'Year', value: 'year' },
];

// Helper function to generate date ranges
const generateDateRange = (range) => {
  const today = new Date();
  const dates = [];
  
  if (range === 'week') {
    // Generate last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
  } else if (range === 'month') {
    // Generate last 30 days
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
  } else if (range === 'year') {
    // Generate last 12 months (monthly data points)
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(today.getMonth() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
  }
  
  return dates;
};

export const HabitProgress = () => {
    const [selectedRange, setSelectedRange] = useState('week');
    const { cards } = useStreakStore();

    // Safe array handling
    const safeCards = Array.isArray(cards) ? cards : [];

    // Generate chart data based on selected range
    const chartData = useMemo(() => {
        const dateRange = generateDateRange(selectedRange);
        
        return dateRange.map(date => {
            const entry = { 
                date,
                // Format date for display
                displayDate: selectedRange === 'year' 
                    ? new Date(date).toLocaleDateString('en-US', { month: 'short' })
                    : new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            };
            
            // Add data for each card
            safeCards.forEach(card => {
                if (card.days && Array.isArray(card.days)) {
                    const day = card.days.find(d => d.date === date);
                    entry[card.title] = day && day.checked ? 1 : 0;
                } else {
                    entry[card.title] = 0;
                }
            });
            
            return entry;
        });
    }, [safeCards, selectedRange]);


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
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                {safeCards.map((card) => (
                  <linearGradient key={card.id} id={`color-${card.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={card.color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={card.color} stopOpacity={0.1}/>
                  </linearGradient>
                ))}
              </defs>
              <XAxis 
                dataKey="displayDate" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                domain={[0, 1]}
                ticks={[0, 1]}
                tickFormatter={(value) => value === 1 ? 'Done' : 'Not Done'}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                labelFormatter={(value, payload) => {
                  if (payload && payload[0]) {
                    return payload[0].payload.date;
                  }
                  return value;
                }}
                formatter={(value, name) => [value === 1 ? 'Completed' : 'Not Completed', name]}
              />
              <Legend />
              {safeCards.map((card) => (
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
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>No data available for the selected time range</p>
          </div>
        )}
      </div>
    </div>
  );
}
