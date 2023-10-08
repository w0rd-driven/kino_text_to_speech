# KinoTextToSpeech

[![Docs](https://img.shields.io/badge/hex.pm-docs-8e7ce6.svg)](https://hexdocs.pm/kino_text_to_speech)
[![Actions Status](https://github.com/w0rd-driven/kino_text_to_speech/workflows/Test/badge.svg)](https://github.com/w0rd-driven/kino_text_to_speech/actions)

Text-to-Speech using the [SpeechSynthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
with [Kino](https://github.com/livebook-dev/kino)
for [Livebook](https://github.com/livebook-dev/livebook).

## Installation

To bring KinoTextToSpeech to Livebook all you need to do is `Mix.install/2`:

```elixir
Mix.install([
  {:kino_text_to_speech, "~> 0.1.0"}
])
```

## Resources

* [SpeechSynthesis API on MDN](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis).
* [https://blog.monotonous.org/2021/11/15/speechSynthesis-getVoices/](https://blog.monotonous.org/2021/11/15/speechSynthesis-getVoices/)
* [https://webplatformcourse.com/bonus/speech-synthesis-api/](https://webplatformcourse.com/bonus/speech-synthesis-api/)
* [https://dev.to/jankapunkt/cross-browser-speech-synthesis-the-hard-way-and-the-easy-way-353](https://dev.to/jankapunkt/cross-browser-speech-synthesis-the-hard-way-and-the-easy-way-353)
* [https://github.com/jankapunkt/easy-speech](https://github.com/jankapunkt/easy-speech)

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
