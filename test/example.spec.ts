import { expect, test } from "vitest";

const user = {
  name: "any",
};

test("exe", () => {
  expect(user.name).toEqual("any");
});
