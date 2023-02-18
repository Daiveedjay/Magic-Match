// Import Dependencies
import { useEffect, useState } from "react";

// Import Styles
import "./App.css";

// Import Dependencies
import ResultModal from "./components/ResultModal";
import SingleCard from "./components/SingleCard";

// Card Images
const cardImages = [
  {
    src: "./img/helmet-1.png",
    matched: false,
  },
  {
    src: "./img/potion-1.png",
    matched: false,
  },
  {
    src: "./img/ring-1.png",
    matched: false,
  },
  {
    src: "./img/scroll-1.png",
    matched: false,
  },
  {
    src: "./img/shield-1.png",
    matched: false,
  },
  {
    src: "./img/sword-1.png",
    matched: false,
  },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(10);
  const [matchedCount, setMatchedCount] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  // Shuffule cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);

    setCards(shuffledCards);
    setTurns(10);
  };

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        console.log(choiceOne);

        choiceOne.target.parentElement.classList.add("matched__class");
        choiceTwo.target.parentElement.classList.add("matched__class");
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setMatchedCount((prevMatchCount) => prevMatchCount + 2);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns - 1);
    setDisabled(false);
  };

  // Start the game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (turns === 0 || matchedCount === cards.length) {
      setTimeout(() => {
        // Restart the game here
        shuffleCards();
        setMatchedCount(0);
        setTurns(10); // reset the turns to 10
      }, 2500);
    }
  }, [turns, matchedCount, cards]);
  return (
    <div className="App">
      <h1>Magic Match ✨</h1>
      <p>
        Try to match all the cards in <span> 10 moves or under</span>
      </p>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            matched={card.matched}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
        <ResultModal turns={turns} cards={cards} matchedCount={matchedCount} />
      </div>
      <p className="turns">Turns: {turns}</p>
    </div>
  );
}

export default App;
