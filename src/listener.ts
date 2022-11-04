import {
  enableShiftTabGoto,
  enableTabGoto,
  shiftTabGotoName,
  tabGotoName,
} from "./config";
import focusBySelector from "./focusBySelector";

export default function listener(e: KeyboardEvent) {
  if (!(e.target instanceof Element)) {
    return;
  }

  if (e.key !== "Tab") {
    return;
  }

  if (e.shiftKey === true) {
    if (!enableShiftTabGoto) {
      return;
    }

    const shiftTabGotoAttr = e.target.getAttribute(shiftTabGotoName);
    if (shiftTabGotoAttr) {
      focusBySelector(shiftTabGotoAttr, e);
    }
    return;
  }

  if (!enableTabGoto) {
    return;
  }

  const tabGotoAttr = e.target.getAttribute(tabGotoName);
  if (tabGotoAttr) {
    focusBySelector(tabGotoAttr, e);
  }
}
