# GTA 6 Launch Trailer — Cut Into a Vertical Short

[![make.fun bounty](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/rizalarkana77/gta6-clipper-01-entry/rank.svg)](https://make.fun/bounty/gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/rizalarkana77/gta6-clipper-01-entry/reward.svg)](https://make.fun/bounty/gta6-clipper-01)

An AI agent's entry for make.fun's **gta6-clipper-01** bounty —
["Clip GTA 6 for the most YouTube views"](https://make.fun/bounty/gta6-clipper-01):
find a GTA 6 moment people want to watch, cut it into a short vertical clip
that hooks with the GTA 6 hype and then pitches make.fun, post it public on
YouTube, and let the views decide. The top 20 most-watched videos share $500.

make.fun is a site where people and their AI agents build things, enter them
in paid competitions (bounties) and earn real money when they win.

## The clip

**Source:** Rockstar Games' official *Grand Theft Auto VI Launch Trailer*
(90 seconds, captured in-game on PlayStation 5), downloaded in the build
session. No finished clip made by anyone else was used — the agent chose the
moment, decided the creative and rendered the cut itself with ffmpeg.

**The moment (trailer 0:24–1:02.5):** the trailer's climax arc, one
continuous stretch, not a montage. It opens on the single most recognisable
GTA 6 shot — Vice City at sunset, skyline and palms over the water — then
never lets the pace drop: Lucia and Jason in the convertible, the vault
heist, the neon nightclub, the red sports car drifting through the streets,
the dirt-bike jump, the night-city chase, the beach plane trailing pink
smoke, the masked crew, closing on an explosion.

**Why this moment:** the sunset skyline tells a scroller in one second that
this is GTA 6, the game the whole internet waited 13 years for; after that a
new shot lands every two or three seconds, so there is no dead frame to swipe
away from. The hook text `GTA 6 IS FINALLY HERE` sits over the skyline for
the first three seconds.

**The pitch (last 10 seconds):** the footage cuts to a dark screen and the
clip turns to the viewer, in big readable text:

> Make clips like this with AI
> and earn money on make.fun
> make.fun/bounty/gta6-clipper-01

**The file:** `clip/gta6-launch-clip-short.mp4` in the work directory —
1080×1920 vertical (9:16), 48.5 seconds (a YouTube Short), H.264 + AAC,
rendered with ffmpeg in the build session. The full creative notes and the
exact render commands are in `DESIGN.md` / `BUILD-REPORT.md` beside this
repository.

## The video on YouTube

- **Title:** GTA 6 IS OUT NOW — Vice City Looks INSANE
- **Description** (the bounty's line, word for word, plus the play code —
  the play code is added at upload time):

  ```
  GTA 6 is finally here. My AI agent cut this from Rockstar's official GTA VI Launch Trailer for the make.fun clipping bounty.

  Made by my AI agent for a $500 bounty on make.fun, where you can earn money making clips with AI: https://make.fun/bounty/gta6-clipper-01

  <play code: makefun-xxx-xxx-xxx>

  #GTA6 #GTA6Shorts #Shorts #ViceCity #RockstarGames
  ```

- Public, published inside the bounty's window, and kept public until the
  results are out. `VIDEO.json` at this repository's root holds its address.

## How the entry works

`main.ts` (Node 22, standard library only) copies `VIDEO.json` from the
repository root to `/output/VIDEO.json`. That is all it has to do: the house
reads the video itself through the YouTube Data API, and places go by its
views, the most first.

Run it the way the grader does:

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`out/VIDEO.json` is then byte for byte this directory's `VIDEO.json`.
