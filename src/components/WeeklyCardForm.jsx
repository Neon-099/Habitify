import { useState } from "react";
import { format, addDays, startOfWeek } from "date-fns";

const WeeklyCardForm = ( {onClose, onSubmit} ) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
        
        
    const handleSubmit = (e) => {
    e.preventDefault();
    
    //GET CURRENT WEEKS
    const weekStart = startOfWeek(new Date(), {weekStartsOn: 1});
    const days = Array.from({length: 7}, (_, i) => {
        const date = addDays(weekStart, i)
        return {
            label: format(date, 'EEE', 'MMM d'),
            date: format(date, 'yyyy-MM-dd'),
            checked: false,
        };
    });

    
    //PUSH ALL THE VALUES OF state
    onSubmit({
            title, 
            description,
            days
        });
        console.log("Title:", title);
        console.log("Description:", description);

        onClose();
    }
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl w-full max-w-md relative max-h-[90vh] overflow-y-auto">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
                    onClick={onClose}
                    aria-label="Close form"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-gray-900">Create a new habit</h2>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                            placeholder="Enter habit title"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none"
                            rows="3"
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter habit description"
                        />
                    </div>
                    
                    <div className="flex space-x-3 pt-2">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                        >
                            Create Habit
                        </button>
                    </div>
                </form>  
            </div>
        </div>
    );
};

export default WeeklyCardForm;