import type { Snippet } from 'svelte';

export type WithoutRef<T> = Omit<T, 'ref'>;
export type WithRef<T = undefined> = {
	ref?: T extends undefined ? HTMLElement | null : T | null;
};

export type WithoutChildren<T> = Omit<T, 'children'>;
export type WithChildren = { children?: Snippet };

export type WithoutChild<T> = Omit<T, 'child'>;
export type WithChild<T = undefined> = {
	child?: T extends undefined ? Snippet : Snippet<[{ props: T }]>;
};

export type WithoutChildrenAndChild<T> = Omit<T, 'children' | 'child'>;
export type WithChildrenAndChild<T = undefined> = {
	children?: Snippet;
	child?: T extends undefined ? Snippet : Snippet<[{ props: T }]>;
};

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
