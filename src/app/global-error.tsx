"use client";

export default function GlobalError({
	error: _error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<html lang="en">
			<body className="flex flex-col items-center justify-center min-h-screen text-center font-sans">
				<div className="space-y-4">
					<h2 className="text-2xl font-bold">Critical Error</h2>
					<p className="text-muted-foreground">
						Something went wrong. Please try refreshing the page.
					</p>
					<button
						type="button"
						className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
						onClick={() => reset()}
					>
						Try again
					</button>
				</div>
			</body>
		</html>
	);
}
