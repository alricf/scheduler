import React from "react";

import "components/DayListItem.scss";

import classNames from "classnames";

export default function DayListItem(props) {

  // Functions
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = () => {
    let spotText = `${props.spots} spots remaining`;
    if (props.spots === 0) {
      spotText = `no spots remaining`;
    }
    if (props.spots === 1) {
      spotText = `${props.spots} spot remaining`;
    }
    return spotText;
  };

  // Template
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );

}