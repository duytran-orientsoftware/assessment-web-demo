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
      no: index + 1,
      ...randomGenerateData(),
    }));
  }, []);

  useEffect(() => {
    const subscription = window.addEventListener("resize", (event) => {
      setWindowSize(event.currentTarget.innerHeight);
    });

    return () => window.removeEventListener("resize", subscription);
  }, []);

  return (
    <VirtualList
      data={data}
      itemHeight={32}
      numberOfItem={LIMIT}
      listHeight={windowSize}
      renderItem={(item) => <Row key={item.no} {...item} />}
      numberOfItemRenderAHead={30}
    />
  );
};

export default App;

const Row = (props) => {
  return (
    <tr className="row">
      <Cell border={false}>{props.no}</Cell>
      <Cell>{props.firstName}</Cell>
      <Cell>{props.lastName}</Cell>
      <Cell>{props.age}</Cell>
      <Cell>{props.gender}</Cell>
      <Cell>{props.phone}</Cell>
      <Cell>{props.jobType}</Cell>
      <Cell>{props.jobTitle}</Cell>
      <Cell>{props.jobArea}</Cell>
      <Cell>{props.address}</Cell>
      <Cell>{props.state}</Cell>
      <Cell>{props.city}</Cell>
      <Cell>{props.zip}</Cell>
      <Cell>{props.car}</Cell>
      <Cell>{props.songName}</Cell>
    </tr>
  );
};
