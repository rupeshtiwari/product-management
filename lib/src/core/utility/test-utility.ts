// Note - shiftKey test will fail in PhantomJS
export const createKeyboardEvent = (
  eventName: string = 'click',
  key: string = '01',
  shiftKey: boolean = false
): KeyboardEvent => {
  let event;
  try {
    // Chrome Launcher
    event = new KeyboardEvent(eventName, {
      key: key,
      shiftKey: shiftKey,
    });
  } catch (e) {
    // PhantomJS
    event = document.createEvent('KeyboardEvent');
    event.initEvent(eventName, true, false);
    event.key = key;
  }
  return event;
};
