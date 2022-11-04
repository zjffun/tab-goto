import { expect } from "chai";
import { config } from "../src/index";

describe("config", () => {
  let input1El: HTMLInputElement;
  let input2El: HTMLInputElement;
  let button1El: HTMLButtonElement;
  let button2El: HTMLButtonElement;
  let divEl: HTMLDivElement;
  let myDivEl: HTMLDivElement;

  beforeEach(() => {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div id="tab-goto-test">
          <input id="input1-test" tab-goto="[tab-div]" />
          <input id="input2-test" />
          <div id="div-test" tab-div shift-tab-goto="#input1-test" tabindex="0" >test-div</div>
          <button id="button1-test" my-tab-goto="[my-tab-div]">btn1</button>
          <button id="button2-test">btn2</button>
          <div id="my-div-test" my-tab-div my-shift-tab-goto="#button1-test" tabindex="0" >test-div</div>
        </div>
      `
    );
    input1El = <HTMLInputElement>document.getElementById("input1-test");
    input2El = <HTMLInputElement>document.getElementById("input2-test");
    button1El = <HTMLButtonElement>document.getElementById("button1-test");
    button2El = <HTMLButtonElement>document.getElementById("button2-test");
    divEl = <HTMLDivElement>document.getElementById("div-test");
    myDivEl = <HTMLDivElement>document.getElementById("my-div-test");
  });

  afterEach(() => {
    const element = document.getElementById("tab-goto-test");
    if (element) {
      document.body.removeChild(element);
    }

    config({
      tabGotoName: "tab-goto",
      shiftTabGotoName: "shift-tab-goto",
      enableTabGoto: true,
      enableShiftTabGoto: true,
    });
  });

  it("config tabGotoName should work", () => {
    button1El?.focus();

    config({ tabGotoName: "my-tab-goto" });

    button1El?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", bubbles: true })
    );

    expect(document.activeElement).is.eq(myDivEl);
  });

  it("config shiftTabGotoName should work", () => {
    myDivEl?.focus();

    config({ shiftTabGotoName: "my-shift-tab-goto" });

    myDivEl?.dispatchEvent(
      new KeyboardEvent("keydown", {
        shiftKey: true,
        key: "Tab",
        bubbles: true,
      })
    );

    expect(document.activeElement).is.eq(button1El);
  });

  it("config enableTabGoto should work", () => {
    input1El?.focus();

    config({ enableTabGoto: false });

    input1El?.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Tab",
        bubbles: true,
      })
    );

    // User press the TAB key will change focus, but dispatch KeyboardEvent with key "Tab" can't change focus
    expect(document.activeElement).is.eq(input1El);
  });

  it("config enableShiftTabGoto should work", () => {
    divEl?.focus();

    config({ enableShiftTabGoto: false });

    divEl?.dispatchEvent(
      new KeyboardEvent("keydown", {
        shiftKey: true,
        key: "Tab",
        bubbles: true,
      })
    );

    // User press the TAB key will change focus, but dispatch KeyboardEvent with key "Tab" can't change focus
    expect(document.activeElement).is.eq(divEl);
  });
});
