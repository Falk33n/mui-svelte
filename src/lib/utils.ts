import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * - Function to merge `classNames` in the correct order.
 * - Also removes duplicate `classNames`.
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const createPortal = (
	node: HTMLElement,
	target: HTMLElement = document.body.querySelector('div') ?? document.body,
) => {
	target.appendChild(node);

	return {
		destroy() {
			if (node && node.parentNode === target) {
				target.removeChild(node);
			}
		},
	};
};

export const getUniqueId = (length: number = 5) => {
	return crypto.randomUUID().replace(/-/g, '').substring(0, length);
};

export const hslToHsla = (hsl: string, alpha: number) => {
	return hsl.replace('hsl', 'hsla').replace(')', `, ${alpha})`);
};
