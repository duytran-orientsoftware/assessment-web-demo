import { memo, useEffect, useMemo, useRef, useState } from "react";
import useScroll from "../../hooks/useScroll";
import "./style.css";

const DEFAULT_HEADER = [
  "NO.",
  "First Name",
  "Last Name",
  "Age",
  "Gender",
  "Phone Number",
  "Job Type",
  "Job Title",
  "Job Area",
  "Address",
  "State",
  "City",
  "Zip Code",
  "Asset",
  "Favorite Song Name",
];

const VirtualList = ({
  data,
  renderItem,
  numberOfItem,
  listHeight,
  itemHeight,
  numberOfItemRenderAHead = 0,
}) => {
  const tableRef = useRef(null);

  const { scrollTop } = useScroll("ScrollView");

  const totalHeight = useMemo(
    () => numberOfItem * itemHeight,
    [itemHeight, numberOfItem]
  );

  /**
   * Calculate the start item to render visibleItem.
   * This calculate might return negative number, if it return negative number then default in 0
   */
  let startNode = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight) - numberOfItemRenderAHead;
    return Math.max(0, start);
  }, [itemHeight, numberOfItemRenderAHead, scrollTop]);

  /**
   * Calculate number of item should render.
   * If user scroll to bottom this calculate might return a bigger number than it should display. The Math.min it will help check if the calculate number is larger than the current data left
   */
  let visibleItemCount = useMemo(() => {
    const calculate =
      Math.ceil(listHeight / itemHeight) + 2 * numberOfItemRenderAHead;
    return Math.min(numberOfItem - startNode, calculate);
  }, [
    itemHeight,
    listHeight,
    numberOfItem,
    numberOfItemRenderAHead,
    startNode,
  ]);

  /**
   * Calculate offset to push the list available item down when scrolling
   * Because we have numberOfItemRenderAHead so shouldn't use scrollTop to push the list down
   */
  const offsetY = useMemo(
    () => startNode * itemHeight,
    [itemHeight, startNode]
  );

  /**
   * Start render item
   */
  const visibleItem = useMemo(() => {
    return new Array(visibleItemCount)
      .fill()
      .map((_, index) => renderItem(data[index + startNode]));
  }, [data, renderItem, startNode, visibleItemCount]);

  return (
    <div // This div help to show the visible list height
      id="ScrollView"
      style={{ height: listHeight, overflow: "auto" }}
    >
      <div // This div help render ahead full total row
        style={{
          height: totalHeight,
        }}
      >
        <div // This div help move the table down according to the calculate offset above
          style={{
            transform: `translateY(${offsetY}px)`,
          }}
        >
          <table
            style={{
              borderCollapse: "collapse",
              width: "100vw",
            }}
            ref={tableRef}
          >
            <thead>
              <tr>
                {DEFAULT_HEADER.map((name, index) => (
                  <th key={index}>{name}</th>
                ))}
              </tr>
            </thead>

            <tbody>{visibleItem}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default memo(VirtualList);
