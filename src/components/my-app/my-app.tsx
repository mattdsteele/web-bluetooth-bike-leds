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

  dynamics = [
    "green pulse",
    "red pulse",
    "blue pulse",
    "yellow",
    "pink",
    "teal",
    "white",
    "7. green/red pulse",
    "green/blue",
    "blue/red",
    "10. all color strobe",
    "green strobe",
    "red strobe",
    "blue",
    "yellow",
    "teal"
  ];

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
        {this.mock ? <mock-bluetooth-strip /> : <bluetooth-strip />}
        {!this.connected && (
          <nav>
            <h1>Click Santa</h1>
            <img src="assets/santa.jpg" onClick={() => this.connect()} />
          </nav>
        )}
        {this.connected && (
          <main>
            <input type="color" onChange={e => this.updateColor(e)} />
            <div>
              {this.dynamics.map((val, i) => {
                return (
                  <button onClick={() => this.runSequence(i)}>{val}</button>
                );
              })}
            </div>
          </main>
        )}
      </div>
    );
  }
}
