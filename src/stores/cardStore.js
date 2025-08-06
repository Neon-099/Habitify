import {create } from 'zustand';
import {persist} from 'zustand/middleware';

const getTodayDate = () => new Date().toISOString().split('T')[0];

const getYesterdayDate = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};


// Utility to generate a consistent HSL/Hex color
const generateColor = (index) => {
  const hue = (index * 137.508) % 360;
  return `hsl(${hue}, 70%, 60%)`; // or convert to hex if needed
};

//FREQUENCY TRACKERS(WEEKLY, MONTHLY, YEARLY)
const getFrequencyByDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const isSameWeek = (d1, d2) => {
        const startOfWeek = (d) => {
            const day = d.getDate();
            const diff = d.getDate() - day + (day === 0 ? -6 : 1);
            return new Date(d.getFullYear(), d.getMonth(), diff)
        }

        return startOfWeek(d1).toDateString() === startOfWeek(d2).toDateString();
    }

    if(isSameWeek(date, now)) return "weekly";
    if(date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()) return "monthly";
    if(date.getFullYear() === now.getFullYear()) return "yearly";

    return "yearly";
}

export const useStreakStore = create(
    persist(
        (set, get) => ({
            streak: 0,
            highestStreak: 0,
            lastCompletedDate: '',
            cards: [],

            updateStreakOnTaskComplete: () => {
                const today = getTodayDate();
                const yesterday = getYesterdayDate();
                const last = get().lastCompletedDate;

                //CHECK IF ALREADY COUNT TODAY
                if(last === today) return; //prevent double counting

                if(last === yesterday) {
                    const newStreak = get.call().streak + 1
                    set({
                        streak: newStreak,
                        highestStreak: Math.max(get().highestStreak, newStreak),
                        lastCompletedDate: today, // Fixed typo
                    });
                } else {
                    set({
                        streak: 1, //to reset to 1 if missed a day
                        highestStreak: Math.max(get().highestStreak, 1),
                        lastCompletedDate: today,
                    })
                }
            },
            
            //ADD NEW CARD TO THE LIST
            addCards: (card) => 
                set((state) => {
                    const index = state.cards.length;
                    const createdAt = new Date().toISOString();
                    const frequency = getFrequencyByDate(createdAt);

                    const newCard = {
                        ...card,
                        id: crypto.randomUUID(),
                        createdAt: new Date().toISOString(),
                        color: generateColor(index),
                        frequency,
                    };
                    return {
                        cards:[...state.cards, newCard],
                    }
                }),

            //UPDATE CARD DAYS
            updateCardDay: (cardIndex, dayIndex) => set((state) => ({
                cards: state.cards.map((card, i) => 
                    i === cardIndex ? {
                        ...card,
                        days: card.days.map((day, j) => 
                            j === dayIndex ? {...day, checked: !day.checked} : day
                        ),
                    }
                    : card
                )
            }))
        }),
            //MIGRATION
         {
            name: 'streak-storage',
            // Add migration to fix existing data
            migrate: (persistedState, version) => {
                if (persistedState && persistedState.cards) {
                    // Ensure all existing cards have days property
                    persistedState.cards = persistedState.cards.map(card => ({
                        ...card,
                        days: card.days || []
                    }));
                }
                return persistedState;
            }
        }
    )
)