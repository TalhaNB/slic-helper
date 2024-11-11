import "./App.css";
import { useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { configs } from "./firebase";
import { RootObject } from "./types";

function App() {
  const [managerData, setManagerData] = useState<RootObject | null>(null);

  const fetchData = () => {
    const database = getDatabase(configs);
    const collectionRef = ref(database, process.env.COLLECTION_NAME);

    onValue(collectionRef, (snapshot) => {
      const dataItem = snapshot.val();
      if (dataItem) {
        setManagerData(dataItem);
      }
    });
  };

  console.log("DATA: ", managerData);
  return (
    <div>
      <h1>Data from database:</h1>
      <button onClick={() => fetchData()}>Fetch Data</button>
    </div>
  );
}

export default App;
