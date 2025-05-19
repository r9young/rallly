import React from 'react';

/**
 * Minimal calendar example that toggles numbers in an array.
 */
export default function SimpleCalendar() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const [selected, setSelected] = React.useState<number[]>([]);

  const toggle = (day: number) => {
    setSelected(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  return (
    <div className="grid grid-cols-7 gap-1 w-64">
      {days.map(day => (
        <button
          key={day}
          onClick={() => toggle(day)}
          className={`h-10 border rounded ${
            selected.includes(day) ? 'bg-blue-100' : 'bg-white'
          }`}
        >
          {day}
        </button>
      ))}
    </div>
  );
}
