import * as d3 from 'd3';

export class ColorGenerator{
    calculatePoint(i:any, intervalSize:any, colorRangeInfo:any) {
        var { colorStart, colorEnd, useEndAsStart } = colorRangeInfo;
        return (useEndAsStart
          ? (colorEnd - (i * intervalSize))
          : (colorStart + (i * intervalSize)));
      }
      
      /* Must use an interpolated color scale, which has a range of [0, 1] */
    interpolateColors(dataLength:any, colorRangeInfo:any) {
        var { colorStart, colorEnd } = colorRangeInfo;
        var colorRange = colorEnd - colorStart;
        var intervalSize = colorRange / dataLength;
        var i, colorPoint;
        var colorArray = [];
        
        for (i = 0; i < dataLength; i++) {
            colorPoint = this.calculatePoint(i, intervalSize, colorRangeInfo);
            colorArray.push(d3.interpolateBlues(colorPoint));
        }
        
        return colorArray;
    }

    interpolateColorsMean(dataLength:any, colorRangeInfo:any) {
        var { colorStart, colorEnd } = colorRangeInfo;
        var colorRange = colorEnd - colorStart;
        var intervalSize = colorRange / dataLength;
        var i, colorPoint;
        var colorArray = [];
        
        for (i = 0; i < dataLength; i++) {
            colorPoint = this.calculatePoint(i, intervalSize, colorRangeInfo);
            colorArray.push(d3.interpolateReds(colorPoint));
        }
        
        return colorArray;
    }
}
