import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and merges Tailwind classes using tailwind-merge.
 *
 * @param inputs - Class names or expressions to combine.
 * @returns A single string of merged class names.
 */
export function cn(...inputs: Parameters<typeof clsx>) {
    return twMerge(clsx(...inputs));
}
