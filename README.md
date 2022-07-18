# [Demo link](https://assessment-web-demo.herokuapp.com/)

# How it work

The idea for this is render only a small view, and translate the view following user scroll position

There are init 4 props from the start:

- renderItem: Apply custom UI for a row
- numberOfItem: total number item
- itemHeight: the row height
- listHeight: the actual list show for user
- numberOfItemRenderAHead: the number of item render ahead. It helps the list look more stable when scrolling.

First we need to calculate the actual list height.
`totalHeight = numberOfItem + itemHeight`

Then calculate the current start row we are at:
`startRow = (scrollTop / itemHeight) - numberOfItemRenderAHead`

Then calculate number of item should render.
`visibleItemCount = (listHeight / itemHeight) + (2 * numberOfItemRenderAHead)`

Final Calculate offset to push the list available item down when scrolling
`offsetY = startNode * itemHeight`
