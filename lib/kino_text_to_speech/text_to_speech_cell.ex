defmodule KinoTextToSpeech.TextToSpeechCell do
  use Kino.JS, assets_path: "lib/assets/text_to_speech_cell"
  use Kino.JS.Live
  use Kino.SmartCell, name: "Text to Speech"

  @impl true
  def init(attrs, ctx) do
    text = attrs["text"] || ""

    ctx =
      assign(ctx,
        text: Kino.SmartCell.prefixed_var_name("text", text)
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
      text: ctx.assigns.text
    }

    {:ok, payload, ctx}
  end

  @impl true
  def handle_event("update_text", text, ctx) do
    ctx =
      if Kino.SmartCell.valid_variable_name?(text) do
        assign(ctx, text: text)
      else
        ctx
      end

    broadcast_event(ctx, "update_text", ctx.assigns.text)

    {:noreply, ctx}
  end

  @impl true
  def handle_info({:speak, text}, ctx) do
    broadcast_event(ctx, "speak", %{text: text})
    {:noreply, ctx}
  end

  @impl true
  def to_attrs(ctx) do
    %{
      "text" => ctx.assigns.text
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