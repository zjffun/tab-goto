import { expect } from "chai";
import "../src/index";

describe("index", () => {
  let input1El: HTMLInputElement;
  let input2El: HTMLInputElement;
  let divEl: HTMLDivElement;
  let circle1: SVGCircleElement;
  let circle2: SVGCircleElement;
  let rect1: SVGRectElement;

  beforeEach(() => {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div id="tab-goto-test">
          <input id="input1-test" tab-goto="[tab-div]" />
          <input id="input2-test" />
          <div id="div-test" tab-div shift-tab-goto="#input1-test" tabindex="0" >test-div</div>
          <svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg">
            <circle id="circle1-test" tab-goto="[tab-rect]" tabindex="0" cx="50" cy="50" r="20" />
            <circle id="circle2-test" tabindex="0" cx="50" cy="100" r="20" />
            <rect id="rect-test" tab-rect tabindex="0" x="30" y="140" width="40" height="40" />
          </svg>
        </div>
      `
    );
    input1El = <HTMLInputElement>document.getElementById("input1-test");
    input2El = <HTMLInputElement>document.getElementById("input2-test");
    divEl = <HTMLDivElement>document.getElementById("div-test");
    circle1 = <SVGCircleElement>document.querySelector("#circle1-test");
    circle2 = <SVGCircleElement>document.querySelector("#circle2-test");
    rect1 = <SVGRectElement>document.querySelector("#rect-test");
  });

  afterEach(() => {
    const element = document.getElementById("tab-goto-test");
    if (element) {
      document.body.removeChild(element);
    }
  });

  it("tab goto should work", () => {
    input1El?.focus();

    input1El?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", bubbles: true })
    );

    expect(document.activeElement).is.eq(divEl);
  });

  it("shift tab goto should work", () => {
    divEl?.focus();

    divEl?.dispatchEvent(
      new KeyboardEvent("keydown", {
        shiftKey: true,
        key: "Tab",
        bubbles: true,
      })
    );

    expect(document.activeElement).is.eq(input1El);
  });

  it("tab on SVG element should work", () => {
    circle1?.focus();

    circle1?.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Tab", bubbles: true })
    );

    expect(document.activeElement).is.eq(rect1);
  });
});
