import React from 'react';

import DayListItem from 'components/DayListItem';

export default function DayList(props) {

  // Functions
  const dayList = props.days.map(day => {
    return (
      <DayListItem
        key={day.id}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
      />
    );
  });

  // Template
  return (
    <ul>
      {dayList}
    </ul>
  );

} 