import { useState, useEffect } from "react";
import AddCard from "./components/AddCard";
import EditCards from "./components/EditCards";
import FlashCard from "./components/FlashCard";
import "./App.css";

const test = [
  {
    ordering: 1,
    clue: "山",
    kun: "やま",
    on: "サン, セン",
    english: "mountain",
    notes: "",
  },
];

function App() {
  const [flashcards, setFlashcards] = useState([]);
  const [currCard, setCurrCard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showWrong, setShowWrong] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);

  useEffect(() => {
    const cards = JSON.parse(localStorage.getItem("flashcards") || "[]");
    const index = Math.floor(Math.random() * cards.length);
    const nextCard = cards[index];

    setFlashcards([...cards.slice(0, index), ...cards.slice(index + 1)]);
    setCurrCard(nextCard || null);
  }, []);

  const getNextCard = () => {
    setShowWrong(true);
    setShowAnswer(false);

    const index = Math.floor(Math.random() * flashcards.length);
    const nextCard = flashcards[index];

    setFlashcards((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
    setCurrCard(nextCard || null);
  };

  const resetCards = () => {
    const cards = JSON.parse(localStorage.getItem("flashcards"));
    const index = Math.floor(Math.random() * cards.length);
    const nextCard = cards[index];

    setFlashcards([...cards.slice(0, index), ...cards.slice(index + 1)]);
    setCurrCard(nextCard || null);
  };

  const gotCardWrong = () => {
    setShowWrong(false);
    setFlashcards((prev) => [...prev, currCard]);
  };

  const backupCards = () => {
    const data = localStorage.getItem("flashcards");
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "cards-backup.txt";
    link.href = url;
    link.click();
  };

  return (
    <div className="App">
      {currCard && (
        <FlashCard
          {...currCard}
          showAnswer={showAnswer}
          setShowAnswer={setShowAnswer}
        />
      )}

      <div className="button-group">
        <button className="button" onClick={resetCards}>
          Reset Cards
        </button>

        {currCard && (
          <button className="button" onClick={getNextCard}>
            Next Card
          </button>
        )}

        {showAnswer && showWrong && (
          <button className="button" onClick={gotCardWrong}>
            Got it Wrong?
          </button>
        )}
      </div>

      <div className="button-group">
        <button
          onClick={() => {
            if (showEdit) setShowEdit(false);
            setShowAddCard((prev) => !prev);
          }}
          className="button"
        >
          {!showAddCard ? "Create Card" : "Hide Create"}
        </button>
        <button
          onClick={() => {
            if (showAddCard) setShowAddCard(false);
            setShowEdit((prev) => !prev);
          }}
          className="button"
        >
          {showEdit ? "Hide Edit" : "Edit Cards"}
        </button>
      </div>

      {showAddCard && <AddCard />}
      {showEdit && <EditCards />}

      <button onClick={backupCards} className="button top">
        Backup Cards
      </button>
    </div>
  );
}

export default App;
