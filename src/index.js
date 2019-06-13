import { createElement, render, renderDom } from './element'
import diff from './diff'
import patch from './patch'
let VertualDom = createElement("ul", { class: "list" }, [
    createElement("li", { class: "itme" }, ["1"]),
    createElement("li", { class: "itme" }, ["2"]),
    createElement("li", { class: "itme" }, ["2"]),
])

let VertualDom2 = createElement("ul", { class: "list-group" }, [
    createElement("li", { class: "itme" }, ["1"]),
    createElement("li", { class: "itme" }, ["2"]),
    createElement("li", { class: "itme" }, ["1"]),
])

let el = render(VertualDom)
renderDom(el, window.root)
let patchs = diff(VertualDom, VertualDom2)
//给元素打补丁 重新更新视图
patch(el, patchs)

// console.log(el)
// console.log(VertualDom)