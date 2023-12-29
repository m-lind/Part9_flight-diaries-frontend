import axios from "axios";
import { useEffect, useState } from "react";
import { DiaryEntry } from "./../types";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3000/api/diaries")
      .then(response => {
        setDiaryEntries(response.data);
      });
  }, []);

  return (
    <div>
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
