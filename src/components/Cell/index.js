import "./cell.css";

const Cell = ({ children, border = true }) => {
  return (
    <td>
      <div className="cell">{children}</div>
    </td>
  );
};

export default Cell;
