

const WeeklyCard = ( {title, description, days, onToggle, isLast} ) => {
     // Add safety check
    if (!days || !Array.isArray(days)) {
        console.error("WeeklyCard received invalid days prop:", days);
        return (
            <div className={`flex justify-between items-center p-3 ${!isLast ? 'border-b' : ''} `}>
                <h3 className="text-md text-gray-700">{title}</h3>
                <p className="text-sm pr-8 text-[#639154]">{description}</p>
                <div className="gap-7 flex accent-[#639154]">
                    <span className="text-red-500">Error: Invalid days data</span>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex justify-between items-center p-3 ${!isLast ? 'border-b' : ''} `}>
            <h3 className="text-md text-gray-700">{title}</h3>
            <p className="text-sm pr-8 text-[#639154]">{description}</p>

            <div className="gap-7 flex accent-[#639154]">
                {days.map((day, i) => (
                    <label key={i}>
                        <input 
                            type="checkbox"
                            checked={day.checked}
                            onChange={() => onToggle(i)}
                        />
                    </label>    
                ))}
            </div>
        </div>
    )
}

export default WeeklyCard;