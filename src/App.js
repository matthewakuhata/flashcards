import { useState, useRef, useEffect } from 'react'
import './App.css';
const test = [
  {
    ordering: 1,
    clue: "山",
    kun: "やま",
    on: "サン, セン",
    english: "mountain",
    notes: ""
  }
]
function App() {
  const [flashcards, setFlashcards] = useState([]);

  const [currCard, setCurrCard] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showWrong, setShowWrong] = useState(true)
  const [playAnimation, setPlayAnimation] = useState(false);

  const orderingRef = useRef(null);
  const clueRef = useRef(null);
  const kunRef = useRef(null);
  const onRef = useRef(null);
  const englishRef = useRef(null);
  const notesRef = useRef(null);

  useEffect(() => {
    const cards = JSON.parse(localStorage.getItem('flashcards'));
    const index = Math.floor(Math.random() * cards.length);
    const nextCard = cards[index]

    setFlashcards([...cards.slice(0, index), ...cards.slice(index + 1)]);
    setCurrCard(nextCard || null);
  }, []);

  const addCard = (event) => {
    event.preventDefault();

    const newCard = {
      ordering: orderingRef.current.value,
      clue: clueRef.current.value,
      kun: kunRef.current.value,
      on: onRef.current.value,
      english: englishRef.current.value,
      notes: notesRef.current.value,
    };

    orderingRef.current.value = "";
    clueRef.current.value = "";
    kunRef.current.value = "";
    onRef.current.value = "";
    englishRef.current.value = "";
    notesRef.current.value = "";

    const cards = JSON.parse(localStorage.getItem('flashcards'));
    const newList = [...cards, newCard];
    localStorage.setItem('flashcards', JSON.stringify(newList));
  };

  const onClickFlashCard = () => {
    setPlayAnimation(true);

    setTimeout(() => {
      setHidden(true);
      setShowAnswer(!showAnswer);
    }, 200);

    setTimeout(() => {
      setPlayAnimation(false);
      setHidden(false);
    }, 400);
  };

  const getNextCard = () => {
    setShowWrong(true);
    setShowAnswer(false);

    const index = Math.floor(Math.random() * flashcards.length);
    const nextCard = flashcards[index]

    setFlashcards((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    setCurrCard(nextCard || null);
  };

  const resetCards = () => {
    const cards = JSON.parse(localStorage.getItem('flashcards'));
    const index = Math.floor(Math.random() * cards.length);
    const nextCard = cards[index]

    setFlashcards([...cards.slice(0, index), ...cards.slice(index + 1)]);
    setCurrCard(nextCard || null);
  };

  const gotCardWrong = () => {
    setShowWrong(false);
    setFlashcards((prev) => [...prev, currCard]);
  }

  return (
    <div className="App">
      <div className="newFlashcard" style={{ "display": "flex", "flexDirection": "column", "maxWidth": "30rem" }}>
        <input ref={clueRef} type="text" placeholder="Enter Clue" />
        <input ref={englishRef} type="text" placeholder="English Meaning" />
        <input ref={kunRef} type="text" placeholder="Kun Reading" />
        <input ref={onRef} type="text" placeholder="On Reading" />
        <input ref={notesRef} type="text" placeholder="Notes..." />
        <input ref={orderingRef} type="text" placeholder="Ordering Value" />
        <button className="button" type="submit" onClick={addCard}>Add Card</button>
      </div>

      {currCard && <>
        <div className={`flashcard ${playAnimation ? " flip-vertical-left" : ""}`} onClick={onClickFlashCard}>
          {!hidden && <> <span>{currCard.ordering}</span>
            {
              showAnswer ?
                <div className="flashcard__answer">
                  <p>Kun: {currCard.kun}</p>
                  <p>On: {currCard.on}</p>
                  <p>Translation: {currCard.english}</p>
                  {currCard.notes && <p>Notes: {currCard.notes}</p>}
                </div>
                :
                <div className="flashcard__clue">
                  {currCard.clue}
                </div>
            }
          </>
          }
        </div>
      </>}
      <div className="flashcardControls">
        {currCard && <button className="button" onClick={getNextCard}>Next Card</button>}
        <button className="button" onClick={resetCards}>Reset Cards</button>
        {showAnswer && showWrong && <button className="button" onClick={gotCardWrong}>Got it Wrong?</button>}
      </div>
    </div>
  );
}

export default App;
