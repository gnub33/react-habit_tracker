import { eachDayOfInterval, endOfWeek, format, isFuture, isSameDay, startOfWeek } from "date-fns"
import Button from "./Button"

export type Habit = { id: string; name: string; completions: Date[]}

type HabitListProps = {
    habits: Habit[]
    deleteHabit: (id: string) => void
    toggleHabit: (id: string, date: Date) => void
    
}

export function HabitList({habits, deleteHabit, toggleHabit}: HabitListProps) {

    if (habits.length === 0 ) {
        return (<p className="text-center text-zinc-500 py-12">No habits yet. Add one above to get started!</p>)
    }

    return (
        <div className="flex flex-col gap-3">
        {habits.map(habit => (
            //when looping through array to render elements, always add
            // UNIQUE key property, usually an id
           <HabitItem deleteHabit={deleteHabit} toggleHabit={toggleHabit} key={habit.id} habit={habit} />
        ))}
    </div>
    )
}

type HabitItemProps = {
    habit: Habit
    deleteHabit: (id: string) => void
    toggleHabit: (id: string, date: Date) => void
}

function HabitItem( {habit, deleteHabit, toggleHabit}: HabitItemProps) {
    const visibleDates = eachDayOfInterval({
        start: startOfWeek(new Date(), {weekStartsOn: 1}),
        end: endOfWeek(new Date(), {weekStartsOn: 1}),
    })
    return <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
        <div className="flex items-center justify-between">
            <div className="flex gap-3 items-center">
                <span className="font-medium">{habit.name}</span>
                <span className="text-sm text-amber-400">🔥 3</span>
            </div>
            <Button onClick={() => deleteHabit(habit.id)} variant="ghost-destructive" className="text-sm">Delete</Button>
        </div>
        <div className="flex gap-1.5">
            {visibleDates.map(date => (
                <Button 
                    className="flex flex-1 flex-col items-center gap-0.5 rounded-lg text-xs" key={date.toISOString()} 
                    disabled={isFuture(date)}
                    onClick={()=> toggleHabit(habit.id, date)}
                    variant={habit.completions.some(d => isSameDay(date, d)) 
                        ? "primary" 
                        : "secondary"
                    }
                >
                    <span className="font-medium">{format(date, "EEE")}</span>
                    <span>{format(date, "d")}</span>
                </Button>
            ))}
        </div>
    </div>
}
 