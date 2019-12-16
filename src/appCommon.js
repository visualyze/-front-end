class AppCommon {
  scrollbarWidth = 24;
  tileMargin = 4;
  resizeHappening = false;

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