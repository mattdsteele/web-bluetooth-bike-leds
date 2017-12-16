import { Component, Element, State } from "@stencil/core";
import { IBluetoothStrip } from "../bluetooth-strip/bluetooth-strip";
import hexRgb from "hex-rgb";

@Component({
  tag: "my-app",
  styleUrl: "my-app.scss",
  shadow: true
})
export class MyApp {
  mock = true;
  strip: IBluetoothStrip;
  @Element() el: HTMLElement;
  @State() connected = false;

  async connect() {
    const strip = (this.el.shadowRoot.querySelector(
      this.mock ? "mock-bluetooth-strip" : "bluetooth-strip"
    ) as any) as IBluetoothStrip;
    await strip.connect();
    this.connected = true;
    this.strip = strip;
  }
  async updateColor(e: Event) {
    const val: string = (e.target as any).value;
    const [r, g, b] = hexRgb(val);
    await this.strip.setColor(r, g, b);
  }
  async runSequence(command: number) {
    await this.strip.runCommand(command);
  }
  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>
        {this.mock ? <mock-bluetooth-strip /> : <bluetooth-strip />}
        <button onClick={() => this.connect()}>Connect</button>

        {this.connected && (
          <main>
            <input type="color" onChange={e => this.updateColor(e)} />
            <div>
              {[...Array(16)].map((_, i) => i).map(val => {
                return (
                  <button onClick={() => this.runSequence(val)}>
                    Run Sequence {val}
                  </button>
                );
              })}
            </div>
          </main>
        )}
      </div>
    );
  }
}
