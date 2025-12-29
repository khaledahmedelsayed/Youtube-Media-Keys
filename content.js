// Constants for hold detection
const RELEASE_DETECTION_MS = 100; // Short delay to detect button release (allows fast taps)
const HOLD_DURATION_MS = 1000; // Must hold for 1 second to trigger next/previous
const REGISTER_HANDLERS_MS = 300; // Pooling for re-registering handling to prevent YouTube from overriding our handlers


// State tracking for hold detection
let nextTrackState = {
  releaseTimer: null,
  holdTimer: null
};

let prevTrackState = {
  releaseTimer: null,
  holdTimer: null
};

function clearState(state) {
  if (state.releaseTimer) {
    clearTimeout(state.releaseTimer);
    state.releaseTimer = null;
  }
  if (state.holdTimer) {
    clearTimeout(state.holdTimer);
    state.holdTimer = null;
  }
}

function handleNextTrack() {
  console.log('[MediaKeys] nexttrack event received');

  // Clear release timer - we got another event so button is still held
  if (nextTrackState.releaseTimer) {
    clearTimeout(nextTrackState.releaseTimer);
    nextTrackState.releaseTimer = null;
  }

  // Start hold timer only on first event of a sequence
  if (!nextTrackState.holdTimer) {
    nextTrackState.holdTimer = setTimeout(function () {
      console.log('[MediaKeys] HOLD detected - calling nextMedia');
      nextMedia(document);
      clearState(nextTrackState);
    }, HOLD_DURATION_MS);
  }

  // Set release timer - fires when button is released (no more events)
  nextTrackState.releaseTimer = setTimeout(function () {
    console.log('[MediaKeys] TAP detected - calling forward');
    clearState(nextTrackState);
    forward();
  }, RELEASE_DETECTION_MS);
}

function handlePrevTrack() {
  console.log('[MediaKeys] previoustrack event received');

  // Clear release timer - we got another event so button is still held
  if (prevTrackState.releaseTimer) {
    clearTimeout(prevTrackState.releaseTimer);
    prevTrackState.releaseTimer = null;
  }

  // Start hold timer only on first event of a sequence
  if (!prevTrackState.holdTimer) {
    prevTrackState.holdTimer = setTimeout(function () {
      console.log('[MediaKeys] HOLD detected - calling prevMedia');
      prevMedia(document);
      clearState(prevTrackState);
    }, HOLD_DURATION_MS);
  }

  // Set release timer - fires when button is released (no more events)
  prevTrackState.releaseTimer = setTimeout(function () {
    console.log('[MediaKeys] TAP detected - calling backward');
    clearState(prevTrackState);
    backward();
  }, RELEASE_DETECTION_MS);
}

function initMediaSession() {
  // navigator.mediaSession.setActionHandler('play', function() {space(document)});
  // navigator.mediaSession.setActionHandler('pause', function() {space(document)});

  navigator.mediaSession.setActionHandler('nexttrack', handleNextTrack);
  navigator.mediaSession.setActionHandler('previoustrack', handlePrevTrack);
}

function space(element) { // Space
  let evt = new KeyboardEvent("keydown", {
    key: " ",
    keyCode: 32
  });
  document.dispatchEvent(evt);
}

function forward() {
  let evt = new KeyboardEvent("keydown", {
    key: "ArrowRight",
    keyCode: 39
  });
  document.dispatchEvent(evt);
}

function backward() {
  let evt = new KeyboardEvent("keydown", {
    key: "ArrowLeft",
    keyCode: 37
  });
  document.dispatchEvent(evt);
}

function nextMedia(element) {
  element.querySelectorAll('iframe').forEach(function (item) {
    try {
      if (iframe.contentWindow) {
        nextMedia(iframe.contentWindow.document);
      }
    } catch (err) { }
  });
  if (document.querySelector('[class*="ytp-next-button"]')) {
    document.querySelector('[class*="ytp-next-button"]').click();
  } else {
    window.history.forward();
  }
};

function prevMedia(element) {
  element.querySelectorAll('iframe').forEach(function (item) {
    try {
      if (iframe.contentWindow) {
        prevMedia(iframe.contentWindow.document);
      }
    } catch (err) { }
  });
  if (document.querySelector('[class*="ytp-prev-button"]') && document.querySelector('[class*="ytp-prev-button"]').getAttribute('aria-disabled') == 'false') {
    document.querySelector('[class*="ytp-prev-button"]').click();
  } else {
    window.history.back();
  }
};

window.onload = function () {
  // Re-register handlers every to stay in control
  setInterval(initMediaSession, REGISTER_HANDLERS_MS);
  initMediaSession();
}
