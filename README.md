# KinoTextToSpeech

[![Docs](https://img.shields.io/badge/hex.pm-docs-8e7ce6.svg)](https://hexdocs.pm/kino_text_to_speech)
[![Actions Status](https://github.com/w0rd-driven/kino_text_to_speech/workflows/Test/badge.svg)](https://github.com/w0rd-driven/kino_text_to_speech/actions)

Text-to-Speech using the [SpeechSynthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
with [Kino](https://github.com/livebook-dev/kino)
for [Livebook](https://github.com/livebook-dev/livebook).

* [Installation](#installation)
* [Goals](#goals)
* [Demonstrations](#demonstrations)
* [Caveats](#caveats)
* [Resources](#resources)
    * [Speech Synthesis](#speech-synthesis)
    * [Kino Smart Cells](#kino-smart-cells)
* [License](#license)

## Installation

To bring KinoTextToSpeech to Livebook all you need to do is `Mix.install/2`:

```elixir
Mix.install([
  {:kino_text_to_speech, "~> 0.1.0"}
])
```

## Goals

* [x] Implement initial prototype in [Livebook](notebooks/prototype.livemd).
* [x] Convert to using Vue3 components from other Kino Smart Cells.
* [ ] Reevaluating a later cell does not play the entire notebook in the playground.
    * I thought I had this working but it's possible I was relying on a specific quirk that should not have been there.
* [ ] Do more extensive testing with branching sections.
    * [ ] There were issues where cells were skipped in playback
* [ ] Add Play/Pause and Stop buttons instead of Cell evaluation?
* [ ] Utterances play sequentially. Remove the console.error to queue multiple plays?

## Demonstrations

### Introduction

Introduces the basic functionality of `~v0.1`.

https://github.com/w0rd-driven/kino_text_to_speech/assets/489986/8d3f1793-1d30-4219-81c9-37d105a5ebce

## Caveats

* According to [https://dev.to/jankapunkt/cross-browser-speech-synthesis-the-hard-way-and-the-easy-way-353](https://dev.to/jankapunkt/cross-browser-speech-synthesis-the-hard-way-and-the-easy-way-353), there are a lot of issues with cross-browser support.
    * Cramming a JS library into every cell is doable but it's better served at the application layer but only loaded in when necessary.
* I've currently only tested this in Chrome where I've needed to use async and/or a timeout to initialize SpeechSynthesis voices.

## Resources

### Speech Synthesis

* [SpeechSynthesis API on MDN](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis).
* [https://blog.monotonous.org/2021/11/15/speechSynthesis-getVoices/](https://blog.monotonous.org/2021/11/15/speechSynthesis-getVoices/)
* [https://webplatformcourse.com/bonus/speech-synthesis-api/](https://webplatformcourse.com/bonus/speech-synthesis-api/)
* [https://dev.to/jankapunkt/cross-browser-speech-synthesis-the-hard-way-and-the-easy-way-353](https://dev.to/jankapunkt/cross-browser-speech-synthesis-the-hard-way-and-the-easy-way-353)
* [https://github.com/jankapunkt/easy-speech](https://github.com/jankapunkt/easy-speech)

### Kino Smart Cells

* [Kino](https://github.com/livebook-dev/kino)
* [KinoDB](https://github.com/livebook-dev/kino_db/)
* [KinoExplorer](https://github.com/livebook-dev/kino_explorer)
* [AdventOfCode](https://github.com/nettinho/smaoc/)

## License

Copyright (C) 2023 Jeremy Brayton

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
