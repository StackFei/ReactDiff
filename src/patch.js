import { Element, render, setAttr } from "./element";

let allPatches;
let index = 0; //默认哪个需要打补丁

function patch(node, patches) {
    console.log(node)
    allPatches = patches
    walk(node)
}

//开始打补丁包
function doPatches(node, patches) {
    patches.forEach(patch => {
        switch (patch.type) {
            case "ATTRS":
                for (let key in patch.attrs) {
                    let value = patch.attrs[key]
                    if (value) {
                        setAttr(node, key, value)
                    } else {
                        node.removeAttribute(key)
                    }
                }
                break;
            case "TEXT":
                node.textContent = patch.text;
                break;
            case "REMOVE":
                node.parentNode.removeChild(node)
                break;
            case "REPLACE":
                let newNode = (patch.newNode instanceof Element) ?
                    render(patch.newNode) : document.createTextNode(patch.newNode)
                node.parentNode.replaceChild(newNode, node)
                break;
            default:
                break;
        }
    })
}

//补丁包
function walk(node) {
    let currentPatch = allPatches[index++];
    let childNodes = node.childNodes;
    childNodes.forEach(child => walk(child))
    if (currentPatch) {
        doPatches(node, currentPatch)
    }
}

export default patch;