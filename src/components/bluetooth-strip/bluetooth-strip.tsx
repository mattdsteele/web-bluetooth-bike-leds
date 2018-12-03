import { Component, Method } from '@stencil/core';
import { IBluetoothStrip } from './interfaces';

@Component({
  tag: 'bluetooth-strip'
})
export class BluetoothStrip implements IBluetoothStrip {
  ch: BluetoothRemoteGATTCharacteristic;
  @Method()
  async connect() {
    const device = await navigator.bluetooth.requestDevice({
      optionalServices: ['0000ffe5-0000-1000-8000-00805f9b34fb'],
      filters: [
        {
          name: 'LEDnet-8B6AF1C9'
        }
      ]
    });
    const server = await device.gatt.connect();
    const service = await server.getPrimaryService(0xffe5);
    const ch = await service.getCharacteristic(0xffe9);
    this.ch = ch;
    return;
  }

  @Method()
  async setColor(red: number, green: number, blue: number) {
    const r = new Uint8Array([0x56, green, red, blue, 0x00, 0xaa]);
    await this.ch.writeValue(r);
  }

  @Method()
  async runCommand(commandNumber: number) {
    const speed = 0x10;
    const command = commandNumber + 0x26;
    const r = new Uint8Array([0xbb, command, speed, 0x44]);
    await this.ch.writeValue(r);
  }
}
