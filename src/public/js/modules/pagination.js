
class Pagination {
  currentPage = 0;
  pagesCount = 0

  constructor() {}

  setPageCount(length) {
    this.pagesCount = length
  }

  getPages() {
    const pagesArray = []
    for (let pageCount=0; pageCount < this.pagesCount; pageCount++) {
      pagesArray.push(pageCount+1)
    }

    return pagesArray
  }

  next() {}
  prev() {}


}