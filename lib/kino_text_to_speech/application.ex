defmodule KinoTextToSpeech.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    Kino.SmartCell.register(KinoTextToSpeech.TextToSpeechCell)
    children = []
    opts = [strategy: :one_for_one, name: KinoTextToSpeech.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
