class Element {
    constructor(type, props, children) {
        this.type = type;
        this.props = props;
        this.children = children
    }
}

//返回虚拟节点 object
function createElement(type, props, children) {
    return new Element(type, props, children)
}

//设置属性
function setAttr(node, key, value) {
    switch (key) {
        case "value": //输入框
            if (node.tagName.toUpperCase() === "INPUT" || node.tagName.toUpperCase() === "TEXTAREA") {
                node.value = value;
            } else {
                node.setAttribute(key, value)
            }
            break;
        case "style":
            node.style.cssText = value
        default:
            node.setAttribute(key, value)
            break;
    }
}
//渲染 vertual dom 
function render(eleObj) {
    let el = document.createElement(eleObj.type);
    //比较新属性与老属性
    for (let key in eleObj.props) {
        setAttr(el, key, eleObj.props[key])
    }
    //遍历 children dom or text
    eleObj.children.forEach(child => {
        child = (child instanceof Element) ? render(child) : document.createTextNode(child)
        el.appendChild(child)
    })
    return el;
}

function renderDom(el,target){
    target.appendChild(el)
}
export { createElement, render,renderDom }