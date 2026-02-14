import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
	const t = useTranslations("notFound");

	return (
		<div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden">
			{/* Background Image */}
			<div className="absolute inset-0 z-0">
				<Image
					src="/images/404-not-found.webp"
					alt={t("title")}
					fill
					className="object-cover object-center"
					priority
					quality={100}
					sizes="100vw"
				/>
				{/* Subtle radial gradient to ensure text readability without a full overlay */}
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/50 via-black/20 to-transparent opacity-80" />
			</div>

			{/* Content */}
			<div className="relative z-10 flex flex-col items-center text-center space-y-12 px-4 max-w-4xl mx-auto text-white animate-in fade-in zoom-in duration-700">
				<h1 className="text-[10rem] md:text-[12rem] leading-none font-black tracking-tighter opacity-95 select-none drop-shadow-[0_5px_5px_rgba(0,0,0,1)] filter">
					404
				</h1>
				<h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
					{t("title")}
				</h2>
				<p className="text-xl md:text-2xl text-white font-medium max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-relaxed">
					{t("description")}
				</p>
				<div className="pt-8">
					<Button asChild size="lg" variant="default">
						<Link href="/">{t("home")}</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
