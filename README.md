# Media Keys for YouTube

A Chromium extension that enhances hardware media key functionality on YouTube with intuitive tap and hold gestures.

Now available on the [Chrome Web Store](https://chromewebstore.google.com/detail/media-keys-for-youtube/dhknepdlbdkafcapjncianfeeppfnjcn).

> Forked from [Media Keys for YouTube](https://chromewebstore.google.com/detail/media-keys-for-youtube/inpajkcdlienadkggigbmfhhkdkkpbfn) by the original author.

## Features

- **Tap** the next/previous track keys to skip forward/backward 5 seconds
- **Hold** (1 second) the next/previous track keys to skip to the next/previous video in a playlist
- Works with keyboard media keys and Bluetooth headphone controls

## How It Works

| Action | Behavior |
|--------|----------|
| Tap Next Track | Skip forward 5 seconds |
| Tap Previous Track | Skip backward 5 seconds |
| Hold Next Track (1s) | Next video in playlist |
| Hold Previous Track (1s) | Previous video in playlist |

## Installation

### Chrome Web Store

Install it from the [Chrome Web Store](https://chromewebstore.google.com/detail/media-keys-for-youtube/dhknepdlbdkafcapjncianfeeppfnjcn).

### From Source (Developer Mode)

1. Clone or download this repository
2. Open Chrome/Edge and navigate to `chrome://extensions`
3. Enable **Developer mode** (toggle in the top right)
4. Click **Load unpacked**
5. Select the folder containing this extension

## Compatibility

- Google Chrome
- Microsoft Edge
- Other Chromium-based browsers (Brave, Vivaldi, Opera, etc.)

## Why This Extension?

YouTube's default media key behavior can be frustrating - the next/previous track buttons jump between videos even when you just want to seek within the current video. This extension gives you granular control:

- Quick taps for seeking within a video
- Intentional holds for playlist navigation

## Known Issues

### Media keys lag when YouTube is on another virtual desktop (Windows)

**Symptom:** Media keys respond instantly when the YouTube window is on your current desktop, but take 0.5 to 1 second when it is on another Windows virtual desktop. Play/pause is affected too.

**Cause:** This is browser behavior, not the extension. It happens with the extension disabled as well. A window on another virtual desktop counts as hidden, and Chromium browsers slow down hidden tabs to save power. YouTube's own playback code then reacts late to the key press.

**Fix:** Start the browser with these two flags, which stop it from slowing down hidden windows:

```
--disable-backgrounding-occluded-windows --disable-renderer-backgrounding
```

1. Right-click your browser shortcut and choose **Properties**.
2. In **Target**, add the flags after the closing quote, separated by a space. For example, for Brave:
   ```
   "C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe" --disable-backgrounding-occluded-windows --disable-renderer-backgrounding
   ```
3. Close the browser completely. Check Task Manager and end any browser process that is still running. The flags are ignored if the browser is already running.
4. Start the browser from that shortcut.

Notes:

- Tested on Brave on Windows 11. The flags are standard Chromium flags, so they should also work in Chrome and Edge.
- The flags only apply when the browser is started from the edited shortcut.
- With the flags, the browser no longer saves power on hidden windows, so it can use more CPU and battery.

## License

MIT License
