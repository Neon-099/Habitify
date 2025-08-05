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
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-300"
                    onClick={onClose}>
                        Close
                </button>

                <h2 className="text-lg font-bold mb-4">Create a tasks</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label className="block font-semibold">Title</label>
                        <input 
                            className="border rounded-md"
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                    </div>

                    <div>
                        <label className="block font-semibold">Description</label>
                        <textarea 
                            className="w-full p-2 border rounded"
                            type="text" 
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        >
                        </textarea>
                    </div>
                    
                    <button 
                        type="submit"
                        className="w-full bg-green-600 text-white rounded px-4 py-2">
                            Submit
                    </button>
                </form>  
            </div>
        </div>
    );
};

export default WeeklyCardForm;