import './SingleCard.css';

function singleCard ({ card, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    if(!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className={`card ${flipped ? 'flipped' : ''}`}>
        <img className="card__front" src={card.src} alt="card front" />
        <img
          className="card__back"
          src="./img/cover.jpg"
          alt="card cover"
          onClick={handleClick}
        />
    </div>
  )
}

export default singleCard