import * as store from 'store/dist/store.modern';

import { IStorage } from '../storage';
import { AnyT } from '../definition.interface';

export class StorageService implements IStorage {

  constructor(private prefix: string) {
  }

  set enabled(value: boolean) {
    this.storage.enabled = value;
  }

  get enabled(): boolean {
    return this.storage.enabled;
  }

  set disabled(value: boolean) {
    this.storage.disabled = value;
  }

  get disabled(): boolean {
    return this.storage.disabled;
  }

  public set(key: string, value: AnyT): AnyT {
    return this.storage.set(this.prefix + key, value);
  }

  public get(key: string): AnyT {
    return this.storage.get(this.prefix + key);
  }

  public remove(key: string): void {
    this.storage.remove(this.prefix + key);
  }

  public clear(): void {
    this.storage.clear();
  }

  public transact(key: string, defaultValue: AnyT, transactionFn?: (val: AnyT) => void): void {
    this.storage.transact(this.prefix + key, defaultValue, transactionFn);
  }

  public getAll(): AnyT {
    return this.storage.getAll();
  }

  public serialize(value: AnyT): string {
    return this.storage.serialize(value);
  }

  public deserialize(value: string): AnyT {
    return this.storage.deserialize(value);
  }

  public forEach(command: (key: string, value: AnyT) => void): void {
    this.storage.forEach((key: string, value: AnyT) => (command(this.prefix + key, value)));
  }

  private get storage(): IStorage {
    return store;
  }
}
