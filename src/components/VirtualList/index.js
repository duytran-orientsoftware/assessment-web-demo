import { memo, useMemo } from "react";
import useScroll from "../../hooks/useScroll";

const VirtualList = ({
  RenderItem,
  numberOfItem,
  listHeight,
  itemHeight,
  numberOfItemRenderAHead = 10,
}) => {
  const { scrollTop } = useScroll("ScrollView");

  const totalHeight = useMemo(
    () => numberOfItem * itemHeight,
    [itemHeight, numberOfItem]
  );

  /**
   * Calculate the start item to render visibleItem
   */
  let startNode = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight) - numberOfItemRenderAHead;
    return Math.max(0, start);
  }, [itemHeight, numberOfItemRenderAHead, scrollTop]);

  /**
   * Calculate number of item should render
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
