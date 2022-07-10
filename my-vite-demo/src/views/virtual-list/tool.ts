export function isInSight(visibleIndexs: number[], current: number) {
  return visibleIndexs.indexOf(current) !== -1;
}

export function getOffsetTop(offset: number) {
  return {
    top: offset > 0 ? `-${offset}px` : "",
  };
}

export const getList = function (len: number = 50) {
  return new Array(len).fill(1).map((item, index) => {
    return {
      index: index,
    };
  });
};
