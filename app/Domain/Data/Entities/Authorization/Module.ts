import { DateTime } from "luxon";
import { Functionality } from "./Functionality";

export class Module {
  private _functionality: Functionality[] = [];

  constructor(
    private _id: number,
    private _name: string,
    private _displayName: string,
    private _path: string,
    private _icon: string,
    private _state: boolean = true,
    private _order: number,
    private _createdTime: DateTime = DateTime.now(),
    private _updatedTime: DateTime = DateTime.now()
  ) {}

  public get id() {
    return this._id;
  }

  public get functionality() {
    return this._functionality;
  }

  public get name() {
    return this._name;
  }

  public get displayName() {
    return this._displayName;
  }

  public get path() {
    return this._path;
  }

  public get icon() {
    return this._icon;
  }
  public get order() {
    return this._order;
  }

  public get state() {
    return this._state;
  }

  public get createdTime() {
    return this._createdTime;
  }

  public get updatedTime() {
    return this._updatedTime;
  }

  public addFunctionality(functionality: Functionality): Module {
    this._functionality.push(functionality);
    return this;
  }
}
