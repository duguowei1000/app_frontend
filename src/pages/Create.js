import { useState } from "react";
import urlcat from "urlcat";

const BACKEND =  "http://localhost:2500"//process.env.REACT_APP_BACKEND ??;

const url = urlcat(BACKEND, "/api/holidays");
const data = { name: "mybirthday", likes: 10 };

function Create() {
    const [name, setName] = useState("");
    const [likes, setLikes] = useState(0);
    const [error, setError] = useState("")

    const createHoliday = (holiday) => {
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(holiday),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                setError(data.error)
            }
        }).catch(error => console.log(error) );
    };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const holiday = { name, likes }
        createHoliday(holiday)
      };

  return (
    <>
      <form onSubmit={handleSubmit}>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <br />
        Likes:
        <input type="number" name="likes" value={likes} onChange={(event) => setLikes(event.target.value)}/> <br />
        <p>{error}</p>
        <button>Create</button>
      </form>
    </>
  );
}

export default Create;


