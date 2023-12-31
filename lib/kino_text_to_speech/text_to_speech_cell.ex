defmodule KinoTextToSpeech.TextToSpeechCell do
  use Kino.JS, assets_path: "lib/assets/text_to_speech_cell"
  use Kino.JS.Live
  use Kino.SmartCell, name: "Text to Speech"

  @impl true
  def init(attrs, ctx) do
    text = attrs["text"] || ""
    voice = attrs["voice"] || ""
    volume = attrs["volume"] || 1.0
    rate = attrs["rate"] || 1.0
    pitch = attrs["pitch"] || 1.0

    ctx =
      assign(ctx,
        text: Kino.SmartCell.prefixed_var_name("text", text),
        voice: voice,
        volume: volume,
        rate: rate,
        pitch: pitch
      )

    editor = [
      attribute: "text",
      language: "markdown",
      default_source: text
    ]

    {:ok, ctx, editor: editor}
  end

  @impl true
  def scan_eval_result(server, eval_result) do
    {:ok, %Kino.Markdown{content: text}} = eval_result
    send(server, {:speak, text})
  end

  @impl true
  def handle_connect(ctx) do
    payload = %{
      text: ctx.assigns.text,
      voice: ctx.assigns.voice,
      volume: ctx.assigns.volume,
      rate: ctx.assigns.rate,
      pitch: ctx.assigns.pitch
    }

    {:ok, payload, ctx}
  end

  @impl true
  def handle_event("update_text", text, ctx) do
    ctx = assign(ctx, text: text)
    broadcast_event(ctx, "update_text", text)
    {:noreply, ctx}
  end

  def handle_event("update_voice", voice, ctx) do
    ctx = assign(ctx, voice: voice)
    broadcast_event(ctx, "update_voice", voice)
    {:noreply, ctx}
  end

  def handle_event("update_volume", volume, ctx) do
    {:ok, volume} = cast_typed_value("float", volume)
    ctx = assign(ctx, volume: volume)
    broadcast_event(ctx, "update_volume", volume)
    {:noreply, ctx}
  end

  def handle_event("update_rate", rate, ctx) do
    {:ok, rate} = cast_typed_value("float", rate)
    ctx = assign(ctx, rate: rate)
    broadcast_event(ctx, "update_rate", rate)
    {:noreply, ctx}
  end

  def handle_event("update_pitch", pitch, ctx) do
    {:ok, pitch} = cast_typed_value("float", pitch)
    ctx = assign(ctx, pitch: pitch)
    broadcast_event(ctx, "update_pitch", pitch)
    {:noreply, ctx}
  end

  defp cast_typed_value("float", value) do
    case Float.parse(value) do
      {value, _} -> {:ok, value}
      _ -> nil
    end
  end

  @impl true
  def handle_info({:speak, text}, ctx) do
    broadcast_event(ctx, "speak", %{text: text})
    {:noreply, ctx}
  end

  @impl true
  def to_attrs(ctx) do
    %{
      "text" => ctx.assigns.text,
      "voice" => ctx.assigns.voice,
      "volume" => ctx.assigns.volume,
      "rate" => ctx.assigns.rate,
      "pitch" => ctx.assigns.pitch
    }
  end

  @impl true
  def to_source(attrs) do
    quote do
      unquote(attrs["text"])
    end
    |> String.split(" ")
    |> List.insert_at(0, "**Speaking**: ")
    |> Enum.join(" ")
    |> Kino.Markdown.new()
    |> Kino.SmartCell.quoted_to_string()
  end
end
