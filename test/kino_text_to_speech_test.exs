defmodule KinoTextToSpeechTest do
  use ExUnit.Case, async: true

  import Kino.Test

  alias KinoTextToSpeech.TextToSpeechCell

  setup :configure_livebook_bridge

  describe "initialization" do
    test "restores source code from attrs" do
      attrs = %{
        "pitch" => 1.0,
        "rate" => 1.0,
        "text" => "Greetings Professor Falken",
        "voice" => "Ralph",
        "volume" => 1.0
      }

      {_kino, source} = start_smart_cell!(TextToSpeechCell, attrs)

      assert source ==
               "%Kino.Markdown{content: \"**Speaking**:  Greetings Professor Falken\"}"
    end
  end
end
