import { describe, expect, it } from "vitest";
import { cn, isStringArray } from "./utils";

describe("utils", () => {
	it("should work", () => {
		expect(cn("a", "b")).toEqual("a b");
		expect(isStringArray(["a"])).toEqual(true);
	});
});
