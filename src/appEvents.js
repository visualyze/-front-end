class AppEvents {
  onPlusClick = () => {};
  onHighlightedTilesChanged = () => {};
  onUpdateWidgetConfig = () => {};
  onWidgetCreated = () => {};
  onWidgetDelete = () => {};
  onWidgetTextInput = () => {};
  onTextInputEntered = () => {};
}

const appEvents = new AppEvents();
export default appEvents;
