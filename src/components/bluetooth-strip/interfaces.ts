export interface IBluetoothStrip extends HTMLElement {
  connect(): Promise<void>;
  setColor(red: number, green: number, blue: number): Promise<void>;
  runCommand(commandNumber: number): Promise<void>;
}
