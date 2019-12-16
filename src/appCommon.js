class AppCommon {
  // commonly used values throughout the app
  scrollbarWidth = 24;
  tileMargin = 4;
  resizeHappening = false;

  // this is used in the grip (resizing the tiles) so we do not select text on the screen while we are dragging.
  pauseEvent(e) {
    if (e.stopPropagation) e.stopPropagation();
    if (e.preventDefault) e.preventDefault();
    e.cancelBubble = true;
    e.returnValue = false;
    return false;
  }
}

const appCommon = new AppCommon();
export default appCommon;
