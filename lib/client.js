window.__ModuleLoader__.load({id:'dsh-codex-model-selector',factory:(require)=>{var module={exports:{}};var exports=module.exports;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.ts
var client_exports = {};
__export(client_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(client_exports);

// src/ModelSelect.tsx
var import_react = require("react");

// node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e) n += e;
  else if ("object" == typeof e) if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
  } else for (f in e) e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var clsx_default = clsx;

// src/ModelSelect.tsx
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");

// src/ModelSelect.module.css
var ModelSelect_default = { "empty": "codex-selector_empty", "fastButton": "codex-selector_fastButton", "group": "codex-selector_group", "option": "codex-selector_option", "energyIcon": "codex-selector_energyIcon", "effortCaption": "codex-selector_effortCaption", "settingsPicker": "codex-selector_settingsPicker", "status": "codex-selector_status", "check": "codex-selector_check", "chevronOpen": "codex-selector_chevronOpen", "cellValue": "codex-selector_cellValue", "error": "codex-selector_error", "menu": "codex-selector_menu", "groups": "codex-selector_groups", "effortTrack": "codex-selector_effortTrack", "root": "codex-selector_root", "warning": "codex-selector_warning", "groupTitle": "codex-selector_groupTitle", "providerCaption": "codex-selector_providerCaption", "cellChevron": "codex-selector_cellChevron", "effortCard": "codex-selector_effortCard", "triggerEffort": "codex-selector_triggerEffort", "retry": "codex-selector_retry", "cellLabel": "codex-selector_cellLabel", "modelHeading": "codex-selector_modelHeading", "chevron": "codex-selector_chevron", "selected": "codex-selector_selected", "cell": "codex-selector_cell", "resetEffort": "codex-selector_resetEffort", "effortFill": "codex-selector_effortFill", "search": "codex-selector_search", "triggerFast": "codex-selector_triggerFast", "triggerLabel": "codex-selector_triggerLabel", "optionCopy": "codex-selector_optionCopy", "modelCaption": "codex-selector_modelCaption", "trigger": "codex-selector_trigger", "cardHeading": "codex-selector_cardHeading", "effortStops": "codex-selector_effortStops", "modelName": "codex-selector_modelName" };
var cssText = '.codex-selector_root {\n  min-width: 0;\n  position: relative;\n}\n\n.codex-selector_settingsPicker .codex-selector_menu {\n  max-height: min(360px, 45vh);\n  inset: calc(100% + 8px) auto auto 0;\n}\n\n.codex-selector_settingsPicker .codex-selector_trigger {\n  max-width: 100%;\n}\n\n.codex-selector_trigger {\n  background: var(--dsw-alias-interactive-bg-hover);\n  min-width: 0;\n  max-width: min(360px, 45cqw);\n  height: 28px;\n  color: var(--dsw-alias-label-secondary);\n  cursor: pointer;\n  border: none;\n  border-radius: 24px;\n  outline: none;\n  align-items: center;\n  gap: 4px;\n  padding: 0 4px 0 8px;\n  font-size: 13px;\n  font-weight: 500;\n  line-height: 20px;\n  display: flex;\n}\n\n.codex-selector_trigger:hover:not(:disabled) {\n  background: var(--dsw-alias-interactive-bg-active);\n}\n\n.codex-selector_trigger:focus-visible {\n  box-shadow: 0 0 0 2px var(--dsw-alias-border-l3);\n}\n\n.codex-selector_trigger:disabled {\n  color: var(--dsw-alias-label-dimmed);\n  cursor: default;\n}\n\n.codex-selector_triggerLabel {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  min-width: 0;\n  overflow: hidden;\n}\n\n.codex-selector_triggerFast {\n  color: var(--dsw-alias-label-primary);\n  flex: none;\n}\n\n.codex-selector_triggerEffort {\n  color: var(--dsw-alias-label-caption);\n  flex: none;\n}\n\n.codex-selector_chevron {\n  color: var(--dsw-alias-label-caption);\n  flex: none;\n  transition: transform .12s;\n}\n\n.codex-selector_chevronOpen {\n  transform: rotate(180deg);\n}\n\n.codex-selector_menu {\n  z-index: 20;\n  border: 1px solid var(--dsw-alias-border-l2);\n  background: var(--dsw-specific-menu);\n  --dsw-elevation-stroke-color: var(--dsw-alias-border-l1);\n  width: max-content;\n  min-width: min(240px, 100vw - 32px);\n  max-width: min(420px, 100vw - 32px);\n  max-height: min(360px, 100vh - 96px);\n  box-shadow: var(--dsw-elevation-prominent);\n  color: var(--dsw-alias-label-primary);\n  --dsh-scrollbar-thumb: var(--dsw-alias-scrollbar-bg-l2);\n  --dsh-scrollbar-thumb-hover: var(--dsw-alias-scrollbar-hover-l2);\n  border-radius: 18px;\n  flex-direction: column;\n  padding: 4px;\n  display: flex;\n  position: absolute;\n  bottom: calc(100% + 8px);\n  right: 0;\n  overflow: hidden;\n}\n\n.codex-selector_status, .codex-selector_empty {\n  color: var(--dsw-alias-label-tertiary);\n  padding: 10px;\n  font-size: 13px;\n  line-height: 20px;\n}\n\n.codex-selector_error, .codex-selector_warning {\n  background: var(--dsw-alias-interactive-bg-hover-danger);\n  color: var(--dsw-alias-state-error-primary);\n  border-radius: 8px;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 8px;\n  margin-bottom: 4px;\n  padding: 7px 8px;\n  font-size: 12px;\n  line-height: 18px;\n  display: flex;\n}\n\n.codex-selector_warning {\n  background: var(--dsw-alias-bg-module-platform);\n  color: var(--dsw-alias-state-warn-label);\n}\n\n.codex-selector_retry {\n  color: inherit;\n  font: inherit;\n  cursor: pointer;\n  background: none;\n  border: none;\n  flex: none;\n  padding: 0;\n  font-weight: 600;\n}\n\n.codex-selector_search {\n  box-sizing: border-box;\n  border: .5px solid var(--dsw-alias-border-l4);\n  background: var(--dsw-alias-bg-layer-1);\n  width: 100%;\n  min-height: 32px;\n  color: var(--dsw-alias-label-primary);\n  font: inherit;\n  border-radius: 8px;\n  outline: none;\n  margin: 2px 0 4px;\n  padding: 5px 8px;\n}\n\n.codex-selector_search::placeholder {\n  color: var(--dsw-alias-label-dimmed);\n}\n\n.codex-selector_search:focus-visible {\n  border-color: var(--dsw-alias-brand-primary);\n}\n\n.codex-selector_groups {\n  min-height: 0;\n  overflow-y: auto;\n}\n\n.codex-selector_group + .codex-selector_group {\n  margin-top: 4px;\n}\n\n.codex-selector_groupTitle {\n  z-index: 1;\n  background: var(--dsw-specific-menu);\n  color: var(--dsw-alias-label-tertiary);\n  padding: 5px 8px 3px;\n  font-size: 12px;\n  font-weight: 500;\n  line-height: 18px;\n  position: sticky;\n  top: 0;\n}\n\n.codex-selector_option {\n  box-sizing: border-box;\n  width: auto;\n  min-width: 100%;\n  min-height: 38px;\n  color: inherit;\n  text-align: left;\n  cursor: pointer;\n  background: none;\n  border: none;\n  border-radius: 10px;\n  outline: none;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 8px;\n  display: flex;\n}\n\n.codex-selector_option:hover:not(:disabled), .codex-selector_option:focus-visible {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.codex-selector_selected {\n  background: none;\n}\n\n.codex-selector_option:disabled {\n  color: var(--dsw-alias-label-dimmed);\n  cursor: default;\n}\n\n.codex-selector_optionCopy {\n  flex-direction: column;\n  flex: 1;\n  min-width: 0;\n  display: flex;\n}\n\n.codex-selector_modelName {\n  color: inherit;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 20px;\n  overflow: hidden;\n}\n\n.codex-selector_check {\n  color: var(--dsw-alias-label-primary);\n  flex: 0 0 18px;\n  place-items: center;\n  display: grid;\n}\n\n.codex-selector_cell {\n  box-sizing: border-box;\n  width: auto;\n  min-width: 100%;\n  height: 40px;\n  color: var(--dsw-alias-label-primary);\n  cursor: pointer;\n  text-align: left;\n  background: none;\n  border: none;\n  border-radius: 10px;\n  align-items: center;\n  gap: 8px;\n  padding: 0 10px;\n  font-size: 14px;\n  line-height: 22px;\n  display: flex;\n}\n\n.codex-selector_cell:hover {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.codex-selector_cellLabel {\n  white-space: nowrap;\n  flex: none;\n}\n\n.codex-selector_cellValue {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  text-align: right;\n  min-width: 0;\n  color: var(--dsw-alias-label-tertiary);\n  flex: auto;\n  overflow: hidden;\n}\n\n.codex-selector_cellChevron {\n  color: var(--dsw-alias-label-tertiary);\n  flex: none;\n}\n\n.codex-selector_effortCard {\n  width: 246px;\n  max-width: calc(100vw - 48px);\n  padding: 7px 8px 10px;\n}\n\n.codex-selector_cardHeading {\n  grid-template-columns: 24px 1fr 24px;\n  align-items: center;\n  min-height: 22px;\n  display: grid;\n}\n\n.codex-selector_energyIcon {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 23px;\n  line-height: 1;\n}\n\n.codex-selector_modelHeading, .codex-selector_effortCaption, .codex-selector_modelCaption, .codex-selector_resetEffort {\n  color: var(--dsw-alias-label-secondary);\n  cursor: pointer;\n  font: inherit;\n  background: none;\n  border: none;\n  justify-content: center;\n  align-items: center;\n  gap: 5px;\n  padding: 2px;\n  display: flex;\n}\n\n.codex-selector_effortCaption {\n  color: var(--dsw-alias-brand-primary);\n  font-size: 12px;\n}\n\n.codex-selector_modelCaption {\n  width: 100%;\n  margin: 2px 0 0;\n  font-size: 12px;\n  line-height: 18px;\n}\n\n.codex-selector_providerCaption {\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 100%;\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 11px;\n  line-height: 16px;\n  overflow: hidden;\n}\n\n.codex-selector_resetEffort {\n  color: var(--dsw-alias-label-tertiary);\n  font-size: 20px;\n}\n\n.codex-selector_resetEffort:disabled {\n  opacity: .4;\n  cursor: default;\n}\n\n.codex-selector_effortTrack {\n  background: var(--dsw-alias-interactive-bg-hover);\n  border-radius: 20px;\n  height: 24px;\n  margin: 0 3px;\n  position: relative;\n}\n\n.codex-selector_effortFill {\n  border-radius: inherit;\n  background: var(--dsw-alias-brand-primary);\n  position: absolute;\n  inset: 0 auto 0 0;\n}\n\n.codex-selector_effortStops {\n  pointer-events: none;\n  justify-content: space-between;\n  align-items: center;\n  display: flex;\n  position: absolute;\n  inset: 0 12px;\n}\n\n.codex-selector_effortStops span {\n  background: var(--dsw-alias-label-tertiary);\n  opacity: .7;\n  border-radius: 50%;\n  width: 4px;\n  height: 4px;\n}\n\n.codex-selector_effortTrack input {\n  appearance: none;\n  cursor: pointer;\n  background: none;\n  width: 100%;\n  height: 24px;\n  margin: 0;\n  position: absolute;\n  inset: 0;\n}\n\n.codex-selector_effortTrack input::-webkit-slider-thumb {\n  appearance: none;\n  background: var(--dsw-alias-label-primary);\n  width: 28px;\n  height: 28px;\n  box-shadow: var(--dsw-elevation-prominent);\n  border-radius: 50%;\n}\n\n.codex-selector_effortTrack input::-moz-range-thumb {\n  background: var(--dsw-alias-label-primary);\n  border: none;\n  border-radius: 50%;\n  width: 28px;\n  height: 28px;\n}\n\n.codex-selector_effortTrack input:focus-visible {\n  outline: 2px solid var(--dsw-alias-brand-primary);\n  outline-offset: 4px;\n  border-radius: 20px;\n}\n\n.codex-selector_effortTrack input:disabled {\n  cursor: default;\n  opacity: .6;\n}\n\n.codex-selector_fastButton {\n  width: 24px;\n  height: 24px;\n  color: var(--dsw-alias-label-secondary);\n  cursor: pointer;\n  background: none;\n  border: none;\n  place-items: center;\n  padding: 0;\n  display: grid;\n}\n\n.codex-selector_fastButton[aria-pressed="true"] {\n  color: var(--dsw-alias-brand-primary);\n}\n\n.codex-selector_fastButton:disabled {\n  opacity: .35;\n  cursor: default;\n}\n\n.codex-selector_modelHeading {\n  border-radius: 6px;\n  flex-direction: column;\n  justify-self: center;\n  gap: 0;\n  width: fit-content;\n  min-width: 0;\n  max-width: 100%;\n  min-height: 44px;\n  padding: 2px 6px;\n}\n\n.codex-selector_modelHeading:hover:not(:disabled), .codex-selector_modelHeading:focus-visible {\n  background: var(--dsw-alias-interactive-bg-hover);\n}\n\n.codex-selector_modelHeading:active:not(:disabled) {\n  background: var(--dsw-alias-interactive-bg-active);\n}\n\n.codex-selector_modelHeading:focus-visible {\n  outline: 2px solid var(--dsw-alias-brand-primary);\n}\n\n.codex-selector_cardHeading {\n  margin-bottom: 12px;\n}\n';

// src/ModelSelect.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function ModelSelect({ locked, available, directory, load, select, t, loadSpeed, setSpeed, pickerOnly = false }) {
  const state = (0, import_react.useSyncExternalStore)(
    (fn) => directory.subscribe(fn),
    () => directory.getSnapshot()
  );
  const [open, setOpen] = (0, import_react.useState)(false);
  const dragging = (0, import_react.useRef)(false);
  const [effortDraft, setEffortDraft] = (0, import_react.useState)(null);
  const [pane, setPane] = (0, import_react.useState)("root");
  const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
  const [speed, updateSpeed] = (0, import_react.useState)(null);
  const [speedBusy, setSpeedBusy] = (0, import_react.useState)(false);
  const speedRef = (0, import_react.useRef)(loadSpeed);
  speedRef.current = loadSpeed;
  (0, import_react.useEffect)(() => {
    if (speedRef.current === void 0) return;
    let cancelled = false;
    updateSpeed(null);
    void speedRef.current().then((value) => {
      if (!cancelled) updateSpeed(value);
    }, () => {
      if (!cancelled) updateSpeed(null);
    });
    return () => {
      cancelled = true;
    };
  }, [open, state.current?.provider, state.current?.model]);
  const lastActionRef = (0, import_react.useRef)("load");
  const [toast, setToast] = (0, import_react.useState)(null);
  const toastSeq = (0, import_react.useRef)(0);
  const rootRef = (0, import_react.useRef)(null);
  const triggerRef = (0, import_react.useRef)(null);
  const modelSearchRef = (0, import_react.useRef)(null);
  const itemRefs = (0, import_react.useRef)([]);
  const id = (0, import_react.useId)();
  const choices = (0, import_react.useMemo)(() => state.groups.flatMap((group) => group.models.map((model) => ({
    group,
    model,
    selection: {
      provider: group.id,
      model: model.id,
      ...model.reasoning?.defaultEffort === void 0 ? {} : { reasoningEffort: model.reasoning.defaultEffort }
    }
  }))), [state.groups]);
  const selectedIndex = state.current === null ? -1 : choices.findIndex((c) => c.selection.provider === state.current?.provider && c.selection.model === state.current.model);
  const currentChoice = choices[selectedIndex];
  const deferredSearchQuery = (0, import_react.useDeferredValue)(searchQuery.trim().toLocaleLowerCase());
  const filteredGroups = (0, import_react.useMemo)(() => {
    if (deferredSearchQuery === "") return state.groups;
    return state.groups.flatMap((group) => {
      const providerMatches = `${group.id} ${group.name}`.toLocaleLowerCase().includes(deferredSearchQuery);
      const models = providerMatches ? group.models : group.models.filter((model) => `${model.id} ${model.name}`.toLocaleLowerCase().includes(deferredSearchQuery));
      return models.length === 0 ? [] : [{ ...group, models }];
    });
  }, [deferredSearchQuery, state.groups]);
  const reasoning = currentChoice?.model.reasoning;
  const effectiveEffort = state.current?.reasoningEffort ?? reasoning?.defaultEffort;
  const effortLabel = reasoning === void 0 ? void 0 : effectiveEffort === void 0 ? t("effort.providerDefault") : reasoning.efforts.find((level) => level.id === effectiveEffort)?.name ?? effectiveEffort;
  const effortChoices = (0, import_react.useMemo)(() => reasoning === void 0 ? [] : [
    ...reasoning.defaultEffort === void 0 ? [{ key: "provider-default", effort: void 0, label: t("effort.providerDefault") }] : [],
    ...reasoning.efforts.map((effort) => ({
      key: `effort:${effort.id}`,
      effort: effort.id,
      label: effort.name
    }))
  ], [reasoning, t]);
  const busy = state.status === "selecting";
  const effortIndex = Math.max(0, effortChoices.findIndex((choice) => choice.effort === effectiveEffort));
  const previewEffortLabel = effortDraft === null ? effortLabel : effortChoices[effortDraft]?.label;
  const reload = () => {
    lastActionRef.current = "load";
    load();
  };
  (0, import_react.useEffect)(() => {
    if (!open) return;
    const closeOutside = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", closeOutside);
    return () => {
      document.removeEventListener("mousedown", closeOutside);
    };
  }, [open]);
  (0, import_react.useEffect)(() => {
    if (open && pane === "model") modelSearchRef.current?.focus();
  }, [open, pane]);
  if (!available) return null;
  const show = () => {
    setPane(pickerOnly ? "model" : "root");
    setSearchQuery("");
    setOpen(true);
    reload();
  };
  const close = (restoreFocus = false) => {
    setOpen(false);
    setPane("root");
    if (restoreFocus) queueMicrotask(() => {
      triggerRef.current?.focus();
    });
  };
  const moveFocus = (offset) => {
    const items = itemRefs.current.filter((item) => item !== null);
    if (items.length === 0) return;
    const active = items.findIndex((item) => item === document.activeElement);
    const next = (Math.max(active, 0) + offset + items.length) % items.length;
    items[next]?.focus();
  };
  const onRootKeyDown = (event) => {
    if (event.target === modelSearchRef.current) {
      if (event.key === "Escape") {
        event.preventDefault();
        if (pickerOnly) close(true);
        else setPane("root");
      }
      return;
    }
    if (event.key === "Escape" && open) {
      event.preventDefault();
      if (pane !== "root" && !pickerOnly) setPane("root");
      else close(true);
      return;
    }
    if (!open) return;
    if (event.target.tagName === "INPUT") return;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      moveFocus(event.key === "ArrowDown" ? 1 : -1);
    }
  };
  const onBlur = (event) => {
    if (event.relatedTarget === null || dragging.current) return;
    if (event.relatedTarget instanceof Node && rootRef.current?.contains(event.relatedTarget)) return;
    close();
  };
  const settleSelection = (accepted) => {
    if (accepted) {
      if (rootRef.current !== null) close(true);
      return;
    }
    const message = directory.getSnapshot().error;
    if (message !== null) {
      toastSeq.current += 1;
      setToast({ seq: toastSeq.current, text: t("error.action", { message }) });
    }
  };
  const choose = (selection) => {
    if (state.current?.provider === selection.provider && state.current.model === selection.model) {
      close(true);
      return;
    }
    lastActionRef.current = "select";
    void select(selection).then(settleSelection);
  };
  const chooseEffort = (effort, keepOpen = false) => {
    if (state.current === null) return;
    if (effectiveEffort === effort) {
      if (!keepOpen) close(true);
      return;
    }
    const selection = {
      provider: state.current.provider,
      model: state.current.model,
      ...effort === void 0 ? {} : { reasoningEffort: effort }
    };
    lastActionRef.current = "select";
    void select(selection).then((accepted) => {
      if (!accepted || !keepOpen) settleSelection(accepted);
    });
  };
  const waiting = state.current === null && state.status === "loading";
  const modelLabel = waiting ? t("trigger.loading") : currentChoice?.model.name ?? (state.current === null ? t("trigger.fallback") : `${state.current.provider}/${state.current.model}`);
  const providerLabel = state.groups.find((group) => group.id === state.current?.provider)?.name ?? state.current?.provider;
  const routeLabel = providerLabel === void 0 ? modelLabel : `${currentChoice?.model.name ?? state.current?.model} \xB7 ${providerLabel}`;
  const triggerLabel = effortLabel === void 0 ? routeLabel : `${routeLabel} \xB7 ${effortLabel}`;
  const triggerAria = waiting ? t("trigger.loading") : state.current === null ? t("trigger.selectAria") : effortLabel === void 0 ? t("trigger.aria", { model: modelLabel }) : t("trigger.ariaEffort", { model: modelLabel, effort: effortLabel });
  itemRefs.current = [];
  let itemIndex = 0;
  const itemRef = () => {
    const at = itemIndex++;
    return (node) => {
      itemRefs.current[at] = node;
    };
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ref: rootRef, className: clsx_default(ModelSelect_default.root, pickerOnly && ModelSelect_default.settingsPicker), onKeyDown: onRootKeyDown, onBlur, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "button",
      {
        ref: triggerRef,
        type: "button",
        className: ModelSelect_default.trigger,
        "aria-label": triggerAria,
        "aria-haspopup": "menu",
        "aria-expanded": open,
        "aria-controls": open ? `${id}-menu` : void 0,
        title: speed?.visible && speed.tier === "fast" ? `${triggerLabel} \xB7 \u5FEB\u901F\u6A21\u5F0F` : triggerLabel,
        disabled: locked,
        onClick: () => {
          if (open) {
            close();
          } else {
            show();
          }
        },
        children: [
          speed?.visible && speed.tier === "fast" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: ModelSelect_default.triggerFast, "data-fast-mode": "true", width: "14", height: "14", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m13 2-9 12h7l-1 8 10-12h-7V2Z" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.triggerLabel, children: routeLabel }),
          !pickerOnly && effortLabel !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.triggerEffort, children: effortLabel }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconChevronDownOutline14, { className: clsx_default(ModelSelect_default.chevron, open && ModelSelect_default.chevronOpen) })
        ]
      }
    ),
    open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        id: `${id}-menu`,
        className: ModelSelect_default.menu,
        role: "menu",
        "aria-label": t("menu.aria"),
        "aria-busy": state.status === "loading" || busy,
        children: [
          pane === "root" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: ModelSelect_default.effortCard, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: ModelSelect_default.cardHeading, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: ModelSelect_default.fastButton, disabled: !speed?.visible || speedBusy || locked, "aria-label": speed?.visible ? `\u5FEB\u901F\u6A21\u5F0F\uFF1A${speed.tier === "fast" ? "\u5DF2\u5F00\u542F" : "\u672A\u5F00\u542F"}` : "\u5F53\u524D\u6A21\u578B\u4E0D\u652F\u6301\u5FEB\u901F\u6A21\u5F0F", "aria-pressed": speed?.tier === "fast", title: speed?.visible ? "\u5FEB\u901F\u6A21\u5F0F\uFF08\u6D88\u8017\u66F4\u591A\u7528\u91CF\uFF09" : "\u5F53\u524D\u6A21\u578B\u4E0D\u652F\u6301\u5FEB\u901F\u6A21\u5F0F", onClick: () => {
                if (!speed?.visible || !setSpeed) return;
                setSpeedBusy(true);
                const tier = speed.tier === "fast" ? "standard" : "fast";
                void setSpeed(tier).then((accepted) => {
                  if (accepted) updateSpeed({ visible: true, tier });
                  else {
                    toastSeq.current += 1;
                    setToast({ seq: toastSeq.current, text: "\u5FEB\u901F\u6A21\u5F0F\u5207\u6362\u5931\u8D25\uFF0C\u8BF7\u91CD\u8BD5" });
                  }
                }).finally(() => setSpeedBusy(false));
              }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "m13 2-9 12h7l-1 8 10-12h-7l0-8Z" }) }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { ref: itemRef(), type: "button", role: "menuitem", "aria-label": `${t("menu.model")} ${modelLabel}`, className: ModelSelect_default.modelHeading, onClick: () => {
                setPane("model");
              }, children: [
                reasoning !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: ModelSelect_default.effortCaption, children: [
                  previewEffortLabel,
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconChevronRightOutline14, {})
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: ModelSelect_default.modelCaption, children: [
                  modelLabel,
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconChevronRightOutline14, {})
                ] }),
                providerLabel !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.providerCaption, title: providerLabel, children: providerLabel })
              ] }),
              reasoning !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: ModelSelect_default.resetEffort, "aria-label": t("effort.providerDefault"), title: t("effort.providerDefault"), disabled: busy || locked, onClick: () => {
                chooseEffort(reasoning.defaultEffort, true);
              }, children: "\u21BA" })
            ] }),
            reasoning !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: ModelSelect_default.effortTrack, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: ModelSelect_default.effortFill, style: { width: `${effortChoices.length <= 1 ? 0 : (effortDraft ?? effortIndex) / (effortChoices.length - 1) * 100}%` } }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: ModelSelect_default.effortStops, "aria-hidden": "true", children: effortChoices.map((choice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}, choice.key)) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  type: "range",
                  "aria-label": t("menu.effort"),
                  "aria-valuetext": previewEffortLabel,
                  min: 0,
                  max: Math.max(0, effortChoices.length - 1),
                  step: 1,
                  value: effortDraft ?? effortIndex,
                  disabled: busy || locked || effortChoices.length < 2,
                  onPointerDown: (event) => {
                    dragging.current = true;
                    event.currentTarget.setPointerCapture?.(event.pointerId);
                  },
                  onPointerUp: (event) => {
                    if (!dragging.current) return;
                    dragging.current = false;
                    setEffortDraft(null);
                    chooseEffort(effortChoices[Number(event.currentTarget.value)]?.effort, true);
                  },
                  onPointerCancel: () => {
                    dragging.current = false;
                    setEffortDraft(null);
                  },
                  onChange: (event) => {
                    const index = Number(event.target.value);
                    if (dragging.current) setEffortDraft(index);
                    else chooseEffort(effortChoices[index]?.effort, true);
                  }
                }
              )
            ] })
          ] }),
          pane === "model" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
            state.status === "loading" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: ModelSelect_default.status, children: t("status.loading") }),
            state.error !== null && lastActionRef.current === "load" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: ModelSelect_default.error, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("error.action", { message: state.error }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: ModelSelect_default.retry, onClick: reload, children: t("retry") })
            ] }),
            state.failures.map((failure) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: ModelSelect_default.warning, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("warning.groupLoad", { name: failure.name, message: failure.message }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: ModelSelect_default.retry, onClick: reload, children: t("retry") })
            ] }, failure.id)),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "input",
              {
                ref: modelSearchRef,
                className: ModelSelect_default.search,
                type: "search",
                value: searchQuery,
                placeholder: "\u641C\u7D22\u6A21\u578B",
                "aria-label": "\u641C\u7D22\u6A21\u578B",
                disabled: busy,
                onChange: (event) => {
                  setSearchQuery(event.currentTarget.value);
                }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: clsx_default(ModelSelect_default.groups, "scrollable"), children: filteredGroups.map((group) => {
              const headingId = `${id}-${group.id}`;
              return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { role: "group", "aria-labelledby": headingId, className: ModelSelect_default.group, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: ModelSelect_default.groupTitle, id: headingId, children: group.name }),
                group.models.map((model) => {
                  const selected = state.current?.provider === group.id && state.current.model === model.id;
                  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    "button",
                    {
                      ref: itemRef(),
                      type: "button",
                      role: "menuitemradio",
                      "aria-checked": selected,
                      className: clsx_default(ModelSelect_default.option, selected && ModelSelect_default.selected),
                      title: model.name,
                      disabled: busy,
                      onClick: () => {
                        choose({ provider: group.id, model: model.id });
                      },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.optionCopy, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.modelName, children: model.name }) }),
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: ModelSelect_default.check, children: selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconCheckOutline16, {}) : null })
                      ]
                    },
                    model.id
                  );
                })
              ] }, group.id);
            }) }),
            state.status === "ready" && choices.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: ModelSelect_default.empty, children: t("empty.models") }),
            state.status === "ready" && choices.length > 0 && filteredGroups.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: ModelSelect_default.empty, role: "status", children: "\u6CA1\u6709\u5339\u914D\u7684\u6A21\u578B\u3002" })
          ] })
        ]
      }
    ),
    toast !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_dsh_client_ui_primitives.Toast,
      {
        text: toast.text,
        icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconWarningOutline16, {}),
        anchor: rootRef.current?.closest("[data-composer-card]") ?? null,
        onDone: () => {
          setToast(null);
        }
      },
      toast.seq
    )
  ] });
}

