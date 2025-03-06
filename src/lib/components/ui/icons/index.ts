import type { WithoutChildren, WithRef } from '$types';
import type { Component } from 'svelte';
import type { SVGAttributes } from 'svelte/elements';

export { default as LoaderCircleIcon } from '$components/ui/icons/loader-circle-icon.svelte';

export type IconProps = WithoutChildren<
	WithRef<SVGAttributes<SVGElement>, SVGSVGElement>
>;

export type IconComponent = Component<
	IconProps,
	Record<string, unknown>,
	'ref'
>;

export type WithIcon<T> = T & { icon?: IconComponent };

export type WithoutIcon<T> = Omit<T, 'icon'>;
