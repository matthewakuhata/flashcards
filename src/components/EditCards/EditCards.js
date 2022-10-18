import { useEffect, useState } from "react";
import { CreateCard } from "../CreateCard";
import "./styles.css";

const EditCards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [orderSeperated, setOrderSeperated] = useState("");
  const [orderStartEnd, setOrderStartEnd] = useState("");
  const [containsText, setContainsText] = useState("");

  useEffect(() => {
    const cards = JSON.parse(localStorage.getItem("flashcards"));
    setFlashcards(() => cards);
  }, []);

  const filterCards = () => {
    const orderArr =
      orderSeperated.length > 0
        ? orderSeperated.split(",").map((val) => val.trim())
        : [];

    const orderSet = new Set(orderArr);

    const [start, end] = orderStartEnd
      .split("-")
      .map((val) => parseInt(val.trim(), 10));

    const text = containsText.trim().toUpperCase();

    if (!orderSet.size && !start && !end && !text.length) return;

    const cards = JSON.parse(localStorage.getItem("flashcards"));
    const filteredCards = cards.filter(
      ({ clue, ordering, kun, on, english, notes }) => {
        const orderingNumber = parseInt(ordering, 10);
        if (
          text.length > 0 &&
          (clue.toUpperCase().includes(text) ||
            kun.toUpperCase().includes(text) ||
            on.toUpperCase().includes(text) ||
            english.toUpperCase().includes(text) ||
            notes.toUpperCase().includes(text))
        ) {
          return true;
        }

        return (
          orderSet.has(ordering) ||
          (start && end && orderingNumber >= start && orderingNumber <= end)
        );
      }
    );

    console.log(filteredCards);
    setFlashcards(filteredCards);
  };

  const resetCards = () => {
    const cards = JSON.parse(localStorage.getItem("flashcards"));
    setFlashcards(cards);
  };

  return (
    <section className="editCards">
      <div className="editCards__filters">
        <input
          onChange={(e) => setOrderSeperated(e.target.value)}
          placeholder="Order (006,007,008,010)"
        />
        <input
          onChange={(e) => setOrderStartEnd(e.target.value)}
          placeholder="Order between (001 - 0049)"
        />
        <input
          onChange={(e) => setContainsText(e.target.value)}
          placeholder="Contains text..."
        />
      </div>
      <div className="button-group top-10px">
        <button onClick={filterCards} className="button">
          Filter
        </button>
        <button onClick={resetCards} className="button">
          Reset Filters
        </button>
      </div>
      <div className="editCards__container">
        {flashcards.map((card, index) => (
          <CreateCard
            key={`${card.clue}-${index}`}
            initialValues={card}
            index={index}
            isEdit={true}
          />
        ))}
      </div>
    </section>
  );
};

export default EditCards;
