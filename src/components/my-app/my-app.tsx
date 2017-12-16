import { Component, Element, State } from "@stencil/core";
import { IBluetoothStrip } from "../bluetooth-strip/bluetooth-strip";
import hexRgb from "hex-rgb";

@Component({
  tag: "my-app",
  styleUrl: "my-app.scss",
  shadow: true
})
export class MyApp {
  mock = false;
  strip: IBluetoothStrip;
  @Element() el: HTMLElement;
  @State() connected = false;

  dynamics = [
    "Green pulse",
    "Red pulse",
    "Blue pulse",
    "Yellow pulse",
    "Pink pulse",
    "Teal pulse",
    "White pulse",
    "Green/Red",
    "Green/Blue",
    "Blue/Red",
    "All Color 💥",
    "Green",
    "Red",
    "Blue",
    "Yellow",
    "Teal"
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
  get welcome() {
    return (
      <nav>
        <h1>Click Santa</h1>
        <img src="assets/santa.jpg" onClick={() => this.connect()} />
      </nav>
    );
  }
  get connections() {
    return (
      <main>
        <label htmlFor="color">
          <div class="color-picker">
            <h2>🚲</h2>
          </div>
        </label>
        <input
          name="color"
          id="color"
          type="color"
          onInput={e => this.updateColor(e)}
        />
        <div>
          {this.dynamics.map((val, i) => {
            return <button onClick={() => this.runSequence(i)}>{val}</button>;
          })}
        </div>
      </main>
    );
  }
  render() {
    return (
      <div>
        {this.mock ? <mock-bluetooth-strip /> : <bluetooth-strip />}
        {this.connected ? this.connections : this.welcome}
      </div>
    );
  }
}
