import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * - Function to merge `classNames` in the correct order.
 * - Also removes faulty and duplicate `classNames`.
 * - Be aware that all `classNames` that is not a valid
 *   `Tailwind CSS classNames` will be removed.
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
