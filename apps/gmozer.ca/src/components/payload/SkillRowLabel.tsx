"use client";

import { useRowLabel } from "@payloadcms/ui";

export const SkillRowLabel = () => {
	const { data, rowNumber } = useRowLabel<{ name?: string }>();

	return data?.name || `Skill ${String((rowNumber || 0) + 1).padStart(2, "0")}`;
};
