import { Component, Method } from "@stencil/core";
import { IBluetoothStrip } from "./bluetooth-strip";

@Component({
  tag: "mock-bluetooth-strip"
})
export class MockBluetoothStrip implements IBluetoothStrip {
  @Method()
  async connect() {}

  @Method()
  async setColor(red: number, green: number, blue: number) {}

  @Method()
  async runCommand(commandNumber: number) {}
}
