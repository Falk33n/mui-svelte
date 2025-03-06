import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function createPortal(node: HTMLElement, target?: HTMLElement) {
	if (!target) {
		target = document.body.querySelector('div') ?? document.body;
	}

	target.appendChild(node);

	return {
		destroy() {
			if (node && node.parentNode === target) {
				target.removeChild(node);
			}
		},
	};
}

export function getUniqueId(length: number = 5) {
	return crypto.randomUUID().replace(/-/g, '').substring(0, length);
}

export function hslToHsla(hsl: string, alpha: number) {
	return hsl.replace('hsl', 'hsla').replace(')', `, ${alpha})`);
}
