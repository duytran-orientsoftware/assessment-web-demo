const Cell = ({ children }) => {
  return (
    <td>
      <div
        style={{
          height: "30px",
          maxHeight: "30px",
          whiteSpace: "nowrap",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderLeftWidth: 1,
          borderLeftStyle: "solid",
        }}
      >
        {children}
      </div>
    </td>
  );
};

export default Cell;
