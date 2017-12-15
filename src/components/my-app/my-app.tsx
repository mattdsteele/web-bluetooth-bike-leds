import { Component, Element, State } from "@stencil/core";
import { BluetoothStrip } from "../bluetooth-strip/bluetooth-strip";

@Component({
  tag: "my-app",
  styleUrl: "my-app.scss",
  shadow: true
})
export class MyApp {
  @Element() el: HTMLElement;
  @State() connected = false;

  async connect() {
    const strip = (this.el.shadowRoot.querySelector(
      "bluetooth-strip"
    ) as any) as BluetoothStrip;
    console.log(strip);
    await strip.connect();
    this.connected = true;
  }
  async updateColor(e: Event) {
    console.log(e.target);
  }
  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>
        <bluetooth-strip />
        <button onClick={() => this.connect()}>Connect</button>

        {this.connected && (
          <main>
            <input type="color" onChange={e => this.updateColor(e)} />
          </main>
        )}
      </div>
    );
  }
}
