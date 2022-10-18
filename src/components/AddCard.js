import { useState } from "react";

const AddCard = ({ initialValues, isEdit = false, index }) => {
  const [ordering, setOrdering] = useState(initialValues?.ordering);
  const [clue, setClue] = useState(initialValues?.clue);
  const [kun, setKun] = useState(initialValues?.kun);
  const [on, setOn] = useState(initialValues?.on);
  const [translation, setTranslation] = useState(initialValues?.english);
  const [notes, setNotes] = useState(initialValues?.notes);

  const [playAnimation, setPlayAnimation] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

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

  const createCard = () => {
    if (!clue) return;

    setShowAnswer(false);

    const newCard = {
      ordering: ordering,
      clue: clue,
      kun: kun,
      on: on,
      english: translation,
      notes: notes,
    };

    setOrdering("");
    setClue("");
    setKun("");
    setOn("");
    setTranslation("");
    setNotes("");

    const cards = JSON.parse(localStorage.getItem("flashcards"));
    const newList = [...cards, newCard];
    localStorage.setItem("flashcards", JSON.stringify(newList));
    alert("Card has been created!");
  };

  const updateCard = () => {
    if (!clue) return;

    setShowAnswer(false);

    const newCard = {
      ordering: ordering,
      clue: clue,
      kun: kun,
      on: on,
      english: translation,
      notes: notes,
    };

    const cards = JSON.parse(localStorage.getItem("flashcards"));
    cards[index] = newCard;
    localStorage.setItem("flashcards", JSON.stringify(cards));
    alert("Card has been updated!");
  };

  return (
    <>
      <div
        className={`flashcardAdd ${playAnimation ? " flip-vertical-left" : ""}`}
      >
        {!hidden && (
          <>
            <span style={{ marginRight: "auto", paddingLeft: "10px" }}>
              <input
                className="flashcardAdd__ordering"
                placeholder="Ordering..."
                value={ordering}
                onChange={(e) => setOrdering(e.target.value)}
                style={{ width: "70px" }}
              />
            </span>
            {showAnswer ? (
              <div
                className="flashcardAdd__answer"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <input
                  value={kun}
                  onChange={(e) => setKun(e.target.value)}
                  placeholder="Kun Reading..."
                />
                <input
                  value={on}
                  onChange={(e) => setOn(e.target.value)}
                  placeholder="On Reading..."
                />
                <input
                  value={translation}
                  onChange={(e) => setTranslation(e.target.value)}
                  placeholder="Translation..."
                />
                <input
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes..."
                />
              </div>
            ) : (
              <div>
                <input
                  className="flashcardAdd__clue"
                  value={clue}
                  onChange={(e) => setClue(e.target.value)}
                  placeholder="Clue"
                />
              </div>
            )}
          </>
        )}

        {!hidden && (
          <div style={{ display: "flex", marginTop: "auto" }}>
            <button
              className="button"
              style={{
                marginLeft: "auto",
                marginRight: "10px",
              }}
              onClick={onClickFlashCard}
            >
              Flip Card
            </button>
            {isEdit ? (
              <button
                onClick={updateCard}
                className="button"
                style={{ marginRight: "auto" }}
              >
                Update
              </button>
            ) : (
              <button
                className="button"
                style={{ marginRight: "auto" }}
                type="submit"
                onClick={createCard}
              >
                Create
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AddCard;
