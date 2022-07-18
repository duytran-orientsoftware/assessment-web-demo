import "./cell.css";

const Cell = ({ children, border = true }) => {
  return (
    <td>
      <div className={`cell ${border ? "display-border-left" : ""}`}>
        {children}
      </div>
    </td>
  );
};

export default Cell;
