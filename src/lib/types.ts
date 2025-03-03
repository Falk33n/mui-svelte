import type { Snippet } from 'svelte';
import type { MouseEventHandler } from 'svelte/elements';

export type WithoutRef<T> = Omit<T, 'ref'>;
export type WithRef<T, TRef = HTMLElement> = T & {
	ref?: TRef | null;
};

export type WithoutChildren<T> = Omit<T, 'children'>;
export type WithChildren<T> = T & { children?: Snippet };

export type WithoutChild<T> = Omit<T, 'child'>;
export type WithChild<T> = T & {
	child?: Snippet<[{ props: T }]>;
};

export type WithoutChildrenAndChild<T> = Omit<T, 'children' | 'child'>;
export type WithChildrenAndChild<T> = {
	children?: Snippet;
	child?: Snippet<[{ props: T }]>;
};

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type ButtonMouseEvent = MouseEvent & {
	currentTarget: EventTarget & HTMLButtonElement;
};

export type ButtonMouseEventHandler =
	| MouseEventHandler<HTMLButtonElement>
	| null
	| undefined;