// src/SettingsModelPicker.tsx
var import_react2 = require("react");
var import_dsh_client_store = require("@deepseek-ai/dsh-client-store");
var import_jsx_runtime2 = require("react/jsx-runtime");
function SettingsModelPicker({ groups, current, locked, select, t }) {
  const directory = (0, import_react2.useMemo)(() => (0, import_dsh_client_store.createSnapshotStore)({
    status: "ready",
    error: null,
    groups,
    failures: [],
    current,
    routable: true
  }), []);
  (0, import_react2.useEffect)(() => {
    directory.update((state) => {
      state.groups = groups;
      state.current = current;
    });
  }, [directory, groups, current]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ModelSelect,
    {
      pickerOnly: true,
      available: true,
      locked,
      directory,
      load: () => {
      },
      select: async (selection) => {
        select(selection);
        return true;
      },
      t
    }
  );
}

// src/client.ts
var inject = ["slots", "sessions", "modelDirectories"];
function apply(ctx) {
  ctx.slots.inject("settings.model-redirect.picker", () => ctx.slots.register({
    name: "settings.model-redirect.picker",
    locale: "model"
  }, SettingsModelPicker));
  ctx.effect(() => {
    const style = document.createElement("style");
    style.dataset.plugin = "dsh-codex-model-selector";
    style.textContent = cssText;
    document.head.append(style);
    return () => style.remove();
  });
  ctx.slots.inject("conversation.input.model", () => ctx.slots.register({
    name: "conversation.input.model",
    priority: -10,
    locale: "model",
    inject(sessionId) {
      const directory = ctx.modelDirectories.directoryFor(sessionId);
      const available = ctx.sessions.subagentAddress(sessionId) === void 0;
      const speed = () => ctx.slots.entries("conversation.input.right").find((entry) => entry.options.id === "codex-speed" && entry.inject)?.inject(sessionId);
      return {
        available,
        loadSpeed: async () => speed()?.loadSpeed?.() ?? { visible: false, tier: "standard" },
        setSpeed: async (tier) => speed()?.setSpeed?.(tier) ?? false,
        directory: directory.store,
        load: () => {
          if (available) void directory.load().catch(() => {
          });
        },
        select: (selection) => available ? directory.select(selection).then(() => true, () => false) : Promise.resolve(false)
      };
    }
  }, ModelSelect));
  ctx.slots.inject("conversation.input.right", () => ctx.slots.register({
    name: "conversation.input.right",
    id: "codex-speed",
    priority: -10
  }, () => null));
}

return module.exports;}});
