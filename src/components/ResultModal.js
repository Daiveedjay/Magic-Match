import "./ResultModal.css";

export default function ResultModal({ turns, cards, matchedCount }) {
  if (turns === 0 && matchedCount !== cards.length) {
    return (
      <div className="modal">
        <h2>Sadly, you ran out of tries</h2>
        <span>😪</span>
      </div>
    );
  }
  if (matchedCount === cards.length) {
    return (
      <div className="modal">
        <h2>You matched all the cards!</h2>
        <span>🔮</span>
      </div>
    );
  }
  return <div></div>;
}
