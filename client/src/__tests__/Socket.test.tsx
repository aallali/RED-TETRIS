import { socket } from "../app/hooks";

test("Test Socket", () => {
  expect(socket).toBeDefined();
});
