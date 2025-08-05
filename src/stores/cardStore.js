import {create } from 'zustand';
import {persist} from 'zustand/middleware';

const getTodayDate = () => new Date().toISOString().split('T')[0];

const getYesterdayDate = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
};

export const useStreakStore = create(
    persist(
        (set, get) => ({
            streak: 0,
            lastCompletedDate: '',
            cards: [],

            updateStreakOnTaskComplete: () => {
                const today = getTodayDate();
                const yesterday = getYesterdayDate();
                const last = get().lastCompletedDate;

                //CHECK IF ALREADY COUNT TODAY
                if(last === today) return;

                if(last === yesterday) {
                    set({
                        streak: get().streak + 1,
                        lastCompletedDate: today, // Fixed typo
                    });
                } else {
                    set({
                        streak: 1,
                        lastCompletedDate: today,
                    })
                }
            },
            
            //ADD NEW CARD TO THE LIST
            addCards: (card) => set((state) => ({
                cards: [...state.cards, {
                    ...card,
                    id: crypto.randomUUID(),
                    createdAt: new Date().toISOString(),
                }],
            })),

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