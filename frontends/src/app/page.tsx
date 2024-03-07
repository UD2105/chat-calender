"use client"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

export default function Calendar() {
  return (
    <FullCalendar
      plugins={[ dayGridPlugin ]}
      initialView="dayGridWeek"
      weekends={false}
      events={[
        { title: 'event 1', date: '2024-03-015' },
        { title: 'event 2', date: '2024-03-16' }
      ]}
    />

  )
}


