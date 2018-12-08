import { Component, Method } from '@stencil/core';

@Component({
  tag: 'mock-bluetooth-strip'
})
export class MockBluetoothStrip {
  @Method()
  async connect() {
    return new Promise<void>(res => {
      setTimeout(res, 500);
    });
  }

  @Method()
  async setColor(_red: number, _green: number, _blue: number) {}

  @Method()
  async runCommand(_: number) {}
}
