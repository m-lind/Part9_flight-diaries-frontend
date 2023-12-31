import axios from "axios";
import { useEffect, useState } from "react";
import { DiaryEntry, Visibility, Weather } from "./../types";
import Notification from "./components/Notification";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newVisibility, setNewVisibility] = useState<Visibility>(
    Visibility.Great
  );
  const [newWeather, setNewWeather] = useState<Weather>(Weather.Sunny);
  const [newComment, setNewComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
      .then(response => {
        setDiaryEntries(response.data);
      });
  }, []);

  const notify = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
  };

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
        setNewDate("");
        setNewVisibility(Visibility.Great);
        setNewWeather(Weather.Sunny);
        setNewComment("");
      })

      .catch(error => {
        if (axios.isAxiosError(error)) {
          notify(error.response?.data);
        } else {
          console.log(error);
        }
      });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <Notification message={errorMessage} />
      <form onSubmit={entryCreation}>
        <div>
          date
          <input
            type="date"
            value={newDate}
            onChange={event => setNewDate(event.target.value)}
          />
        </div>
        <div>
          visibility {Visibility.Great}
          <input
            name="visibility"
            type="radio"
            value={newVisibility}
            onChange={() => setNewVisibility(Visibility.Great)}
            checked={newVisibility === Visibility.Great}
          />
          {Visibility.Good}
          <input
            name="visibility"
            type="radio"
            value={newVisibility}
            onChange={() => setNewVisibility(Visibility.Good)}
            checked={newVisibility === Visibility.Good}
          />
          {Visibility.Ok}
          <input
            name="visibility"
            type="radio"
            value={newVisibility}
            onChange={() => setNewVisibility(Visibility.Ok)}
            checked={newVisibility === Visibility.Ok}
          />
          {Visibility.Poor}
          <input
            name="visibility"
            type="radio"
            value={newVisibility}
            onChange={() => setNewVisibility(Visibility.Poor)}
            checked={newVisibility === Visibility.Poor}
          />
        </div>
        <div>
          weather {Weather.Sunny}
          <input
            name="weather"
            type="radio"
            value={newWeather}
            onChange={() => setNewWeather(Weather.Sunny)}
            checked={newWeather === Weather.Sunny}
          />
          {Weather.Rainy}
          <input
            name="weather"
            type="radio"
            value={newWeather}
            onChange={() => setNewWeather(Weather.Rainy)}
            checked={newWeather === Weather.Rainy}
          />
          {Weather.Cloudy}
          <input
            name="weather"
            type="radio"
            value={newWeather}
            onChange={() => setNewWeather(Weather.Cloudy)}
            checked={newWeather === Weather.Cloudy}
          />
          {Weather.Stormy}
          <input
            name="weather"
            type="radio"
            value={newWeather}
            onChange={() => setNewWeather(Weather.Stormy)}
            checked={newWeather === Weather.Stormy}
          />
          {Weather.Windy}
          <input
            name="weather"
            type="radio"
            value={newWeather}
            onChange={() => setNewWeather(Weather.Windy)}
            checked={newWeather === Weather.Windy}
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
