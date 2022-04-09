import { useEffect, useState } from "react";
import urlcat from "urlcat";
import { BACKEND } from "../utils/utils"

function HolidayList() {
    const [holidays,setHolidays]= useState([])


    useEffect(() => {
        fetch(urlcat(BACKEND, "/api/holidays/"))
          .then((response) => response.json())
          .then((data) => setHolidays(data));
      }, []);

      const handleDelete = (id) => () => {
        const url = urlcat(BACKEND, `/api/holidays/${id}`);
        fetch(url, { method: "DELETE" })
          .then((response) => response.json())
          .then((data) => console.log(data));
      };
      const handleUpdate = (holiday) => () => {
        const url = urlcat(BACKEND, `/api/holidays/${holiday._id}`);
        const newHoliday = { ...holiday, likes: holiday.likes + 10 }
        
        fetch(url, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newHoliday),
          })
          .then((response) => response.json())
          .then((data) => console.log(data));
      };

    return (
        <>
            <ul>
                {holidays.map((holiday) =>(
                    <li key = {holiday._id}>
            {holiday.name} --{" "}
            <span onClick={handleUpdate(holiday)}>{holiday.likes}</span>
            --
                    <a href="/">{holiday.name}</a>{ " -- "}
                    <span onClick={handleDelete(holiday._id)}>Delete</span>
                    </li>

                ))}
                
            </ul>
        </>
    )
}

export default HolidayList;