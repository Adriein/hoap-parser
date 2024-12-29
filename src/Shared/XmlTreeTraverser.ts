/*
 * Copyright (c) 2024 Adria Claret <adria.claret@gmail.com>
 * MIT Licensed
 */

import {XmlTreeNode} from "./XmlTreeNode";

export class XmlTreeTraverser {
    /**
     * Traverse with DFS algorithm a Tree from left to right
     * @param root Root node of the tree
     * @param fn Callback function to execute when visiting each node
     * @returns void
     */
    public static dfs(root: XmlTreeNode, fn: (node: XmlTreeNode, depth: number) => void): void {
        const stack: XmlTreeNode[] = [root];
        let depth: number = 0;

        while (stack.length > 0) {
            const node: XmlTreeNode = stack.pop()!;

            fn(node, depth);

            for (let i = node.children.length - 1; i >= 0; i--) {
                if (!node.children[i]) {
                    continue;
                }

                stack.push(node.children[i]!);
            }

            depth++;
        }
    }
}