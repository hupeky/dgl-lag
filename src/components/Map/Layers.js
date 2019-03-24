const COLOR_RANGE = [
  [1, 152, 189, 80],
  [73, 227, 206, 80],
  [216, 254, 181, 80],
  [254, 237, 177, 80],
  [254, 173, 84, 80],
  [209, 55, 78, 80]
];

import { HexagonLayer } from 'deck.gl';

export const Layers = (data) => {
  return [
    new HexagonLayer({
      id: 'heatmap',
      colorRange: COLOR_RANGE,
      data,
      radius: 3000,
      opacity: 0.3,
      elevationRange: [0, 1000],
      elevationScale: 250,
      extruded: true,
      getPosition: d => d,
      opacity: 1,
    })
  ]
}
export default Layers