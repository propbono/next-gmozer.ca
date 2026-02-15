export type PostHogEvents = {
	$pageview: {
		$current_url: string;
	};
	download_resume: Record<string, never>;
	click_social_link: {
		name: string;
		url: string;
	};
};
