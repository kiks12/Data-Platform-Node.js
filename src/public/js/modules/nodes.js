
class Nodes {
  constructor() {}

  clearChildren(parent) {
    let child = parent.lastElementChild
    while (child) {
      parent.removeChild(child)
      child = parent.lastElementChild
    }
  }
}