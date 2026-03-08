import { differenceInCalendarMonths } from "date-fns";

/**
 * Calculates experience duration in full years and remaining months.
 * Formats accurately via date-fns exact month counting to avoid rounding bugs.
 */
export function calculateExperienceDuration(
	startDate: string | Date,
	endDate?: string | Date | null,
): { years: number; months: number } {
	const start = new Date(startDate);
	const end = endDate ? new Date(endDate) : new Date();

	const totalMonths = differenceInCalendarMonths(end, start) + 1; // +1 to make it inclusive (like LinkedIn)
	const years = Math.floor(totalMonths / 12);
	const months = totalMonths % 12;

	return { years, months };
}
