import { useEffect, useState } from 'react';
import SingleCard from './singleCard/SingleCard';
import './Game.css';

const images = [
  { src: './img/beehive.jpg', matched: false },
  { src: './img/castle.jpg', matched: false },
  { src: './img/cookie.jpg', matched: false },
  { src: './img/skull.jpg', matched: false },
  { src: './img/star.jpg', matched: false },
  { src: './img/sun.jpg', matched: false }
];

export default function Game () {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    const compareCards = () => {
      if (choiceOne && choiceTwo) {
        setDisabled(true);
        if (choiceOne.src === choiceTwo.src) {
          setCards(prevCards => {
            return prevCards.map(card => {
              if (card.src === choiceOne.src) {
                return { ...card, matched: true }
              } else {
                return card;
              }
            })
          })
          resetTurn();
        } else {
          setTimeout(() => resetTurn(), 1000);
        }
      }
    };

    compareCards();
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className="game">
      <div className="game__header">
        <h1 className="game__title">
          Magic Match
        </h1>
        <button className="game__btn-start" onClick={shuffleCards}>
          New Game
        </button>
      </div>
      <div className="game__wrapper">
        <div className="game__body">
          <div className="card-grid">
            {cards.map(card => (
              <SingleCard
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={card === choiceOne || card === choiceTwo || card.matched}
                disabled={disabled}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="game__footer">
        <div className="turns-counter">
          Turns: {turns}
        </div>
        <div className="credits">
          <h4 className="credits__title">
            Special thanks to:
          </h4>
          <ul className="credits__list">
            <li className="credits__item">
              <a href="https://github.com/iamshaunjp" target="_blank" rel="noreferrer">
                Net Ninja(Shaun)
              </a>
            </li>
            <li className="credits__item">
              <a href="https://www.vecteezy.com/members/tdsouzpro127653" target="_blank" rel="noreferrer">
                tdsouzpro127653
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
