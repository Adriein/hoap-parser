/*
 * Copyright (c) 2024 Adria Claret <adria.claret@gmail.com>
 * MIT Licensed
 */

export type RawBinaryXmlTagPair = {
    original: string,
    open: Buffer<ArrayBuffer>,
    close: Buffer<ArrayBuffer>,
    type: string,
};

export type JsonResultData = {
    tagName: string,
    value: string | number | null,
};

export type ResultTreeMetadata = {
    position: { open: number, close: number },
}

export type WatchedXmlTagNode = { name: string, type: string, children?: WatchedXmlTagNode[] }

export type WatchedXmlTagsJson = { version: string, nodes: WatchedXmlTagNode[] }