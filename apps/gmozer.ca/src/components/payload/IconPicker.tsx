"use client";

import { Select, useField } from "@payloadcms/ui";
import type { TextFieldClientProps } from "payload";
import type { ComponentType, HTMLAttributes } from "react";
import { useEffect, useState } from "react";
import { iconMap } from "@/lib/icon-map";

type OptionType = {
	label: string;
	value: string;
};

type CustomSelectProps = {
	onHover?: (val: string | null) => void;
};

type CustomOptionProps = {
	innerRef: React.Ref<HTMLDivElement>;
	innerProps: HTMLAttributes<HTMLDivElement>;
	children: React.ReactNode;
	isSelected: boolean;
	isFocused: boolean;
	data: OptionType;
	selectProps: CustomSelectProps;
};

const CustomOption = (props: CustomOptionProps) => {
	const {
		innerRef,
		innerProps,
		children,
		isSelected,
		isFocused,
		data,
		selectProps,
	} = props;

	// Use onMouseEnter to track hover, which is more reliable than isFocused
	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: Option item needs mouse interactions
		<div
			ref={innerRef}
			{...innerProps}
			onMouseEnter={(e) => {
				if (selectProps.onHover) {
					selectProps.onHover(data.value);
				}
				if (innerProps.onMouseEnter) {
					innerProps.onMouseEnter(e);
				}
			}}
			onMouseLeave={(e) => {
				if (selectProps.onHover) {
					selectProps.onHover(null);
				}
				if (innerProps.onMouseLeave) {
					innerProps.onMouseLeave(e);
				}
			}}
			onMouseMove={(e) => {
				if (innerProps.onMouseMove) {
					innerProps.onMouseMove(e);
				}
			}}
			className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
				isFocused || isSelected ? "bg-[var(--theme-elevation-100)]" : ""
			} ${isSelected ? "font-medium" : ""}`}
			style={{ color: "var(--theme-elevation-800)" }}
		>
			{children}
		</div>
	);
};

export const IconPicker: React.FC<TextFieldClientProps> = ({ path, field }) => {
	const { value, setValue } = useField<string>({ path });
	const [isMounted, setIsMounted] = useState(false);
	const [hoveredValue, setHoveredValue] = useState<string | null>(null);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	const options = Object.keys(iconMap).map((iconName) => ({
		label: iconName,
		value: iconName,
	}));

	const selectedOption =
		options.find((opt) => opt.value === value) || undefined;
	// Only show hover preview if an option is actually being hovered, otherwise show selected
	const displayValue = hoveredValue || value;

	return (
		<div className="field-type text">
			<label className="field-label" htmlFor={path}>
				{field.label as string}
			</label>
			<div className="flex gap-4 items-start">
				{/* Left side: Preview Box */}
				<div
					className="w-24 h-24 flex items-center justify-center border rounded-md shrink-0 bg-theme-card-bg transition-colors"
					style={{
						backgroundColor: "var(--theme-elevation-0)",
						borderColor: "var(--theme-elevation-200)",
						borderWidth: "1px",
						borderStyle: "solid",
					}}
				>
					{displayValue ? (
						<div
							key={displayValue}
							className="flex flex-col items-center justify-center gap-2 w-full h-full"
						>
							<span
								className="text-4xl flex items-center justify-center"
								style={{ color: "var(--theme-elevation-800)" }}
							>
								{(() => {
									const IconComponent = iconMap[
										displayValue as keyof typeof iconMap
									] as ComponentType<{ className?: string }>;
									return <IconComponent className="w-full h-full" />;
								})()}
							</span>
							<span
								className="text-xs text-center break-all px-1"
								style={{ color: "var(--theme-elevation-500)" }}
							>
								{hoveredValue ? "Preview" : "Selected"}
							</span>
						</div>
					) : (
						<span
							className="text-sm text-center px-2"
							style={{ color: "var(--theme-elevation-500)" }}
						>
							No icon
						</span>
					)}
				</div>

				{/* Right side: Dropdown */}
				<div className="flex-1">
					<Select
						options={options}
						value={selectedOption}
						// biome-ignore lint/suspicious/noExplicitAny: generic react-select adapter override
						components={{ Option: CustomOption as any }}
						// @ts-expect-error - passing custom prop for CustomOption
						onHover={(val: string | null) => setHoveredValue(val)}
						onMenuClose={() => setHoveredValue(null)}
						onChange={(option) => {
							if (option && typeof option === "object" && "value" in option) {
								setValue(option.value as string);
							} else if (typeof option === "string") {
								setValue(option);
							} else {
								setValue("");
							}
						}}
					/>
				</div>
			</div>
		</div>
	);
};
