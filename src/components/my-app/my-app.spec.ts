import { render, flush } from "@stencil/core/testing";
import { MyApp } from "./my-app";

describe("my-app", () => {
  it("should build", () => {
    expect(new MyApp()).toBeTruthy();
  });

  describe.skip("rendering", () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [MyApp],
        html: "<my-app></my-app>"
      });
    });
    it("builds", async () => {
      await flush(element);
      expect(element).toMatchSnapshot();
    });
  });
});
