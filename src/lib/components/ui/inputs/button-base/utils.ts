import type {
	ButtonBaseColor,
	ButtonBaseFocusEventHandler,
	ButtonBaseMouseEventHandler,
	ButtonBaseVariant,
	RippleEvent,
	RippleShadeVariant,
} from '$components/ui/inputs/button-base';
import { hslToHsla } from '$utils';
import { tv } from 'tailwind-variants';

export const buttonBaseVariants = tv({
	base: 'relative overflow-hidden bg-transparent rounded-md gap-2 inline-flex cursor-pointer items-center justify-center whitespace-nowrap font-medium transition-all text-base duration-200 uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:bg-secondary disabled:text-secondary-foreground disabled:opacity-50 [&>svg]:size-5',
	variants: {
		variant: {
			text: '',
			link: 'hover:underline hover:underline-offset-2 font-normal normal-case',
			contained: 'shadow-md',
			outlined: 'border disabled:border-secondary-foreground/40',
		},
		color: {
			primary: '',
			secondary: '',
			destructive: '',
		},
		size: {
			sm: 'h-8 px-3.5 text-sm [&>svg]:size-4',
			md: 'h-9 px-5',
			lg: 'h-10 px-5',
		},
	},
	compoundVariants: [
		{
			variant: 'link',
			size: ['sm', 'md', 'lg'],
			class: 'h-[unset] px-[unset]',
		},
		{
			variant: ['text', 'link', 'outlined'],
			color: 'primary',
			class: 'text-primary',
		},
		{
			variant: ['text', 'link', 'contained', 'outlined'],
			color: 'secondary',
			class: 'text-secondary-foreground',
		},
		{
			variant: ['text', 'link', 'outlined'],
			color: 'destructive',
			class: 'text-destructive',
		},
		{
			variant: ['text', 'outlined'],
			color: 'primary',
			class: 'hover:bg-primary/10',
		},
		{
			variant: ['text', 'outlined', 'contained'],
			color: 'secondary',
			class: 'hover:bg-secondary',
		},
		{
			variant: ['text', 'outlined'],
			color: 'destructive',
			class: 'hover:bg-destructive/10',
		},
		{
			variant: 'contained',
			color: 'primary',
			class: 'bg-primary text-primary-foreground hover:bg-primary/80',
		},
		{
			variant: 'contained',
			color: 'secondary',
			class: 'bg-secondary',
		},
		{
			variant: 'contained',
			color: 'destructive',
			class:
				'bg-destructive text-destructive-foreground hover:bg-destructive/80',
		},
		{
			variant: 'outlined',
			color: 'primary',
			class: 'border-primary/70',
		},
		{
			variant: 'outlined',
			color: 'destructive',
			class: 'border-destructive/70',
		},
	],
	defaultVariants: {
		variant: 'contained',
		color: 'primary',
		size: 'md',
	},
});

const getRipplePosition = (e: RippleEvent, size: number) => {
	const rect = e.currentTarget.getBoundingClientRect();

	if (e instanceof MouseEvent) {
		return {
			x: e.clientX - rect.left - size / 2,
			y: e.clientY - rect.top - size / 2,
		};
	}

	return {
		x: rect.width / 2 - size / 2,
		y: rect.height / 2 - size / 2,
	};
};

const getRippleShadeVariant = (
	variant: ButtonBaseVariant,
	color: ButtonBaseColor,
): RippleShadeVariant => {
	if (color === 'primary') {
		if (variant === 'contained') return 'background';
		return 'primary';
	} else if (color === 'secondary') return 'foreground';
	if (variant === 'contained') return 'background';
	return 'destructive';
};

const getRippleShadeColor = (shadeVariant: RippleShadeVariant) => {
	const backgroundVariable = getComputedStyle(
		document.documentElement,
	).getPropertyValue('--color-background');
	const foregroundVariable = getComputedStyle(
		document.documentElement,
	).getPropertyValue('--color-foreground');
	const primaryVariable = getComputedStyle(
		document.documentElement,
	).getPropertyValue('--color-primary');
	const destructiveVariable = getComputedStyle(
		document.documentElement,
	).getPropertyValue('--color-destructive');

	const backgroundShadeColor = hslToHsla(backgroundVariable, 0.45);
	const foregroundShadeColor = hslToHsla(foregroundVariable, 0.25);
	const primaryShadeColor = hslToHsla(primaryVariable, 0.25);
	const destructiveShadeColor = hslToHsla(destructiveVariable, 0.25);

	if (shadeVariant === 'background') return backgroundShadeColor;
	else if (shadeVariant === 'foreground') return foregroundShadeColor;
	else if (shadeVariant === 'primary') return primaryShadeColor;
	else return destructiveShadeColor;
};

const createRippleElement = (
	x: number,
	y: number,
	size: number,
	shadeColor: string,
) => {
	const ripple = document.createElement('span');
	ripple.style.height = `${size}px`;
	ripple.style.width = `${size}px`;
	ripple.style.left = `${x}px`;
	ripple.style.top = `${y}px`;
	ripple.style.background = shadeColor;
	ripple.classList.add('ripple');
	return ripple;
};

const createRippleAnimation = (
	e: RippleEvent,
	shadeVariant: RippleShadeVariant,
) => {
	const rect = e.currentTarget.getBoundingClientRect();
	const size = Math.max(rect.width, rect.height);

	const { x, y } = getRipplePosition(e, size);
	const shadeColor = getRippleShadeColor(shadeVariant);

	const ripple = createRippleElement(x, y, size, shadeColor);
	e.currentTarget.appendChild(ripple);

	setTimeout(() => ripple.remove(), 600);
};

export const handleButtonBaseEvents = (
	e: RippleEvent,
	variant: ButtonBaseVariant,
	color: ButtonBaseColor,
	onclick?: ButtonBaseMouseEventHandler,
	onfocus?: ButtonBaseFocusEventHandler,
) => {
	/* 
    The `as any` on the EventHandler props fixes the type union mismatch. 
    TypeScript cannot compute the full union type, so we use 
      `as any` to bypass the limitation.  
    This should be looked at in the future for a potential fix.
  */

	const shadeVariant: RippleShadeVariant = getRippleShadeVariant(
		variant,
		color,
	);

	if (e instanceof MouseEvent) {
		if (!e.defaultPrevented && variant !== 'link') {
			createRippleAnimation(e, shadeVariant);
		}

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		onclick?.(e as any);
		return;
	}

	if (
		!e.defaultPrevented &&
		e.currentTarget.matches(':focus-visible') &&
		variant !== 'link'
	) {
		createRippleAnimation(e, shadeVariant);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onfocus?.(e as any);
};
