import * as Vue from "https://cdn.jsdelivr.net/npm/vue@3.2.47/dist/vue.esm-browser.prod.js";

export function init(ctx, payload) {
  ctx.importCSS("main.css");
  ctx.importCSS(
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap"
  );
  ctx.importCSS(
    "https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.min.css"
  );

  const BaseSelect = {
    name: "BaseSelect",

    props: {
      label: {
        type: String,
        default: "",
      },
      selectClass: {
        type: String,
        default: "input",
      },
      modelValue: {
        type: String,
        default: "",
      },
      options: {
        type: Array,
        default: [],
        required: true,
      },
      required: {
        type: Boolean,
        default: false,
      },
      inline: {
        type: Boolean,
        default: false,
      },
      existent: {
        type: Boolean,
        default: false,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
    },

    template: `
    <div v-bind:class="inline ? 'inline-field' : 'field'">
      <label v-bind:class="inline ? 'inline-input-label' : 'input-label'">
        {{ label }}
      </label>
      <select
        :value="modelValue"
        v-bind="$attrs"
        v-bind:disabled="disabled"
        @change="$emit('update:modelValue', $event.target.value)"
        v-bind:class="[selectClass, existent ? '' : 'nonexistent']"
      >
        <option
          v-for="option in options"
          :value="option.value"
          :key="option"
          :selected="option.value === modelValue"
        >{{ option.label }}</option>
      </select>
    </div>
    `,
  };

  const BaseRange = {
    name: "BaseRange",

    props: {
      label: {
        type: String,
        default: "",
      },
      inputClass: {
        type: String,
        default: "input",
      },
      modelValue: {
        type: [String, Number],
        default: "",
      },
      min: {
        type: Number,
        default: 0,
      },
      max: {
        type: Number,
        default: 2,
      },
      step: {
        type: Number,
        default: 0.1,
      },
      inline: {
        type: Boolean,
        default: false,
      },
      grow: {
        type: Boolean,
        default: false,
      },
      number: {
        type: Boolean,
        default: false,
      },
    },

    template: `
    <div v-bind:class="[inline ? 'inline-field' : 'field', grow ? 'grow' : '']">
      <label v-bind:class="inline ? 'inline-input-label' : 'input-label'">
        {{ label }}
      </label>
      <input
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
        v-bind:class="[inputClass, number ? 'input-number' : '']"
        :min="min"
        :max="max"
        :step="step"
      >
    </div>
    `,
  };

  const ToggleBox = {
    name: "ToggleBox",

    props: {
      toggle: {
        type: Boolean,
        default: true,
      },
    },

    template: `
    <div v-bind:class="toggle ? 'hidden' : ''">
      <slot></slot>
    </div>
    `,
  };

  const app = Vue.createApp({
    components: {
      BaseSelect: BaseSelect,
      BaseRange: BaseRange,
      ToggleBox: ToggleBox,
    },

    template: `
    <div class="app">
      <div>
        <ToggleBox class="info-box" v-bind:toggle="isVoicesExistent">
          <p>To hear the text spoken, you need at least one voice present.</p>
          <p>Your browser should be loading them in asynchronously.</p>
        </ToggleBox>
        <div class="header">
          <BaseSelect
            @change="handleVoiceChange"
            name="voice"
            label="Voice"
            v-model="payload.voice"
            selectClass="input"
            :existent="isVoicesExistent"
            :disabled="isVoicesDisabled"
            :inline
            :options="voiceLabels"
          />
          <BaseRange
            @change="handleVolumeChange"
            name="volume"
            label="volume"
            type="range"
            placeholder="Volume"
            v-model="payload.volume"
            inputClass="input input--xs"
            min="0"
            max="1"
            step="0.1"
            :inline
          />
          <BaseRange
            @change="handleRateChange"
            name="rate"
            label="Rate"
            type="range"
            placeholder="Rate"
            v-model="payload.rate"
            inputClass="input input--xs"
            min="0.1"
            max="10"
            step="0.1"
            :inline
          />
          <BaseRange
            @change="handlePitchChange"
            name="pitch"
            label="Pitch"
            type="range"
            v-model="payload.pitch"
            inputClass="input input--xs"
            min="0"
            max="2"
            step="0.1"
            :inline
          />
          <div class="grow"></div>
          <button id="help-toggle" @click="toggleHelpBox" class="icon-button">
            <i class="ri ri-questionnaire-line" aria-hidden="true"></i>
          </button>
      </div>
      <ToggleBox id="help-box" class="section help-box" v-bind:toggle="isHelpBoxHidden">
        <span v-pre>To dynamically inject values into the text use double curly braces, like {{name}}.</span>
      </ToggleBox>
    </div>
    `,

    data() {
      return {
        isHelpBoxHidden: true,
        isSettingsBoxHidden: true,
        voices: [],
        synth: window.speechSynthesis,
        payload: payload,
      };
    },

    computed: {
      voiceLabels() {
        return this.voices.map((voice) => {
          return {
            label: voice.name,
            value: voice.name,
            name: voice.name,
            lang: voice.lang,
          };
        });
      },
      isVoicesExistent() {
        return this.voices.length != 0;
      },
      isVoicesDisabled() {
        return this.voices.length == 0;
      },
    },
    methods: {
      handleVoiceChange({ target: { value } }) {
        ctx.pushEvent("update_voice", value);
      },

      handleVolumeChange({ target: { value } }) {
        ctx.pushEvent("update_volume", value);
      },

      handleRateChange({ target: { value } }) {
        ctx.pushEvent("update_rate", value);
      },

      handlePitchChange({ target: { value } }) {
        ctx.pushEvent("update_pitch", value);
      },

      toggleHelpBox(_) {
        this.isHelpBoxHidden = !this.isHelpBoxHidden;
      },

      toggleSettingsBox(_) {
        this.isSettingsBoxHidden = !this.isSettingsBoxHidden;
      },

      // See https://blog.monotonous.org/2021/11/15/speechSynthesis-getVoices/
      async getVoices() {
        const GET_VOICES_TIMEOUT = 2000; // two second timeout

        let voices = this.synth.getVoices();
        if (voices.length) {
          return voices;
        }

        let voiceschanged = new Promise((resolve) =>
          this.synth.addEventListener("voiceschanged", resolve, { once: true })
        );

        let timeout = new Promise((resolve) =>
          setTimeout(resolve, GET_VOICES_TIMEOUT)
        );

        // whatever happens first, a voiceschanged event or a timeout.
        await Promise.race([voiceschanged, timeout]);

        return this.synth.getVoices();
      },
    },
    async mounted() {
      this.voices = await this.getVoices();
    },
  }).mount(ctx.root);

  ctx.handleEvent("update_text", (variable) => {
    app.payload.text = variable;
  });

  ctx.handleEvent("update_voice", (variable) => {
    app.payload.voice = variable;
  });

  ctx.handleEvent("update_volume", (variable) => {
    app.payload.volume = variable;
  });

  ctx.handleEvent("update_rate", (variable) => {
    app.payload.rate = variable;
  });

  ctx.handleEvent("update_pitch", (variable) => {
    app.payload.pitch = variable;
  });

  ctx.handleEvent("speak", ({ text }) => {
    let speakingText = text.replace("**Speaking**: ", "");
    console.log(`Speaking: ${speakingText}`);

    if (app.synth.speaking) {
      console.error("speechSynthesis.speaking");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(speakingText);
    const voice = app.voices.find(
      (voice) => voice.name === app.payload.voice
    );
    utterance.voice = voice;
    utterance.volume = app.payload.volume;
    utterance.pitch = app.payload.pitch;
    utterance.rate = app.payload.rate;
    app.synth.speak(utterance);
  });
  
  ctx.handleSync(() => {
    // Synchronously invokes change listeners
    document.activeElement &&
      document.activeElement.dispatchEvent(
        new Event("change", { bubbles: true })
      );
  });
}
