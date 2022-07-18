import "./App.css";
import VirtualList from "./components/VirtualList";
import { useEffect, useMemo, useState } from "react";
import { randomGenerateData } from "./utils/generate";
import Cell from "./components/Cell";

const LIMIT = 1000000;

const App = () => {
  const [windowSize, setWindowSize] = useState(window.innerHeight);

  const data = useMemo(() => {
    return new Array(LIMIT).fill().map((_, index) => ({
      NO: index + 1,
      ...randomGenerateData(),
    }));
  }, []);

  useEffect(() => {
    const subscription = window.addEventListener("resize", (event) => {
      setWindowSize(event.currentTarget.innerHeight);
    });

    return () => window.removeEventListener("resize", subscription);
  }, []);

  const renderRow = ({ index }) => {
    return (
      <tr className="row">
        <Cell border={false}>{data[index].NO}</Cell>
        <Cell>{data[index].firstName}</Cell>
        <Cell>{data[index].lastName}</Cell>
        <Cell>{data[index].age}</Cell>
        <Cell>{data[index].gender}</Cell>
        <Cell>{data[index].phone}</Cell>
        <Cell>{data[index].jobType}</Cell>
        <Cell>{data[index].jobTitle}</Cell>
        <Cell>{data[index].jobArea}</Cell>
        <Cell>{data[index].address}</Cell>
        <Cell>{data[index].state}</Cell>
        <Cell>{data[index].city}</Cell>
        <Cell>{data[index].zip}</Cell>
        <Cell>{data[index].car}</Cell>
        <Cell>{data[index].songName}</Cell>
      </tr>
    );
  };

  return (
    <VirtualList
      itemHeight={32}
      numberOfItem={LIMIT}
      listHeight={windowSize}
      RenderItem={renderRow}
      numberOfItemRenderAHead={30}
    />
  );
};

export default App;
