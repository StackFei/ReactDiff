function diff(oldTree, newTree) {
    let patches = {}
    let index = 0;
    //递归树，将比较的结果放入到补丁包中
    walk(oldTree, newTree, index, patches)
    return patches;
}

//比较属性
function diffAttr(oldAttr, newAttr) {
    let patch = {};
    //判断新属性于老属性的关系
    for (let key in oldAttr) {
        if (oldAttr[key] !== newAttr[key]) {
            //比较老属性与新属性 不相同就存新属性
            patch[key] = newAttr[key] //有可能是undefined
        }
    }
    //判断是否是新增属性 老节点中没有新节点的属性
    for (let key in newAttr) {
        if (!oldAttr.hasOwnProperty(key)) {
            patch[key] = newAttr[key]
        }
    }
    return patch;
}

//比较 children
function diffchildren(oldChildren, newChildren, index, patches) {
    //比较老的第一个 和新的第一个
    oldChildren.forEach((child, i) => {
        //索引还是第一次比较的索引 会有问题 index每次传递的给walk都会递增一次
        walk(child, newChildren[i], ++INDEX, patches)
    })
}

//判断children是否是字符串 --> 字符串无法使用forEach
function isString(node) {
    return Object.prototype.toString.call(node) === '[object String]';
}

//递归树
const ATTRS = "ATTRS"
const TEXT = "TEXT"
let INDEX = 0;
function walk(oldNode, newNode, index, patches) {
    let currentPatch = [];//每个元素都默认一个补丁对象
    //判断 children 是否是文本
    if (isString(oldNode) && isString(newNode)) {//判断文本是否变化
        if (oldNode !== newNode) {
            currentPatch.push({ type: TEXT, text: newNode })
        }
    } else if (oldNode.type === newNode.type) { //属性
        //比较属性是否更改 {1:a} => {1:a1}
        let attrs = diffAttr(oldNode.props, newNode.props)
        if (Object.keys(attrs).length > 0) {
            currentPatch.push({ type: ATTRS, attrs })
        }
        // if children 
        diffchildren(oldNode.children, newNode.children, index, patches)
    }
    if (currentPatch.length > 0) {
        //当前元素的确又补丁修改
        patches[index] = currentPatch
        console.log(patches)
    }
}

export default diff;