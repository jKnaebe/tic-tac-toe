function Square ({ value }) {
  return <button className="square">{value}</button>
}

const Board = () => {
  return (
    <div className="board">
      {Array(9).fill(null).map((_,i) =>  (
        <Square key={i} value= { i + 1 } />
      ))}
    </div>
  );
};

export default Board;