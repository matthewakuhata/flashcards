import { useState } from "react";

const FlashCard = ({
  kun,
  on,
  english,
  ordering,
  clue,
  notes,
  showAnswer,
  setShowAnswer,
}) => {
  const [hidden, setHidden] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);

  const onClickFlashCard = () => {
    setPlayAnimation(true);

    setTimeout(() => {
      setHidden(true);
      setShowAnswer((prev) => !prev);
    }, 200);

    setTimeout(() => {
      setPlayAnimation(false);
      setHidden(false);
    }, 400);
  };
  return (
    <>
      <div
        className={`flashcard ${playAnimation ? " flip-vertical-left" : ""}`}
        onClick={onClickFlashCard}
      >
        {!hidden && (
          <>
            <span>{ordering}</span>
            {showAnswer ? (
              <div className="flashcard__answer">
                <p>Kun: {kun}</p>
                <p>On: {on}</p>
                <p>Translation: {english}</p>
                {notes && <p>Notes: {notes}</p>}
              </div>
            ) : (
              <div
                className={`flashcard__clue ${
                  clue.length > 6 ? "medium-text" : ""
                }`}
              >
                {clue}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default FlashCard;
