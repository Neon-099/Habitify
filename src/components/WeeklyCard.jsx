

const WeeklyCard = ( {title, description, days, onToggle, isLast} ) => {
     // Add safety check
    if (!days || !Array.isArray(days)) {
        console.error("WeeklyCard received invalid days prop:", days);
        return (
            <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 ${!isLast ? 'border-b border-gray-200' : ''} hover:bg-gray-50 transition-colors`}>
                <div className="flex-1 mb-2 sm:mb-0">
                    <h3 className="text-sm sm:text-base font-medium text-gray-900">{title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:hidden">{description}</p>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block flex-1">{description}</p>
                <div className="flex gap-2 sm:gap-4 justify-end">
                    <span className="text-red-500 text-xs">Error: Invalid days data</span>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 ${!isLast ? 'border-b border-gray-200' : ''} hover:bg-gray-50 transition-colors`}>
            <div className="flex-1 mb-2 sm:mb-0">
                <h3 className="text-sm sm:text-base font-medium text-gray-900">{title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:hidden">{description}</p>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 hidden sm:block flex-1">{description}</p>

            <div className="flex gap-2 sm:gap-4 justify-end">
                {days.map((day, i) => (
                    <label key={i} className="flex items-center justify-center">
                        <input 
                            type="checkbox"
                            checked={day.checked}
                            onChange={() => onToggle(i)}
                            className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2"
                        />
                    </label>    
                ))}
            </div>
        </div>
    )
}

export default WeeklyCard;