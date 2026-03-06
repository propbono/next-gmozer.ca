"use client";

import { Button } from "@gmozer/ui";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	const t = useTranslations("error");
	const router = useRouter();

	useEffect(() => {
		// biome-ignore lint/suspicious/noConsole: Log error for debugging
		console.error(error);
	}, [error]);

	return (
		<div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center px-4">
			<h2 className="text-2xl font-bold">{t("title")}</h2>
			<p className="text-muted-foreground max-w-md">{t("description")}</p>
			<div className="flex gap-4">
				<Button onClick={() => reset()}>{t("retry")}</Button>
				<Button variant="outline" onClick={() => router.push("/")}>
					{t("home")}
				</Button>
			</div>
		</div>
	);
}
