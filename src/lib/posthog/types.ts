export type PostHogEvents = {
	$pageview: {
		$current_url: string;
	};
	download_resume: {
		locale: string;
		link: string;
	};
	click_social_link: {
		name: string;
		url: string;
	};
};
