/*
 * Copyright (c) 2024 Adria Claret <adria.claret@gmail.com>
 * MIT Licensed
 */

import {ResultTreeNode} from "@Shared/Tree/ResultTreeNode";
import {FlowControlError} from "@Shared/Error/FlowControlError";

export class JsonTreeTraverser {
    /**
     * Traverse with DFS algorithm a Tree from left to right
     * @param root Root node of the tree
     * @param fn Callback function to execute when visiting each node
     * @param leaveFn Callback executed when we are leaving a node
     * @returns void
     */
    public static dfs(
        root: ResultTreeNode,
        fn: (node: ResultTreeNode, cancel: () => void) => void,
        leaveFn: () => void,
    ): void {
        const queue: Array<[ResultTreeNode, number]> = [[root, 0]];

        while (queue.length > 0) {
            const [node, currentDepth] = queue.pop()!;

            fn(node, this.cancel);

            for (let i = node.children.length - 1; i >= 0; i--) {
                if (!node.children[i]) {
                    leaveFn();
                    continue;
                }

                queue.push([node.children[i]!, currentDepth + 1]);
            }
        }
    }

    /**
     * Traverse with BFS algorithm a Tree from left to right at specific lvl of the tree
     * @param root Root node of the tree
     * @param lvl Lvl on which will start applying the fn
     * @param fn Callback function to execute when visiting each node
     * @returns void
     */
    public static bfsToLvl(
        root: ResultTreeNode,
        lvl: number,
        fn: (node: ResultTreeNode, cancel: () => void) => void
    ): void {
        const cancel: () => void = (): void => { throw new FlowControlError(); }
        const stack: Array<[ResultTreeNode, number]> = [[root, 0]];

        try {
            while (stack.length > 0) {
                const [node, currentDepth]: [ResultTreeNode, number] = stack.shift()!;

                if(currentDepth === lvl) {
                    fn(node, cancel);
                }

                for (let i: number = 0; i < node.children.length; i++) {
                    if (!node.children[i]) {
                        continue;
                    }

                    stack.push([node.children[i]!, currentDepth + 1]);
                }
            }
        } catch (error: unknown) {
            if (error instanceof FlowControlError) {
                return;
            }

            throw error;
        }
    }

    private static cancel(): void {
        throw new FlowControlError();
    }
}