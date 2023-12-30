import axios from "axios";
import { useEffect, useState } from "react";
import { DiaryEntry } from "./../types";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newVisibility, setNewVisibility] = useState("");
  const [newWeather, setNewWeather] = useState("");
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
      .then(response => {
        setDiaryEntries(response.data);
      });
  }, []);

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    axios
      .post<DiaryEntry>("http://localhost:3000/api/diaries", {
        date: newDate,
        visibility: newVisibility,
        weather: newWeather,
        comment: newComment,
      })
      .then(response => {
        setDiaryEntries(diaryEntries.concat(response.data));
      });

    setNewDate("");
    setNewVisibility("");
    setNewWeather("");
    setNewComment("");
  };

  return (
    <div>
      <form onSubmit={entryCreation}>
        <div>
          date
          <input
            value={newDate}
            onChange={event => setNewDate(event.target.value)}
          />
        </div>
        <div>
          visibility
          <input
            value={newVisibility}
            onChange={event => setNewVisibility(event.target.value)}
          />
        </div>
        <div>
          weather
          <input
            value={newWeather}
            onChange={event => setNewWeather(event.target.value)}
          />
        </div>
        <div>
          comment
          <input
            value={newComment}
            onChange={event => setNewComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      <div>
        {diaryEntries.map(entry => (
          <div key={entry.id}>
            <p>
              <b>{entry.date}</b>
            </p>
            <div>visibility: {entry.visibility}</div>
            <div>weather: {entry.weather}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
