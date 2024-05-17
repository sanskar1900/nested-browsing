export const getExtension = (filename) => {
    const index = filename.lastIndexOf(".");
    return index !== -1 ? filename.substring(index) : "";
};
export const getNode = (tree, path, operation, newNode) => {
    if (path.length === 0) {
        return tree;
    }
    const [index, ...restPath] = path;
    for (let i = 0; i < tree.child.length; i++) {
        if (i === index) {
            return getNode(tree.child[i], restPath, operation, newNode);
        }
    }
};
export const checkConflict = (tree, path, name) => {
    if (path.length === 0) {
        for (let i = 0; i < tree?.child?.length; i++) {
            if (tree?.child?.[i]?.name === name) {
                return true;
            }
        }
        return false;
    }
    const [index, ...restPath] = path;
    for (let i = 0; i < tree.child.length; i++) {
        if (i === index) {
            return checkConflict(tree.child[i], restPath, name);
        }
    }
};
export const updateNode = (tree, path, operation, newNode, oldNode) => {
    if (path.length === 0) {
        if (operation === "add") {
            return { ...tree, child: [...tree.child, newNode] };
        } else if (operation === "remove") {
            return {
                ...tree,
                child: tree.child.filter(
                    (node) => node.name !== newNode.name || node.type !== newNode.type
                ),
            };
        } else if (operation === "update") {
            for (let i = 0; i < tree.child.length; i++) {
                if (
                    tree.child[i].name === oldNode.name &&
                    tree.child[i].type === oldNode.type
                ) {
                    tree.child[i].name = newNode.name;
                    break;
                }
            }
            return {
                ...tree,
                child: tree.child,
            };
        }

        return tree;
    }

    const [index, ...restPath] = path;
    return {
        ...tree,
        child: tree.child.map((node, i) =>
            i === index
                ? updateNode(node, restPath, operation, newNode, oldNode)
                : node
        ),
    };
};

export const searchNodes = (tree, searchText) => {
    let matchingNodes = [];
    const searchRecursive = (node) => {
        if (node.name?.toLowerCase().includes(searchText?.toLowerCase())) {
            matchingNodes.push(node);
        }

        if (node.child && node.child.length > 0) {
            node.child.forEach((childNode) => searchRecursive(childNode));
        }
    };

    searchRecursive(tree);

    return matchingNodes;
};
