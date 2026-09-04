# Gun Fusion 🎯🔫

A fast, satisfying **merge-and-shoot arcade game**: combine identical weapons on
your bench to unlock bigger guns, then hold off waves of charging stickmen.
Bigger guns, bigger booms — plus a lucky wheel, upgrade shop and endless
level ladder to keep you pulling the trigger. Fully **offline**: no ads, no
accounts, no network calls — everything runs from local files.

Built from the Phaser 3 + Spine original (TinyDobbins) with its platform SDK
replaced by a neutral offline driver.

## Controls

| Device | Action |
|---|---|
| Smartphone / tablet | Tap to aim & shoot; tap the on-screen buttons |
| Desktop | Move the mouse to aim, left-click to shoot |
| Trackpad | Single click to shoot |
| Keyboard | Not required |

## Offline modifications

- Replaced the Poki SDK with a neutral `game-driver.js` (ad breaks resolve
  instantly, rewarded ads auto-grant the reward).
- Removed the platform sitelock (obfuscated domain check).
- All 90+ assets (spritesheets, Spine atlases, 53 audio tracks) served locally.
- Retitled to **Gun Fusion** with a freshly generated logo.
- No analytics, no banners, no external requests.

## Run

```bash
./serve.sh          # or: python3 -m http.server 8000
```

Then open http://localhost:8000 — the game needs HTTP, `file://` won't work.

## License

Game code & assets © TinyDobbins, redistributed here in a de-SDK'd offline
form for preservation/personal play. README & driver: MIT.
