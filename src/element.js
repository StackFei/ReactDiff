//vertual Dom的类
class Element {
    constructor(type, props, children) {
        this.type = type
        this.props = props
        this.children = children
    }
}
//返回虚拟节点的object
function createElement(type, props, children) {
    return new Element(type, props, children)
}
//节点设置属性
function setAttr(node, key, value) {
    switch (key) {
        case "value": //node节点是input或者textarea
            if (node.tagName.toUpperCase() === "INPUT" || node.tagName.toUpperCase() === "TEXTAREA") {
                node.value = value
            } else {
                node.setAttribute(key, value)
            }
            break;
        case "style": //设置样式
            node.style.cssText = value
        default:
            node.setAttribute(key, value)
            break;
    }
}

//render将virtual node转化为真实dom
function render(eleObj) {
    let el = document.createElement(eleObj.type)
    for (let key in eleObj.props) {
        //设置属性的方法
        setAttr(el, key, eleObj.props[key])
    }
    //遍历children dom继续渲染 or 渲染文本
    eleObj.children.forEach(child => {
        child = (child instanceof Element) ? render(child) : document.createTextNode(child)
        el.appendChild(child)
    })
    return el;
}

//渲染页面
function renderDom(el, target) {
    target.appendChild(el)
}
export { createElement, render, Element, renderDom }