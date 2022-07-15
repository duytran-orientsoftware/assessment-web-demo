const Cell = ({ children }) => {
  return (
    <td style={{ border: "1px solid #000" }}>
      <div style={{ height: "30px", maxHeight: "30px", whiteSpace: "nowrap" }}>
        {children}
      </div>
    </td>
  );
};

export default Cell;
