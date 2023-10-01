defmodule KinoTextToSpeech.MixProject do
  use Mix.Project

  @version "0.1.0"
  @description "Text to Speech integration with Livebook"

  def project do
    [
      app: :kino_text_to_speech,
      version: @version,
      description: @description,
      name: "KinoTextToSpeech",
      elixir: "~> 1.14",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      docs: docs(),
      package: package(),
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
      mod: {KinoTextToSpeech.Application, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:kino, "~> 0.10"},

      # Dev only
      {:ex_doc, "~> 0.28", only: :dev, runtime: false}
    ]
  end

  defp docs do
    [
      main: "components",
      source_url: "https://github.com/w0rd-driven/kino_text_to_speech",
      source_ref: "v#{@version}",
      extras: ["guides/components.livemd"]
    ]
  end

  def package do
    [
      licenses: ["MIT"],
      links: %{
        "GitHub" => "https://github.com/w0rd-driven/kino_text_to_speech"
      }
    ]
  end
end
