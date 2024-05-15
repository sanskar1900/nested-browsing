export const getExtension = (filename) => {
    const index = filename.lastIndexOf('.');
    return index !== -1 ? filename.substring(index) : '';
};
export const getNode = (tree, path, operation, newNode) => {
    if (path.length === 0) {
        return tree;
    }
    const [index, ...restPath] = path;
    for (let i = 0; i < tree.child.length; i++) {
        if (i === index) {
            return updateNode(tree.child[i], restPath, operation, newNode)
        }
    }

};
export const updateNode = (tree, path, operation, newNode) => {
    if (path.length === 0) {
        if (operation === "add") {
            return { ...tree, child: [...tree.child, newNode] };
        } else if (operation === "remove") {
            return { ...tree, child: tree.child.filter(node => node.name !== newNode.name) };
        } else if (operation === "get") {
            return tree; // Return the current node if operation is "get" and path is empty
        }
        return tree;
    }

    const [index, ...restPath] = path;
    return {
        ...tree,
        child: tree.child.map((node, i) =>
            i === index ? updateNode(node, restPath, operation, newNode) : node
        )
    };
};

