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
      url:
        index % 2 === 0
          ? "https://tse1-mm.cn.bing.net/th/id/OIP-C.jmp0yMKwSBZq4kxzMqKpqwHaLH?w=123&h=183&c=7&r=0&o=5&pid=1.7"
          : "https://images.pexels.com/photos/12659414/pexels-photo-12659414.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    };
  });
};

type typeOptions = {
  column: number;
  gap: number;
};
export class Watcher {
  constructor(options: typeOptions) {
    Object.assign(this, options);
    this.minH = [];
    this._init();
  }

  _init() {
    this.container = document.querySelector(this.el);
    this.items = document.querySelector(this.el).children;
    this.itemWidth =
      (this.container.offsetWidth - this.gap * (this.column - 1)) / this.column;

    this.container.onscroll = (e) => {
      let { onscroll, scrollTollow } = this;
      typeof onscroll === "function" && onscroll(e);
      if (
        this.container.offsetHeight + e.target.scrollTop >=
        this.scrollHeight
      ) {
        console.log(
          this.container.offsetHeight,
          e.target.scrollTop,
          this.scrollHeight
        );
        typeof scrollTollow === "function" && scrollTollow(e);
      }
    };
    this._render();
    setTimeout(() => {
      this.scrollHeight = this.container.scrollHeight;
    }, 0);
  }

  _render() {
    let list = Array.from(this.items);
    list.forEach((item, index) => {
      item.style.width = this.itemWidth + "px";
      if (index < this.column) {
        item.style.top = "0px";
        item.style.left = (this.itemWidth + this.gap) * index + "px";
        this.minH.push(item.offsetHeight);
      } else {
        this.minIndex = this._getMinIndex();
        item.style.top = this.minH[this.minIndex] + this.gap + "px";
        this.minH[this.minIndex] += item.offsetHeight + this.gap;
        item.style.left = (this.itemWidth + this.gap) * this.minIndex + "px";
      }
    });
  }

  _getMinIndex() {
    return this.minH.indexOf(Math.min(...this.minH));
  }

  // tap() {
  //   this.items = document.querySelector(this.el).children;
  //   this._render();
  //   setTimeout(() => {
  //     this.scrollHeight = this.container.scrollHeight;
  //   }, 0);
  // }
}
