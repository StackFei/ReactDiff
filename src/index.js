import { createElement, render, renderDom } from './element'
import diff from './diff'

let VeryualDom = createElement("ul", { class: "list" }, [
    createElement("li", { class: "item" }, ["a"]),
    createElement("li", { class: "item" }, ["b"]),
    createElement("li", { class: "item" }, ["c"]),
    createElement("li", { class: "item" }, ["d"])
])

let VeryualDom2 = createElement("ul", { class: "list-group" }, [
    createElement("li", { class: "item" }, ["a"]),
    createElement("li", { class: "item" }, ["b"]),
    createElement("li", { class: "item" }, ["c"]),
    createElement("li", { class: "item" }, ["d"])
])

let patchers = diff(VeryualDom, VeryualDom2)
//vertual dom 转换 节点dom 挂载
let el = render(VeryualDom2)
renderDom(el, window.root)

// console.log(el)
console.log(VeryualDom)