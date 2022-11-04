export let tabGotoName = "tab-goto";
export let shiftTabGotoName = "shift-tab-goto";
export let enableTabGoto = true;
export let enableShiftTabGoto = true;

export default function (options: {
  tabGotoName?: string;
  shiftTabGotoName?: string;
  enableTabGoto?: boolean;
  enableShiftTabGoto?: boolean;
}) {
  if (options.tabGotoName) {
    tabGotoName = options.tabGotoName;
  }
  if (options.shiftTabGotoName) {
    shiftTabGotoName = options.shiftTabGotoName;
  }
  if (options.enableTabGoto !== undefined) {
    enableTabGoto = options.enableTabGoto;
  }
  if (options.enableShiftTabGoto !== undefined) {
    enableShiftTabGoto = options.enableShiftTabGoto;
  }
}
