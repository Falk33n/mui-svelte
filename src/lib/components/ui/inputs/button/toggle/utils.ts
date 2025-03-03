import type { ButtonMouseEvent, ButtonMouseEventHandler } from '$types';
import { tv } from 'tailwind-variants';

export const toggleButtonVariants = tv({
	base: 'px-[unset] bg-transparent border shadow-none text-foreground hover:bg-secondary-foreground/10 hover:text-secondary-foreground',
	variants: {
		color: {
			primary:
				'aria-pressed:text-primary aria-pressed:bg-primary/15 aria-pressed:border-primary/40',
			secondary:
				'aria-pressed:text-secondary-foreground aria-pressed:bg-secondary-foreground/10',
			destructive:
				'aria-pressed:text-destructive aria-pressed:bg-destructive/15 aria-pressed:border-destructive/40',
		},
		size: {
			sm: 'size-8 [&>svg]:size-5',
			md: 'size-10 [&>svg]:size-6',
			lg: 'size-12 [&>svg]:size-7',
		},
	},
	defaultVariants: {
		color: 'primary',
		size: 'md',
	},
});

export const handleToggleButtonPressed = (
	e: ButtonMouseEvent,
	ref: HTMLElement | null,
	isSelected: { value: boolean },
	onclick: ButtonMouseEventHandler,
	selectedButton?: { refs: (HTMLElement | null)[] },
	exclusiveSelection?: boolean,
	enforcedSelection?: boolean,
) => {
	if (!e.defaultPrevented) {
		if (exclusiveSelection && selectedButton) {
			if (
				enforcedSelection &&
				selectedButton.refs.includes(ref) &&
				selectedButton.refs.length === 1
			) {
				onclick?.(e);
				return;
			}

			if (!selectedButton.refs.includes(ref)) selectedButton.refs = [ref];
			else if (!enforcedSelection || selectedButton.refs.length > 1) {
				selectedButton.refs = [];
			}

			isSelected.value = selectedButton.refs.includes(ref);
		} else {
			if (
				enforcedSelection &&
				isSelected.value &&
				selectedButton &&
				selectedButton.refs.includes(ref) &&
				selectedButton.refs.length === 1
			) {
				onclick?.(e);
				return;
			}

			if (selectedButton) {
				if (isSelected.value) {
					selectedButton.refs.splice(selectedButton.refs.indexOf(ref), 1);
				} else {
					selectedButton.refs.push(ref);
				}
			}

			isSelected.value = !isSelected.value;
		}
	}

	onclick?.(e);
};
