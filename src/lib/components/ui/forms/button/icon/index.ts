import { tv, type VariantProps } from 'tailwind-variants';

export {
	default as IconButton,
	type IconButtonProps,
} from '$components/ui/forms/button/icon/icon-button.svelte';

export const iconButtonVariants = tv({
	base: 'rounded-full px-[unset]',
	variants: {
		size: {
			sm: 'size-8 [&>svg]:size-5',
			md: 'size-10 [&>svg]:size-6',
			lg: 'size-12 [&>svg]:size-7',
		},
	},
	defaultVariants: {
		size: 'md',
	},
});

export type IconButtonSize = VariantProps<typeof iconButtonVariants>['size'];
