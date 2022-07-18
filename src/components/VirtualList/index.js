import { memo, useMemo } from "react";
import useScroll from "../../hooks/useScroll";

const VirtualList = ({
  RenderItem,
  numberOfItem,
  listHeight,
  itemHeight,
  numberOfItemRenderAHead = 20,
}) => {
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
      .map((_, index) => (
        <RenderItem key={index + startNode} index={index + startNode} />
      ));
  }, [startNode, visibleItemCount]);

  return (
    <div id="ScrollView" style={{ height: listHeight, overflow: "auto" }}>
      <div
        style={{
          overflow: "hidden",
          willChange: "transform",
          height: totalHeight,
          position: "relative",
        }}
      >
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
          }}
        >
          <table style={{ borderCollapse: "collapse", width: "100%" }}>
            <tbody>{visibleItem}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default memo(VirtualList);
