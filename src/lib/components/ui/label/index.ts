import type { WithRef } from '$types';
import type { HTMLLabelAttributes } from 'svelte/elements';

export { default as Label } from '$components/ui/label/label.svelte';

export type LabelProps = WithRef<HTMLLabelAttributes>;
