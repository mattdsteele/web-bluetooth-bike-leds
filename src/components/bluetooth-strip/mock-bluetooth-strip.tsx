import { Component, Method } from '@stencil/core';
import { IBluetoothStrip } from './interfaces';

@Component({
  tag: 'mock-bluetooth-strip'
})
export class MockBluetoothStrip implements IBluetoothStrip {
  @Method()
  async connect() {}

  @Method()
  async setColor(_red: number, _green: number, _blue: number) {}

  @Method()
  async runCommand(_: number) {}
}
