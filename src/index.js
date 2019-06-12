import { createElement, render, Element, renderDom } from './element'
import diff from './diff'
let VertualDom = createElement("ul", { class: "list" }, [
    createElement("li", { class: "itme" }, ["a"]),
    createElement("li", { class: "itme" }, ["b"]),
    createElement("li", { class: "itme" }, ["c"]),
])

let VertualDom2 = createElement("ul", { class: "list" }, [
    createElement("li", { class: "itme" }, ["1"]),
    createElement("li", { class: "itme" }, ["b"]),
    createElement("li", { class: "itme" }, ["3"]),
])

let patchs = diff(VertualDom, VertualDom2)
//vertual Dom转换成真实Dom 渲染挂在在页面上
let el = render(VertualDom)
renderDom(el, window.root)

console.log(el)
console.log(VertualDom)