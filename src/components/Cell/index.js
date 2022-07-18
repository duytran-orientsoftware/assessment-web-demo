import "./cell.css";

const Cell = ({ children, isFirstColumn }) => {
  return (
    <td>
      <div className={`cell ${isFirstColumn ? "number-cell" : "normal-cell"}`}>
        {children}
      </div>
    </td>
  );
};

export default Cell;
