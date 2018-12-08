import { Component, Element, State } from '@stencil/core';
import { IBluetoothStrip } from '../bluetooth-strip/interfaces';
import { hexRgb } from './hex-rgb';

@Component({
  tag: 'my-app',
  styleUrl: 'my-app.css',
  shadow: true
})
export class MyApp {
  mock = false;
  @State() loading = false;
  @State() strip: IBluetoothStrip;
  @Element() el: HTMLElement;
  @State() connected = false;

  onConnect() {
    console.log('connected', this);
    this.connected = true;
    this.loading = false;
  }
  onLoadStart() {
    this.loading = true;
    console.log('load start');
  }
  render() {
    return (
      <div>
        {this.mock ? (
          <mock-bluetooth-strip
            ref={(r: any) => {
              console.log(r);
              this.strip = r;
            }}
          />
        ) : (
          <bluetooth-strip ref={(r: any) => (this.strip = r)} />
        )}
        {this.loading ? (
          <Loading />
        ) : (
          <div>
            {this.connected ? (
              <Connections strip={this.strip} />
            ) : (
              <Welcome
                strip={this.strip}
                loaded={() => this.onConnect()}
                loadingStart={() => this.onLoadStart()}
              />
            )}
            ) }
          </div>
        )}
      </div>
    );
  }
}

const Loading = () => {
  return (
    <div class="loading">
      <h1>Activating Santa</h1>
      <span>🎅🎄🎁</span>
    </div>
  );
};

interface WelcomeProps {
  strip: IBluetoothStrip;
  loadingStart: Function;
  loaded: Function;
}
const Welcome = (props: WelcomeProps) => {
  const connect = async () => {
    // const strip = (this.el.shadowRoot.querySelector(
    //   this.mock ? 'mock-bluetooth-strip' : 'bluetooth-strip'
    // ) as any) as IBluetoothStrip;
    console.log;
    props.loadingStart();
    console.log(props);
    await props.strip.connect();
    props.loaded();
  };

  return (
    <nav>
      <h1>Click Santa</h1>
      <img src="assets/santa.jpg" onClick={connect} />
    </nav>
  );
};

const Connections = ({ strip }) => {
  const runSequence = async (command: number) => {
    await strip.runCommand(command);
  };
  const dynamics = [
    'Green pulse',
    'Red pulse',
    'Blue pulse',
    'Yellow pulse',
    'Pink pulse',
    'Teal pulse',
    'White pulse',
    'Green/Red',
    'Green/Blue',
    'Blue/Red',
    'All Color 💥',
    'Green',
    'Red',
    'Blue',
    'Yellow',
    'Teal'
  ];
  const updateColor = async (e: Event) => {
    const val: string = (e.target as any).value;
    const [r, g, b] = hexRgb(val);
    await strip.setColor(r, g, b);
  };
  const colorPicker = false;
  return (
    <main>
      {colorPicker && (
        <div>
          <label htmlFor="color">
            <div class="color-picker">
              <h2>🚲</h2>
            </div>
          </label>
          <input
            name="color"
            id="color"
            type="color"
            onInput={e => updateColor(e)}
          />
        </div>
      )}
      <div>
        {dynamics.map((val, i) => {
          return <button onClick={() => runSequence(i)}>{val}</button>;
        })}
      </div>
    </main>
  );
};
