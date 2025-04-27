import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const isStringArray = (value: unknown): value is string[] => {
	return (
		Array.isArray(value) && value.every((item) => typeof item === "string")
	);
};
