# [Demo link](https://assessment-web-demo.herokuapp.com/)

# Props

There are 5 props:

- renderItem: Apply custom UI for a row
- numberOfItem: total number item
- itemHeight: the row height
- listHeight: the actual list show for user
- numberOfItemRenderAHead: the number of item render ahead. It helps the list look more stable when scrolling.

First, we need to calculate the actual list height.

`totalHeight = numberOfItem + itemHeight`

Then calculate the current start row we are at.

`startRow = (scrollTop / itemHeight) - numberOfItemRenderAHead`

Then calculate the number of an item that should render.

`visibleItemCount = (listHeight / itemHeight) + (2 * numberOfItemRenderAHead)`

Final calculate offset to push the list of an available item down when scrolling

`offsetY = startNode * itemHeight`
