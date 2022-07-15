import { memo, useMemo, useEffect, useRef, useState } from "react";

const VirtualList = ({
  RenderItem,
  numberOfItem,
  listHeight,
  itemHeight,
  numberOfItemRenderAHead = 10,
}) => {
  const scrollRef = useRef();

  const [scrollTop, setScrollTop] = useState(0);

  const onScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  useEffect(() => {
    setScrollTop(scrollRef.current?.scrollTop || 0);

    scrollRef.current?.addEventListener("scroll", onScroll);

    return () => scrollRef.current?.removeEventListener("scroll", onScroll);
  }, []);

  const totalHeight = useMemo(
    () => numberOfItem * itemHeight,
    [itemHeight, numberOfItem]
  );

  let startNode = useMemo(() => {
    const start = Math.floor(scrollTop / itemHeight) - numberOfItemRenderAHead;
    return Math.max(0, start);
  }, [itemHeight, numberOfItemRenderAHead, scrollTop]);

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

  const offsetY = useMemo(
    () => startNode * itemHeight,
    [itemHeight, startNode]
  );

  const visibleItem = useMemo(() => {
    return new Array(visibleItemCount)
      .fill()
      .map((_, index) => (
        <RenderItem key={index + startNode} index={index + startNode} />
      ));
  }, [startNode, visibleItemCount]);

  return (
    <div
      ref={scrollRef}
      style={{ height: listHeight, overflow: "auto", background: "pink" }}
    >
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
