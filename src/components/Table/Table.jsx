import React, { useState, useEffect } from "react";
import { getRandomInt } from "./../../utils/utils";
import "./style.css";

function Table({ list: propsList = [] }) {
  const [list, setList] = useState(JSON.parse(JSON.stringify(propsList)));
  const [stopInterval, setStopInterval] = useState();
  const [borderWidth, setborderWidth] = useState(`0px`);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("dd");
      const unActiveItems = list.filter((item) => !item.active);
      const randomIndex = getRandomInt(0, unActiveItems.length);
      const unActiveItem = unActiveItems[randomIndex];

      setList((prevState) =>
        prevState.map((item, index) => {
          if (item === unActiveItem) item.active = true;
          return item;
        })
      );
    }, 1500);
      setStopInterval(interval);
      return () => {
          console.log('2');
          clearInterval(interval);
      }
  }, []);

  useEffect(() => {
    const unActiveItems = list.filter((item) => !item.active);

    if (!unActiveItems.length) {
      clearInterval(stopInterval);
      setborderWidth(`2px`);
    }
  }, [list]);
    
//функція яка принімає класи джоін їх розділя
  const trClass = (item) => {
    const classes = [];
    item.active && classes.push(`active`);
    return classes.join(" ");
  };

  return list.length ? (
    <table style={{ borderWidth }}>
      <tbody>
        {list.map((item, index) => (
          <tr key={index} className={trClass(item)}>
            <td>{item.type}</td>
            <td>{item.icon}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : null;
}

export default Table;
