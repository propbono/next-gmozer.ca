import { LuCircleCheck } from "react-icons/lu";

export type CheckCircleWithTextProps = {
	text: string;
};
export const CheckCircleWithText = ({ text }: { text: string }) => {
	return (
		<div className="flex items-start gap-3">
			<LuCircleCheck className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
			<p>{text}</p>
		</div>
	);
};
