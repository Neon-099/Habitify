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
export const getFrequencyByDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const isSameWeek = (d1, d2) => {
        const startOfWeek = (d) => {
            const day = d.getDay();
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

//TO GENERATE DAYS FOR THE CURRENT WEEK
const generateDaysForFrequency = (frequency) => {
    const days = [];
    const today = new Date();
    if(frequency === "weekly") {
        //GET START OF WEEK(sunday)
        const start = new Date(today);
        start.setDate(today.getDate() - today.getDay());
        for(let i = 0; i < 7; i++) {
            const date = new Date(start);
            date.setDate(start.getDate() + i);
            days.push({date: date.toISOString().split('T')[0], checked: false});
        }
    }
    //ADD LOGIC FOR MONTHLY/YEARLY 
    return days;
}

export const useStreakStore = create(
    persist(
        (set, get) => ({
            cards: [], // Initialize cards array
            streak: 0,
            highestStreak: 0,
            lastCompletedDate: '',

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
                    const days = generateDaysForFrequency(frequency)

                    const newCard = {
                        ...card,
                        id: crypto.randomUUID(),
                        createdAt: new Date().toISOString(),
                        color: generateColor(index),
                        frequency,
                        lastCompletedDate: '', 
                        days,
                    };
                    return {
                        cards:[...state.cards, newCard],
                    }
                }),

            //UPDATE CARD DAYS
            completedCardToday: (cardIndex) => set((state) => {
                const today = getTodayDate();
                return {
                    cards: state.cards.map((card, index) => 
                        index === cardIndex && card.lastCompletedDate !== today
                            ? {
                                ...card, lastCompletedDate: today,
                            } 
                        : card
                    )
                }
            }),
            //UPDATE CARD DAY CHECKED STATE
            updateCardDay: (cardIndex, dayIndex) => set((state) => {
                return {
                    cards: state.cards.map((card, cIdx) => {
                        if (cIdx !== cardIndex) return card;
                        return {
                            ...card,
                            days: card.days.map((day, dIdx) =>
                                dIdx === dayIndex ? { ...day, checked: !day.checked } : day
                            )
                        };
                    })
                };
            }),

            //DELETE CARD
            deleteCard: (cardId) => set((state) => ({
                cards: state.cards.filter((card) => card.id !== cardId) //filter: includes the items that do not match
            }))
        }),
        {
            name: 'streak-storage',
            // Add migration to fix existing data
        }
    )
)