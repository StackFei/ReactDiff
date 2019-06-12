

function diff(oldTree, newTree) {
    let patches = {};//补丁包
    let index = 0; //vertual 索引
    //递归树 比较后的结果放到补丁包中
    walk(oldTree, newTree, index, patches)

    return patches;
}

//递归树结构
const ATTRS = "ATTRS";
function walk(oldNode, newNode, index, patches) {
    let currentPatch = []; // 将修改的属性映射到补丁包
    if (oldNode.type === newNode.type) { //相同的元素类型
        //比较属性是否更改
        let attrs = diffAttr(oldNode.props, newNode.props)
        if (Object.keys(attrs).length > 0) { //确认是否有更改值
            currentPatch.push({ type: ATTRS, attrs })
        }
    }
    if (currentPatch.length > 0) { 
        //当前比较元素确实有补丁修改 -->映射到大补丁包中
        patches[index] = currentPatch
        console.log(patches)
        
    }
}

//比较属性
function diffAttr(oldAttr, newAttr) {
    let patch = {}; //补丁包
    //新属性与老属性的关系
    for (let key in oldAttr) {
        if (oldAttr[key] !== newAttr[key]) {
            //老属性与新属性不相同  ==> undefined
            patch[key] = newAttr[key]
        }
    }
    // 是否有新增属性
    for (let key in newAttr) {
        if (!oldAttr.hasOwnProperty(key)) {
            patch[key] = newAttr[key]
        }
    }
    return patch
}

export default diff