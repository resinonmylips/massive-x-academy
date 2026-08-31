import { ManualModule } from '../types';

export const manualModules: ManualModule[] = [
  {
    id: 'intro-overview',
    title: '1. Welcome & Interface Overview',
    iconName: 'Compass',
    description: 'Learn the architectural background of Massive X, the history, settings, and view switching buttons.',
    sections: [
      {
        id: 'disclaimer-welcome',
        title: 'Welcome & Document Conventions',
        content: 'Massive X is the semi-modular successor to the iconic Massive synthesizer that helped define modern musical genres. It is authored by Jan Ola Korte, Hannah Lockwood, David Gover, and Nicolas Sidi (Software Version 1.6, 07/2025).\n\n### Document Conventions:\n* *Italics* represent file paths, directories, and hard-drive locations.\n* **Bold** represents software controls, buttons, views, or parameters.\n* `[Brackets]` indicate keyboard shortcuts.\n* 💡 **Light Bulb**: Useful tips or design suggestions.\n* ℹ️ **Information**: Important context or prerequisite settings.\n* ⚠️ **Warning**: Critical alerts regarding serious audio, CPU, or crash risks.',
        technicalSpecs: {
          'Author Team': 'Jan Ola Korte, Hannah Lockwood, David Gover, Nicolas Sidi',
          'Document Version': '1.6 (Release Date 07/2025)',
          'Architecture': 'Semi-modular full-stack polyphonic/monophonic synthesiser'
        }
      },
      {
        id: 'whats-new',
        title: "What's New in Massive X (v1.1 to v1.6)",
        content: 'Each successive release has added critical features to Massive X. Below is the historical timeline:\n\n### Version 1.6:\n* **Player Version**: Released Massive X Player with a streamlined, non-editable feature set.\n* **Play View**: Added the play view including **Macros 1–8**, **Morpher** snapshot board, and **Animator**.\n* **MX Player Library**: 60 premium performance presets.\n* **Load Init Preset**: Replaced the default blank load with a menu action under the Settings icon.\n\n### Version 1.5:\n* **Multi Compressor**: Triple-band upward/downward compressor in Stereo Effects.\n* **New Presets**: 60 extra Factory Library patches.\n\n### Version 1.4:\n* **Tag Browser**: NKS-based Tag filtering, Text Search, user presets, and user favorites.\n* **Bass Enhancer**: Insert effect focusing on low-frequency saturation.\n* **LP4 Mode**: 4-pole low-pass mode with a steep -24 dB/Oct slope added to the State Variable Filter (SVF).\n\n### Version 1.3:\n* **Hover Tooltips**: Parameter values appear automatically on hover.\n* **Noise Key Tracking**: Enabled noise key-tracking via Noise pitch menus.\n* **Transient Category**: Added percussive noise loops including specialized click/one-shot fade-out curves.\n* **Custom User Noisetables**: Support for importing WAV, FLAC, AIFF, MP3, OGG, and MP4 samples.\n\n### Version 1.2:\n* **Drag-and-Drop Import**: Drag presets onto the UI to save directly to the User folder.\n* **Komplete Kontrol Lightguide**: S-Series keyboards light up to indicate Remote Octave keys.\n* **Demo Duration**: Expanded test period to 60 minutes.\n\n### Version 1.1:\n* **Interactive Displays**: Envelopes (Amp, Exciter, Modulation) and LFO Switcher/Random rise/fall displays respond in real-time.\n* **Theme Support**: Dark, Light, Flat Default, Flat Dark, and Flat Light themes (Flat modes optimize GPU efficiency).',
        technicalSpecs: {
          'Noisetable categories added in 1.3': 'Transients (ideal for percussive clicks and one-shots)',
          'Demo limit': '60 minutes',
          'Flat UI modes': 'Improves rendering performance on older graphics cards'
        }
      },
      {
        id: 'header-settings',
        title: 'The Header & Settings Menu',
        content: 'The **Header** sits at the top of the GUI. It contains view switching, preset management, volume, and global settings.\n\n### Views:\n1. **Play View**: Compact, focused on macros, morpher, and performance.\n2. **Edit View**: Fully expanded canvas to modify parameters, routings, and modulators. *(Not available in Massive X Player)*.\n3. **Browse View**: Full tag filtering to explore expansion banks.\n\n### Settings Dropdown Menu:\n* **Load Init Preset**: Loads the default blank template.\n* **Show User Content Folder**: Opens the user directory. Presets are stored in:\n  `Documents/Native Instruments/User Content/Massive X/Presets`\n* **View Size**: Provides eight zoom ratios from 50% to 200%.\n* **Control Sensitivity**: 9 options (25% to 250%) to fine-tune knob drag resolution.\n* **Rescan Content**: Forces a folder sync to index newly downloaded or moved user presets or noisetables.',
        tips: [
          'Single-clicking a preset in the browser loads it but leaves Browse open. Double-clicking loads the preset and immediately returns to the previous Edit or Play view.'
        ],
        warnings: [
          'User presets cannot overwrite the MX Factory Library. Saves will automatically output to the User directory to ensure safety of original assets.'
        ]
      }
    ],
    quiz: [
      {
        id: 'q-authors',
        question: 'Which of the following authors are officially credited in the Massive X manual disclaimer?',
        options: [
          'Stephan Schmitt and Marcus Leber',
          'Jan Ola Korte, Hannah Lockwood, David Gover, Nicolas Sidi',
          'Rolf Wöhrmann and Dieter Doepfer',
          'Urs Heckmann and Peter Kirn'
        ],
        correctAnswerIndex: 1,
        explanation: 'The manual explicitly lists Jan Ola Korte, Hannah Lockwood, David Gover, and Nicolas Sidi as the authors.'
      },
      {
        id: 'q-preset-path',
        question: 'Where are user presets saved by default in Massive X on your computer?',
        options: [
          'Documents/Native Instruments/User Content/Massive X/Presets',
          'AppData/Roaming/Native Instruments/Massive X/Banks',
          'Library/Application Support/Native Instruments/Massive X/Presets',
          'Program Files/Common Files/VST3/Massive X/User'
        ],
        correctAnswerIndex: 0,
        explanation: 'According to Version 1.3.1+ specifications in the manual, user presets are saved in Documents/Native Instruments/User Content/Massive X/Presets.'
      },
      {
        id: 'q-double-click-preset',
        question: 'What is the operational difference between single-clicking and double-clicking a preset in the Browser?',
        options: [
          'Single-clicking previews the sound; double-clicking loads it.',
          'Single-clicking loads the preset and keeps Browse open; double-clicking loads and immediately closes the Browse view.',
          'Single-clicking loads to OSC1; double-clicking loads to OSC2.',
          'Single-clicking acts as a Favorite tag; double-clicking initiates the edit mode.'
        ],
        correctAnswerIndex: 1,
        explanation: 'The manual specifies: "Single-clicking a preset loads it and keeps the Browse view open, while double-clicking the preset loads it and closes the Browse view."'
      }
    ]
  },
  {
    id: 'play-view',
    title: '2. Play View, Morpher & Animator',
    iconName: 'Play',
    description: 'Master macro performance, manual 4-corner snapshot morphing, and automated algorithmic trail animation.',
    sections: [
      {
        id: 'macros-1-8',
        title: 'Macros 1–8 & Performance Controls',
        content: 'The first eight Macros of any preset are pinned to the bottom of the **Play View**. They represent the most critical, expressive parameters mapped by the sound designer.\n\n### Macro Parts:\n1. **Macro Label**: Highlights the function (e.g., *WT Pos*, *Cutoff*, *Anima*, *Delay*).\n2. **Macro Knob**: Continuous controller linked via MIDI CC or DAW Host Automation. Double-clicking resets it to default.\n3. **Morph Switch**: A small orange LED ring above each knob. When turned **On**, the Macro participates in snapshot morphing. When turned **Off**, the Macro remains fixed, ignoring Morpher cursor movement.',
        tips: [
          'If a Macro controls global reverb mix, turn its Morph Switch OFF. This prevents your reverb tail from glitching or changing when morphing other structural parameters.'
        ]
      },
      {
        id: 'morpher-snapshots',
        title: 'The Morpher Snapshot Canvas',
        content: 'The **Morpher** is a large square 2D vector field. Each of the four corners represents a complete "Macro Snapshot" (a stored set of values for Macros 1–8):\n* **Snapshot 1**: Top-Left\n* **Snapshot 2**: Top-Right\n* **Snapshot 3**: Bottom-Left\n* **Snapshot 4**: Bottom-Right\n\n### Key Commands:\n* **Recall Snapshot**: Click the corner number (1–4) to jump the cursor instantly to that state.\n* **Store Snapshot**: Click the **Focus Icon** in a corner to write the current positions of the 8 macro knobs to that snapshot.\n* **Randomize Snapshot**: Click the **Dice Icon** to write random values to that corner.',
        technicalSpecs: {
          'Morphing Mathematics': 'Values are calculated proportionally using bilinear interpolation based on physical distance from the cursor to each corner.',
          'Cursor in Middle': 'Macro values output the exact average of all four corners.',
          'Cursor Halfway Right': 'Macro values are set 50% between Snapshot 2 and Snapshot 4.'
        }
      },
      {
        id: 'animator-automation',
        title: 'The Animator Engine',
        content: 'The **Animator** automates the 2D cursor within the Morpher along preset geometric paths or customized vector trails.\n\n### Interface Parameters:\n* **Animator On/Off**: Enables or disables automated cursor driving. When active, manual cursor dragging is locked.\n* **Trail Selector**: Choose from 12 distinct trajectories (Square, Circle, Triangle, Vertical Line, Sine, Double Loop, Infinity, Clover, Target, and more).\n* **Reverse**: Drives the cursor in the opposite direction along the path.\n* **Rate Slider**: Sets speed. When **Sync** is off, rate ranges continuously from *Slow* to *Fast*. When **Sync** is on, speed is quantized in bar increments from **16 bars** (slowest) down to **1/8 bar** (fastest).\n* **Sync Mode**: Link to DAW transport:\n  * *Retrigger Off*: Speed and trail position are locked to the absolute host song position. Only runs when the host plays.\n  * *Retrigger On*: Linked to host tempo, but runs constantly regardless of play state.\n* **Retrigger Button**: When enabled, the Animator restarts at the origin of the trail with every new MIDI key press.',
        warnings: [
          'Setting a high sync rate (e.g. 1/8 bar) with complex trails will modulate macros extremely rapidly, creating heavy CPU filter sweeps.'
        ]
      }
    ],
    quiz: [
      {
        id: 'q-morph-switch',
        question: 'What happens to a Macro knob if its Morph Switch (above the knob) is deactivated?',
        options: [
          'It is muted and outputs silence.',
          'It is disconnected from the Morpher, retaining its static value even if the Morpher cursor is moved.',
          'It will only respond to Pitch Bend information.',
          'It randomly shifts values based on the Animator.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Deactivating the Morph Switch decouples that specific Macro from the Morpher, so its value remains constant as the cursor moves.'
      },
      {
        id: 'q-animator-sync',
        question: 'With Animator Sync ON and Retrigger OFF, what determines the position of the Morpher cursor?',
        options: [
          'The velocity of the last played MIDI note.',
          'The absolute song position (timeline) of the host DAW, running only during playback.',
          'The pitch of the key pressed.',
          'A internal random walk generator.'
        ],
        correctAnswerIndex: 1,
        explanation: 'When Sync is ON and Retrigger is OFF, the Animator’s rate is set relative to host tempo and its position is directly linked to the song position in the DAW, running only during active playback.'
      },
      {
        id: 'q-animator-rate-range',
        question: 'When sync is active, what is the maximum speed (fastest rate) of the Animator trail traversal?',
        options: [
          '1/32 bar',
          '1/16 bar',
          '1/8 bar',
          '1/4 bar'
        ],
        correctAnswerIndex: 2,
        explanation: 'The manual lists the synced Animator rate values as ranging from 16 bars (slowest) to 1/8 bar (fastest).'
      }
    ]
  },
  {
    id: 'routing',
    title: '3. Semi-Modular Routing System',
    iconName: 'Network',
    description: 'Master the open routing canvas, polyphonic modules, monophonic stereo FX chains, and feedback loops.',
    sections: [
      {
        id: 'routing-overview',
        title: 'Canvas & Signal Flow Areas',
        content: 'Massive X has an open semi-modular routing architecture. Wires connect generator outputs to processor inputs. The routing screen is divided into two distinct horizontal zones:\n\n1. **Polyphonic Area (Left)**: Processes every single played voice completely independently. It contains **Oscillators (1, 2)**, **Noise players (1, 2)**, the **Filter (F)**, and **Insert Effects (A, B, C)**. Generators are colored **Black**; processors are colored **Gray**.\n2. **Monophonic Area (Right)**: Sums all individual polyphonic voices together into a stereo signal before applying the **Stereo Effects (X, Y, Z)** and routing the signal to your DAW track output.',
        technicalSpecs: {
          'Polyphonic Modules': 'Wavetable OSC 1/2, Noise 1/2, Main Filter, Insert FX A/B/C, FB Loop, Mod 1/2',
          'Monophonic Modules': 'Stereo FX X, Y, Z, Master VCA',
          'Stereo Inputs to Mono Area': 'Four independent physical inputs (X, Y, Z, and direct bypassed to host)'
        }
      },
      {
        id: 'fb-loop-routing',
        title: 'Feedback Loops & PM Aux Bus',
        content: 'Massive X allows you to route signals backward through the signal chain to create complex saturation, resonance, or physical modeling behaviors.\n\n### The Feedback (FB) Loop:\n* Facilitated by two routing modules: **FB Input** and **FB Output**.\n* Signals can be sent from any processor output (like the filter output) back into a generator or filter input.\n* **FB Level**: Controlled via the **Amplifier Section**. Features a dedicated knob to set feedback amplitude.\n* **High-pass Filter**: A small button with a curve icon next to the FB Level control. Filters low-frequency content in the feedback path to prevent runaway sub-bass build-up.\n\n### PM Aux Bus:\n* Accessible via a dedicated module in the Polyphonic routing area.\n* Allows any source in the routing grid to act as a **Phase Modulation (PM)** carrier/modulator for Wavetable Oscillators 1 & 2.\n* Excellent for creating custom cross-modulation, noise-based phase modulation, and feedback FM loops.',
        warnings: [
          'Feedback is polyphonic—it is processed independently for every voice you play, meaning chords can sound extremely thick and distorted.'
        ]
      },
      {
        id: 'routing-workflows',
        title: 'Routing Interaction & Workflows',
        content: 'Manipulate wires and module structures on the routing grid using these mouse actions:\n\n* **Connect Modules**: Click an output pin, then click an input pin. Alternatively, click and drag from an output to an input.\n* **Exclusive Connection**: Right-click an input node when dragging/making a connection. This deletes all existing connections to that node, replacing them solely with the new wire.\n* **Delete a Wire**: Double-click directly on the wire.\n* **Delete All Module Connections**: Double-click on the module itself.\n* **Bypass a Module**: Right-click on the module. Its icon will dim and the signal will pass straight through, bypassing processing while keeping all underlying wire routings intact.'
      }
    ],
    quiz: [
      {
        id: 'q-fb-poly',
        question: 'Is the Feedback (FB) loop in Massive X processed polyphonically or monophonically?',
        options: [
          'Monophonically—the sum of all voices is fed back.',
          'Polyphonically—it is processed independently for each voice you play.',
          'It depends on whether Unison is active.',
          'Only the Stereo Effects can be fed back monophonically.'
        ],
        correctAnswerIndex: 1,
        explanation: 'The manual explicitly states: "the feedback loop is polyphonic, meaning it is processed independently for every single voice you play. This way you can play chords and overlapping notes with your feedback sounds."'
      },
      {
        id: 'q-routing-exclusive',
        question: 'How do you make an exclusive connection to a routing input pin, automatically removing all previous connections to that pin?',
        options: [
          'Hold [Shift] while clicking the input pin.',
          'Double-click the input pin.',
          'Right-click on the input pin you want to connect to.',
          'Press [Delete] while dragging a wire.'
        ],
        correctAnswerIndex: 2,
        explanation: 'According to the manual: "To make an exclusive connection to an input, meaning that all existing connections to the input will be removed: 1. Click on an output... 2. Right-click on the input you want to connect to exclusively."'
      },
      {
        id: 'q-fb-hpf',
        question: 'What is the function of the High-pass Filter (HPF icon) next to the FB control in the Amplifier section?',
        options: [
          'It cuts high frequencies to smooth out digital fuzz.',
          'It filters out low-frequency rumble in the feedback path, avoiding low-end overload and bass boominess.',
          'It limits the unison spread to only the midrange.',
          'It modulates the phase of the feedback loop.'
        ],
        correctAnswerIndex: 1,
        explanation: 'The manual explains that the HPF "cuts low-frequency content in the feedback loop. When activated, you can avoid overloading the feedback loop with excessive bass."'
      }
    ]
  },
  {
    id: 'oscillators-noise',
    title: '4. Wavetable Oscillators & Noise Engine',
    iconName: 'Activity',
    description: 'Explore the 10 distinct Wavetable modes, pitch modes, PM options, and custom user noisetable importing requirements.',
    sections: [
      {
        id: 'wavetable-osc-basics',
        title: 'Wavetable Oscillator Foundations',
        content: 'Massive X has two identical Wavetable Oscillators that act as the fundamental generators. The x-axis tracks phase (MIDI pitch), and the y-axis stacks waveforms (Wavetable Position).\n\n### Main Controls:\n* **Oscillator On/Off**: Bypasses the module directly.\n* **Level**: Master volume slider for the oscillator.\n* **Wavetable Menu**: 11 categories: *Basics*, *Operators* (ideal for PM modulation), *Harmonics*, *Additive + FM*, *Monster* (aggressive timbres), *Drift* (illusion of multiple detuned oscillators using slow triangle LFO), *Filter*, *Formant*, *FX* (bell-like and texturizers), *Mixed*, and *Remastered*.\n* **Wavetable Position**: Scans through waveforms. Each wavetable contains between **2 to 128 waveforms**.\n* **Pitch**: Transposes in semitones and cents. Pitch modes are:\n  * **Keytrack**: Locks to standard incoming MIDI key pitches.\n  * **Ratio**: Multiplies/divides frequency relative to root pitch (e.g. Ratio of 3 generates the 3rd harmonic).\n  * **Fix**: Disregards MIDI pitch. Sets a static frequency in MIDI note numbers (default 60 = Middle C).\n* **PM Aux Assignment**: Routes PM oscillators or Aux inputs directly into the oscillator phase.'
      },
      {
        id: 'wavetable-modes',
        title: 'The 10 Wavetable Readout Modes',
        content: 'These modes transform the way wave data is read from the table, shifting synthesis from standard subtractive to advanced wave-folding or formant modeling:\n\n1. **Standard Mode**: Classic low-pass spectrum filtering. Reduces high frequency harmonics without a traditional resonance curve. Applied to a square, it gradually morphs into a pure sine.\n2. **Bend Mode**: Shapes the readout speed curve. Compresses certain parts of the wave while expanding others.\n   * *Bend Curve*: Strong, Medium, Gentle.\n   * *Direction*: Neutral (no change), Up-Down (inverts every second cycle, cutting out all **even harmonics**), For-Back (reads every second cycle backward).\n3. **Mirror Mode**: Reads the wavetable back and forth, folding the wave when ratio thresholds are exceeded.\n4. **Hardsync Mode**: Generates classic analog sync without a second oscillator.\n   * *Window*: Hard (rolling sync), Soft (fades wave before reset), Grain (fades wave in/out at start of sync, smoothed out, equivalent to Formant mode in original Massive).\n5. **Wrap Mode**: Similar to Hardsync, but creates fewer pitch artifacts when modulated. Starting at the center, it folds at the boundaries of the waveform.\n6. **Formant Capture Mode**: Erases the "Mickey Mouse" pitch-shifting effect, keeping formants static over pitch changes. Uses a specialized single-windowing algorithm. Works best on *Formant* category wavetables containing a stored "Formant Center" metadata tag.\n7. **ART Mode (Artificial Resonance Technology)**: Creates "filters without filters." Replicates a high-resonance bandpass filter sweep using hard sync and windowing. Features the unique **FU-DB** (Forwards Upwards - Downwards Backwards) direction mode.\n8. **Gorilla Mode**: Extremely aggressive, highly exaggerated formant bending. Best on simple, low-harmonic input waves (like *Banana* wavetable).\n   * *K!ngs Menu*: King (cleanest), Kang (medium), Kong (maximum dirty bending).\n   * *Ratio*: x1, x2, x3, x4, x5, x6 (x2 is the prime Gorilla sweet spot).\n9. **Random Mode**: Extreme noise/chaotic generator utilizing two internal randomizers.\n   * *Mode*: Fluid (randomizes position reader & fundamental frequency), Thunder (randomizes position & downclocks position of randomizer), Divide (downclocks frequency randomizer, e.g., only every 10th cycle).\n10. **Jitter Mode**: Adds random deviations at the end of each cycle. Gives a glittery, shimmer effect. Jitter rates: **J1** (every cycle), **J2** (every 32nd cycle), **J3** (every 128th cycle).'
      },
      {
        id: 'noise-engine',
        title: 'The Noise Engine & Custom Importing',
        content: 'The Noise section contains two Noise slots to add atmospheric, machine, organic, or transient texture. Includes 7 categories: *Static*, *Friction*, *Processed*, *Environment*, *Machines*, *Beings*, and *Transients*.\n\n### Noise Playback Modes:\n* **Free**: Loops infinitely and runs freely.\n* **Restart**: Restarts at a set Phase position on note on.\n* **One Shot**: Plays the sample through exactly once. Automatically applies a fade-out to abrupt sample rises to prevent clicking. Excellent for percussive transients.\n\n### Custom Noise File Requirements:\n* **Formats**: WAV, FLAC, AIFF, MP3, OGG, and MP4 are supported.\n* **Length**: Must be between **10 milliseconds and 1 minute** in length.\n* **Sampling Rate**: Converted automatically to **88,200 Hz** upon import.\n* **Channels**: Stereo files are summed and automatically converted to **Mono**.'
      }
    ],
    quiz: [
      {
        id: 'q-even-harmonics',
        question: 'In Bend Mode, which Direction setting inverts every second cycle of the waveform, successfully cutting out all even harmonics?',
        options: [
          'Neutral',
          'Up-Down',
          'For-Back',
          'FU-DB'
        ],
        correctAnswerIndex: 1,
        explanation: 'The manual explicitly details that the "Up-Down" direction setting inverts every second cycle of the waveform, cutting out all even harmonics (2, 4, 6, 8, etc.).'
      },
      {
        id: 'q-gorilla-ratio',
        question: 'Which Ratio setting in Gorilla Mode is officially recommended to achieve the "prime Gorilla sound"?',
        options: [
          'x1',
          'x2',
          'x4',
          'x6'
        ],
        correctAnswerIndex: 1,
        explanation: 'Under the Gorilla Mode specification, the manual states: "A ratio of x2 is recommended to achieve the prime Gorilla sound."'
      },
      {
        id: 'q-noise-import-specs',
        question: 'What happens to a custom stereo noise sample when imported into the Massive X Noise Engine?',
        options: [
          'It remains stereo but is truncated to 30 seconds.',
          'It is rejected since only native mono WAV files are allowed.',
          'All stereo samples are converted to mono, and the sample rate is automatically converted to 88,200 Hz.',
          'It is automatically mapped to OSC1 as a sub-wavetable.'
        ],
        correctAnswerIndex: 2,
        explanation: 'The custom noise specifications state: "A sample rate of 88200Hz is supported in Massive X... All stereo samples will be converted to mono."'
      }
    ]
  },
  {
    id: 'filters',
    title: '5. The Nine Filter Types',
    iconName: 'Sliders',
    description: 'Master the unique algorithms, self-oscillation limits, key tracking, and filter FM inputs of all 9 filters.',
    sections: [
      {
        id: 'asimov-monark',
        title: 'Asimov & Blue Monark (Vintage Paradigms)',
        content: '### Asimov Filter:\n* **Description**: Squelchy low-pass filter based on a classic 80s bass synth. Characterized by **a total lack of self-oscillation**, creating an enormous sweet spot for resonance.\n* **Controls**:\n  * *Filter Modes*: LP1 (6 dB/Oct), LP2 (12 dB/Oct), LP4 (24 dB/Oct).\n  * *Gain*: Controls input level and analog saturation amount.\n  * *High-pass Feedback*: Dedicated HPF in the feedback path provides tight, controlled bass response.\n\n### Blue Monark Filter:\n* **Description**: Polyphonic adaptation of NI’s famous Monark synthesizer. Known for warm, fat overdriven bass and classic lead sounds.\n* **Capabilities**: Capable of heavy **self-oscillation** and features flexible feedback patching.\n* **Filter Modes**: LP1, LP2, LP4, BP (band-pass), Peak (adds resonant peak at cutoff), HP (high-pass), and **Dual Notch** (attenuates two narrow frequency bands around the cutoff).'
      },
      {
        id: 'comb-creak-groian-scanner',
        title: 'Comb, Creak, Groian & Scanner (Resonator & Experimental)',
        content: '### Comb Filter:\n* **Description**: Delays the signal and feeds it back to create a physical-modeling resonator or extreme flanger. Pitch is controlled like an oscillator (perfect keytracking).\n* **Modes**: **Exciter** (for Karplus-Strong physical modeling, excited via Exciter Envelope or Noise), **OSC** (compensates for harmonic peaks from basic oscillators), and **Flanger**.\n* **Parameters**:\n  * *FBW*: Feed-backward/forward output pickup switch (before or after delay block).\n  * *Feedback Polarity*: (+/-) positive feedback produces all harmonics; negative feedback produces only **odd harmonics**.\n  * *AP Freq & LP Freq*: All-pass (creates inharmonic spectra) and Low-pass filters in the feedback path.\n\n### Creak Filter:\n* **Description**: Experimental flanger-based filter with wild, aggressive, non-linear distortion potential.\n* **Modes**: *Driven* / *Gnarl* (harmonically spaced resonances), *Nosy* (nasal formant character), and *Euer* (vocal formant character).\n\n### Groian Filter:\n* **Description**: Hybrid delay-feedback filter/flanger that superimposes delay resonances onto filter cutoff. Highly sensitive to input levels; **self-oscillation becomes unstable at low frequencies**.\n\n### Scanner Filter:\n* **Description**: Inspired by raw, dirty analog monophonic synthesizer designs from the 80s. Strong non-linearities produce rich, distinct harmonic distortion during sweep adjustments.'
      },
      {
        id: 'svf-family',
        title: 'SVF, SVF Parallel & SVF Serial',
        content: '### SVF (State Variable Filter):\n* **Description**: Clean, universal, surgical utility filter. Shapes tone without color or distortion.\n* **Modes**: LP2, LP4, BP, Peak, and HP.\n* **Res Boost**: Increases resonance control range to induce self-oscillation. Triggering this with the Exciter envelope at maximum resonance is called **filter pinging** (produces a damped sine wave).\n\n### SVF Parallel:\n* **Description**: Two SVFs side-by-side. The input splits to both filters separately, and their outputs are summed.\n* **Modes**: 7 combinations of 12 dB LP, 12 dB HP, 6 dB BP, and a unique **Plateau** mode.\n* **Bandwidth**: Spreads the cutoff frequencies of both filters apart. At minimum, cutoffs match. Increasing Bandwidth moves one cutoff down and the other up to generate dual-peak formant vowels or complex wobbles.\n\n### SVF Serial:\n* **Description**: Two filters placed in a series chain (Signal -> High-Pass -> Low-Pass). Perfect for balancing overall spectral weight.\n* **Parameters**: Includes **HP Peak** and **LP Peak** controls. These gradually morph the slopes into band-pass peak responses, enabling vocal formant generation without filtering out the rest of the audio signal.'
      }
    ],
    quiz: [
      {
        id: 'q-asimov-spec',
        question: 'What is the key defining characteristic of the Asimov filter algorithm?',
        options: [
          'It is capable of extreme, aggressive self-oscillation at LP1 mode.',
          'It features a complete lack of self-oscillation, providing a massive sweet spot for resonant acid sweeps.',
          'It is a digital-only delay line that replaces the Wavetable Oscillators.',
          'It converts all incoming audio signals into white noise.'
        ],
        correctAnswerIndex: 1,
        explanation: 'The manual explicitly defines Asimov’s main characteristic as "the lack of self-oscillation, providing a huge sweet-spot for resonant filter sounds."'
      },
      {
        id: 'q-comb-polarity',
        question: 'In the Comb Filter, how does changing the Feedback Polarity from positive (+) to negative (-) affect the produced harmonic spectrum?',
        options: [
          'Positive feedback produces only even harmonics; negative feedback produces only odd harmonics.',
          'Positive feedback produces all harmonics; negative feedback produces only odd harmonics.',
          'Negative feedback mutes the delay line completely.',
          'It converts the Comb filter into a band-pass filter.'
        ],
        correctAnswerIndex: 1,
        explanation: 'According to the manual Comb Filter section: "With positive feedback polarity the Comb filter produces all harmonics, while with negative feedback polarity it produces only odd harmonics."'
      },
      {
        id: 'q-filter-pinging',
        question: 'What synthesizer technique is achieved by briefly triggering a high-resonance SVF filter with an Exciter Envelope, causing it to self-oscillate into a damped sine wave?',
        options: [
          'Frequency Shifting',
          'Formant Bending',
          'Filter Pinging',
          'Wobble Syncing'
        ],
        correctAnswerIndex: 2,
        explanation: 'The manual describes this under SVF: "You can use the Exciter envelope... to briefly trigger self-oscillation of the SVF... This so called filter pinging produces a damped sine wave."'
      }
    ]
  },
  {
    id: 'voice-page',
    title: '6. Voice Page & Voicing Engine',
    iconName: 'UserCheck',
    description: 'Learn global transposition, pitch bend limits, polyphony sorting, unison detune scaling, and chord/scale harmonization.',
    sections: [
      {
        id: 'global-voicing',
        title: 'Global Tune & Pitch Bend Ranges',
        content: 'The Voice page configures global parameters governing note input, polyphony, scaling, and detuning. *(Not available in Massive X Player)*.\n\n### Global Tuning:\n* **Tune Slider**: Transposes the entire engine in a range of **-64.000 to +64.000 semitones and cents**.\n* **Transpose**: Transposes pitch in whole octave blocks from **-24 to +24 semitones** (2 octaves).\n* **Global PB**: Determines separate upper and lower limits of MIDI Pitch Bend wheel range from **-96 to +96 semitones**. If the lower value is set higher than the upper value, the physical pitch bend wheel action is inverted.'
      },
      {
        id: 'polyphony-glide',
        title: 'Polyphony & Glide Architecture',
        content: 'Massive X can operate in either **Mono** or **Poly** mode:\n\n### Poly Mode:\n* Supports up to **64 active voices** simultaneously. Unison voices scale on top of this (e.g. 8 voices with 6-voice unison = 48 total active layers).\n* **Voice Sorting Modes**:\n  * *Rotate*: Automatically allocates every new note to a new voice ID. This allows two notes of the same pitch to ring out together (great for acoustic simulations like piano/vibraphone sustaining keys).\n  * *Reassign*: Detects when you play the same note and re-routes it to the same active voice, preventing phase overlap clipping.\n\n### Glide (Portamento):\n* **Glide Shape**: Choose between **Linear** (straight line), **Exponential** (emulates a classic analog 1-pole low-pass filter curve), or **Inverse Exp** (flips the LP filter curve speed).\n* **Mono Glide Controls**:\n  * *Triller*: When active, releasing a legato note glides the pitch back to the previous held note (classic retro behavior). If off, notes are killed instantly upon release.\n  * *Glide Options*: **Note On** (glide only on press), **Note On/Off** (glide triggers on both press and release), and **Note Off** (glide only on release).\n  * *Trigger Legato*: When On, envelopes and LFOs do not re-trigger when notes are played legato (tied).'
      },
      {
        id: 'unison-detune-harmonization',
        title: 'Unison Detune & Harmonization Scales',
        content: '### Unison Stacking:\n* **Voices Slider**: Stack **1 to 6 voices** per note to create thick, organic chorusing. Unison affects the entire signal path, not just the oscillators.\n* **Stereo Width**: Spreads unison voices across the stereo image.\n* **Chord Morph**: Morphs unison pitch intervals to create dramatic pitch-sweep clusters (recurs the famous THX logo sound).\n* **Spread Fader & Modes**:\n  * *Spread Mode*: Micro-detuning designed to make signals feel alive. Best on 4, 5, or 6 voices.\n  * *Wide Mode*: Offsets unison pitch offsets by up to **one octave**, utilizing a semitone-quantized grid scale.\n\n### Harmonization & Chord Scale Correction:\n* **Harmonize Modes**: Corrects incoming MIDI notes to a selected scale. Corrected notes are adjusted via three settings:\n  * *Catch Zone (CZ)*: Basic sharp/flat rounding (e.g. C# rounds down to C in Ionian, or up in flat scales).\n  * *Variation (V)*: Rearranges the chord structure based on unused scale voice buffers.\n  * *Transition (TC)*: Replaces notes with transitional classical chords (such as 4ths) to create open harmonies.\n* **Chord Modes**: Allows playing full complex multi-note parallel chords from a single key. The Chord Slider stores **12 different chord variations** that can be scanned dynamically using a Modulator, Performer, or Tracker.'
      }
    ],
    quiz: [
      {
        id: 'q-voice-sorting',
        question: 'Which voice sorting mode detects when you play the same note and allocates that same voice ID to it, mimicking acoustic instruments and preventing phase clipping?',
        options: [
          'Rotate',
          'Reassign',
          'Legato',
          'Mono'
        ],
        correctAnswerIndex: 1,
        explanation: 'The manual states: "Reassign mode detects when you play the same note and allocates the same voice to the same note. This is good for piano... as it won’t cut off the pitch."'
      },
      {
        id: 'q-glide-shape',
        question: 'Which Glide Shape reproduces the classic physical charging curve of an analog 1-pole low-pass filter?',
        options: [
          'Linear',
          'Exponential',
          'Inverse Exp',
          'Triller'
        ],
        correctAnswerIndex: 1,
        explanation: 'The manual states: "Exponential produces the equivalent of an analog 1-pole low-pass filter curve. Typically, this is the best choice for classic glide."'
      },
      {
        id: 'q-unison-limit',
        question: 'What is the maximum number of unison voices you can stack per played note in Massive X?',
        options: [
          '4',
          '6',
          '8',
          '12'
        ],
        correctAnswerIndex: 1,
        explanation: 'According to the Unison section under Voice Page, the unison "Voices" parameter sets the number of voices from 1 to 6.'
      }
    ]
  },
  {
    id: 'modulators',
    title: '7. Modulators: Envelopes & LFOs',
    iconName: 'Zap',
    description: 'Explore the 9 modulators, ADSDR structures, physical-modeling Exciter curve shapes, and Switcher/Random LFO configurations.',
    sections: [
      {
        id: 'envelope-architectures',
        title: 'Amp & Modulation Envelopes',
        content: 'Massive X has 9 Modulator slots. **Modulator 1** is hard-wired to control the Amp level. Each of the remaining 8 slots can house one of 4 modulator types:\n\n### Amp Envelope (Modulator 1):\n* Unique logarithmic design specifically scaled to match human hearing perception.\n* Contains independent curvature controls for the **Attack Shape** and **Decay Shape** to transition between exponential, linear, and logarithmic curves.\n* Contains a **Hold** stage before Decay, and another **Hold** stage before Release.\n* **Trigger Options**: *Gate* (plays until key release, then jumps to Release), *OneShot* (plays to the end of sustain regardless of hold), *LoopGate* (loops between Attack and Decay), *Loop* (loops the entire envelope continuously).\n\n### Modulation Envelope:\n* Provides a highly flexible shape to modulate any destination.\n* Adds a **Delay** control to hold back the onset of the envelope (useful for offset double-attack filter envelopes).\n* **Reset Control**: Forces the envelope to restart with every trigger.\n* **Note Off**: Triggers the envelope only when keys are released.\n* **Mono**: Forces all voices to share a single absolute envelope shape.'
      },
      {
        id: 'exciter-envelope',
        title: 'The Exciter Envelope (Resonator Driver)',
        content: 'The **Exciter Envelope** is a specialized ultra-fast envelope designed for physical modeling. Rather than standard ADSR, it is an Attack-Hold-Release single-cycle generator with a defined center tilt.\n\n### Key Controls:\n* **Ratio**: Speeds up or slows down the duration of the cycle.\n* **Center**: Tilts the curve. Turning left leans toward a sharp attack; turning right shifts the energy toward a long release.\n* **Polarity Modes**:\n  * *Bi*: Bidirectional modulation (outputs both positive and negative voltages).\n  * *Uni*: Unidirectional positive voltage.\n  * *Window*: Unidirectional and mirrored perfectly at the center. Removes independent attack and release controls, creating a single shape control.'
      },
      {
        id: 'switcher-random-lfos',
        title: 'Switcher LFO & Random LFO',
        content: '### Switcher LFO:\n* Combines modular rate controls with **16 distinct shapes** that can be scanned using modulation.\n* **Rate Modes**:\n  * *Sync*: Locked to DAW clock with numerator/denominator subdivisions including triplets (/12, /24, /48) and values up to 99.\n  * *Free*: Continuous rate control ranging from **0.004 Hz to 60 Hz** (5.3 Hz is standard vibrato speed).\n  * *Osc*: Key-tracks at audio rate, transposing from 0 down to **-96 semitones** below root key pitch.\n* **Polarity**: *Bi* (-100% to +100%), *Uni* (0 to 100%, starting at 50%), and *Uni Z* (0 to 100%, starting at 0% on reset).\n* **Fall/Rise**: Fades LFO in or out (center = infinite running; right = fade-in ramp; left = decay fade-out).\n* **Play Modes**: Loop, Loop RST, Loop GTE (cuts on release), Loop REL (starts on release), 1shot, 1shot REL.\n\n### Random LFO:\n* Generates adjustable sample-and-hold numbers to inject human error or chaotic noise.\n* **Amp Jitter & Freq Jitter**: Introduces random variations to LFO amplitude and frequency (Freq Jitter acts as white noise generator at high rates).\n* **Audio Noise Button**: Forces the LFO to process at audio rate, transforming it into a dedicated **noise generator** patchable inside the routing area.\n* **Threshold**: Clamps random values below a limit to zero, creating sparse, digital clicks.\n* **Seed**: Feeds a static random sequence that repeats identically with every reset trigger (ideal for repeatable S&H variations).'
      }
    ],
    quiz: [
      {
        id: 'q-lfo-osc-mode',
        question: 'In Switcher LFO "Osc" Mode, what does the LFO do?',
        options: [
          'It outputs an ultrasonic tone to sync with high-pass filters.',
          'It operates at audio rate as an additional keytracking oscillator, transposing up to -96 semitones below note pitch.',
          'It modulates only the global pitch bend wheel.',
          'It cycles shapes based on the Morpher snapshot.'
        ],
        correctAnswerIndex: 1,
        explanation: 'The manual specifies: "In Osc mode, the LFO operates at audio rate, becoming an additional keytracking oscillator... turning Rate into a control for transposition, ranging from zero... down to -96 semitones lower than the note pitch."'
      },
      {
        id: 'q-exciter-window',
        question: 'What happens to the controls of the Exciter Envelope when the Polarity is set to "Window"?',
        options: [
          'The envelope outputs dual negative-only curves.',
          'It removes the independent controls for attack and release, offering only one shape control as the stages are now mirrored and identical.',
          'It locks the Ratio to the main DAW tempo.',
          'It mutes the Comb filter feedback path.'
        ],
        correctAnswerIndex: 1,
        explanation: 'The manual states: "When Window is selected, the envelope is unidirectional and mirrored at the center. This removes the independent controls for attack and release, and offers only one shape control..."'
      },
      {
        id: 'q-lfo-free-range',
        question: 'What is the absolute frequency range of the Switcher LFO when operating in Free Mode?',
        options: [
          '0.1 Hz to 20 Hz',
          '0.004 Hz to approximately 60 Hz',
          '1 Hz to 20,000 Hz',
          '0.01 Hz to 100 Hz'
        ],
        correctAnswerIndex: 1,
        explanation: 'The manual states: "In Free mode, the Rate is absolute... The overall rate range is 0.004 Hz to approximately 60 Hz."'
      }
    ]
  },
  {
    id: 'effects',
    title: '8. Insert & Stereo Effects',
    iconName: 'Sparkles',
    description: 'Technical breakdown of all 12 polyphonic Insert Effects and 10 monophonic Stereo Effects structures.',
    sections: [
      {
        id: 'insert-effects',
        title: 'Insert Effects (A, B, C)',
        content: 'Insert Effects process signals polyphonically inside the Voice routing path. They can also act as independent generators:\n\n1. **Anima**: Experimental feedback-comb-flanger derivative that key-tracks MIDI pitch. Features **Smear** (spreads delay lines) and **Fast/Slow** (Slow = LFO rate vibrato; Fast = audio-rate phase/frequency sidebands).\n2. **Bass Enhancer**: Split crossover filter (**X-Freq: 40 Hz to 200 Hz**). Saturates/compresses low bands while keeping high bands clean.\n3. **Bit Crusher**: Reduces digital bit resolution. **Crush** (bit depth reduction), **Norm** (subtracts input to accentuate lo-fi artifacts), and **HQ** (anti-aliasing filter).\n4. **Distortion**: Polyphonic distortion with 5 saturation curves (*tanH*, *hypB*, *sin C*, *H.clip*, *Rectify*). Has **HQ** antialiasing but introduces **half-sample latency** (which can affect routing feedback phase).\n5. **Folder**: Wavefolder that copies/multiplies waveforms at high drive. Modes: *Sinus*, *Triangle*, *Wrap*, *Spiky*. (Sinus mode + Sine wave = Phase Modulation-like tones).\n6. **Frequency Shifter**: Shifts all frequencies linearly, breaking harmonic relationships to produce metallic rings. Includes **Wide** & **Narrow** ranges and feedback to create a **Shepard flanger**.\n7. **Insert Oscillator (OSC)**: Independent Sine, Saw, or Pulse generator. Can be phase-locked to OSC 1 or 2 with ratios of **1:1, 1:2, 1:3, or 1:4** to build a sub-oscillator. Expands Massive X to a **5-oscillator synthesizer**.\n8. **PM Oscillator**: Phase modulation operator. Sine wave that modulates its own input phase or external signals.\n9. **Ring Modulator**: Outputs the sum and difference of carrier and modulator, destroying the root frequency to create bell-like tones.\n10. **Sample & Hold**: Stepped quantization of incoming signals. **HQ** mode smooths out steps for analog S&H emulation.\n11. **Track Delay**: Keytracks delay time. Combines phase shifts with input subtraction to create custom PWM/WM or a polyphonic chorus.\n12. **Utility**: Essential level scaling, high-pass/low-pass filtering (**HP1, HP2, LP1, LP2**), and VCA curve shape sculpting (exponential/logarithmic).'
      },
      {
        id: 'stereo-effects',
        title: 'Stereo Effects (X, Y, Z)',
        content: 'Stereo Effects process the monophonic sum of all active voices. They can be mixed in three chains: **X > Y > Z** (serial), **X + Y > Z** (parallel sum into Z), and **X + Y + Z** (parallel split sum).\n\n1. **Dimension Expander**: Premium chorus with stereo widening (**Bright** & **Stereo** morph knobs).\n2. **Equalizer**: High shelf (1.2kHz to 23.6kHz), parametric mid-band (90Hz to 14kHz with Q factor width), and low shelf.\n3. **Flanger**: Stompbox-style flanger. Modes: *Parallel*, *Wide* (offset left/right), *Inverse* (180° offset), *Difference* (metallic phase sums), *Cross* (inverse modulation cross-feed), *Cross Astral* (complex fixed-shape cross), and *Manual*.\n4. **Nonlinear Lab**: Overdrive/distortion with active **Guitar Cabinet Simulations** (*California, West Coast, Classy, Hi Gain, Crank, British*).\n5. **Multi Compressor**: Powerful **three-band upward/downward compressor**. Soft signals below thresholds are expanded upward; hot peaks are compressed downward. Includes advanced adjustable crossover controls (**XLow** & **XHigh**).\n6. **Phaser**: All-pass filtering phaser. Choice of **2, 4, 5, 6, or 8 filter stages** and a continuous **Barber Pole** infinite frequency sweep mode.\n7. **Quad Chorus**: True-stereo 4-tap chorus based on historic multi-phase models (*TriVintage*, *Quadron*, *Random* S&H walk, *Even*, and *Manual* discrete time controls).\n8. **Reverb**: Massive algorithmic reverb featuring **17 distinct spatial spaces** (such as *Late*, *Large Hall*, *Micron*, *Metolla*, *Wanderlust*, and *Woosh*).\n9. **Stereo Delay**: Dual-channel delay with **Parallel** and **Cross-feedback** paths. Features a **Latch** mode that synchronizes delay time changes to trigger only when a new note-on MIDI message is received (preventing pitch gliding sweeps).\n10. **Stereo Expander**: Cleaner, highly CPU-efficient iteration of original Massive’s expander.'
      }
    ],
    quiz: [
      {
        id: 'q-insert-osc-limit',
        question: 'Using all three Insert Effects slots as Insert Oscillators, what is the maximum number of oscillators Massive X can generate simultaneously?',
        options: [
          '3 oscillators',
          '4 oscillators',
          '5 oscillators',
          '7 oscillators'
        ],
        correctAnswerIndex: 2,
        explanation: 'Massive X has 2 Wavetable Oscillators. Selecting the Insert Oscillator for all 3 Insert Effects (A, B, C) adds 3 independent oscillators, expanding Massive X to a "five oscillator synthesizer."'
      },
      {
        id: 'q-stereo-delay-latch',
        question: 'What is the purpose of the Latch button in the Stereo Delay effect?',
        options: [
          'It locks the delay to a maximum feedback loop to trigger endless oscillation.',
          'It enables you to recall and apply delay time changes only when a new note is pressed, synchronizing changes and avoiding pitch sweeps.',
          'It forces the delay to bypass the Monophonic area.',
          'It locks the Left and Right channel volumes to mono.'
        ],
        correctAnswerIndex: 1,
        explanation: 'The manual notes under Stereo Delay: "This button enables you to recall the delay times with note-on messages... This means you will only hear the change of delay times when a new note is pressed... to synchronize the delay changes."'
      },
      {
        id: 'q-distortion-latency',
        question: 'What technical warning is associated with enabling High Quality (HQ) anti-aliasing in the polyphonic Distortion Insert Effect?',
        options: [
          'It causes immediate mono sum phase cancellation.',
          'It limits the unison Detune range to Wide mode only.',
          'It introduces half a sample latency, which can cause phase artifacts when mixed or used in feedback loops.',
          'It mutes the Exciter envelope routing.'
        ],
        correctAnswerIndex: 2,
        explanation: 'The manual explicitly warns: "Enabling HQ introduces half a sample latency, which can cause phase artifacts when mixed with the original signal... in feedback loops created with audio routing."'
      }
    ]
  },
  {
    id: 'trackers-perf-vr',
    title: '9. Trackers, Performers & Voice Randomizer',
    iconName: 'Workflow',
    description: 'Deep dive on Tracker Note Pitch curves, Offset modes, Performer painting tools, and Voice Randomization (VR).',
    sections: [
      {
        id: 'trackers-curves-offsets',
        title: 'Trackers: Curves & Offset Quantization',
        content: 'Trackers (**T1–T4**) map incoming MIDI data to modulation. Each Tracker processes one of five sources: **Note Pitch**, **Velocity On**, **Velocity Off**, **Gate**, and **Inverse Gate**.\n\n### Tracking Modes:\n1. **Curve Mode**: Establishes a smooth continuous response across the keyboard. BREAKPOINTS can be absolute (moving a node only affects adjacent segments) or relative (nodes shift together like a virtual rubber band).\n2. **Offset Mode**: Establishes independent discrete offsets for individual keys. Quantizes values into vertical columns.\n\n### Tutorial: Setting discrete note values for delay rates:\n* Set a tracker to **Note Pitch** and activate **Offset Mode**.\n* Set the **Vertical Grid to 4** (corresponds to the four primary synced delay times: 5/16, 4/16, 3/16, 1/8).\n* Route Tracker to delay time. Drag the offset column for G3, F3, D3, C3. When notes are played, they recall the exact rhythmic ratios without sliding between them.'
      },
      {
        id: 'performers-painting',
        title: 'Performers: Step Painting & Grid Layout',
        content: 'Performers (**P1–P3**) are complex modulation sequencers. They hold up to 12 patterns switched remotely using MIDI keys via the **Remote Octave**.\n\n### Grids:\n* **X-Axis (Vertical Grid)**: Sets timing resolution. **Basic** mode ranges from quarter notes to 32nd notes. **Custom** mode allows complex signatures (up to 8 sections, customizing beats per bar and subdivisions).\n* **Y-Axis (Horizontal Grid)**: Quantizes modulation levels (typically 24 steps for semitone values).\n\n### Painting Tools:\n1. **Edit**: Standard point-to-point vector line editor.\n2. **Line**: Straight slope from start to end of a grid block.\n3. **Step**: Holds constant value to the end of a block.\n4. **Ramp A**: Pre-configured descending ramp.\n5. **Ramp B**: Pre-configured ascending ramp.\n6. **Triangle**: Triangle shape brush.\n7. **Sine**: Sine shape brush.\n\n### Bending and Segments:\n* Click and drag directly on any painted curve segment to bend it upwards or downwards for custom interpolation curves.'
      },
      {
        id: 'voice-randomizer',
        title: 'Voice Randomization (VR)',
        content: 'The **Voice Randomizer (VR)** assigns a static, unique pseudo-random value *per active voice*. \n\n* When playing chords, each voice gets a slightly different frequency offset, filter cutoff offset, or decay duration.\n* Emulates physical analog variance (component tolerance drift), making static digital pads sound beautifully warm, unpredictable, and alive.'
      }
    ],
    quiz: [
      {
        id: 'q-tracker-sources',
        question: 'Which of the following is NOT an available MIDI source in the Tracker module?',
        options: [
          'Note Pitch',
          'Velocity On',
          'Aftertouch Pressure',
          'Inverse Gate'
        ],
        correctAnswerIndex: 2,
        explanation: 'The five available tracker sources are Note Pitch, Velocity On, Velocity Off, Gate, and Inverse Gate. Aftertouch Pressure is processed globally via the Macro bar (AT), not inside the Trackers.'
      },
      {
        id: 'q-performer-overlay',
        question: 'What is the purpose of the Performer Overlay Grid when activated?',
        options: [
          'It locks the Performer sequence to a mono voice.',
          'It displays an adjustable overlay guide whose grid lines can be stretched or compressed, helping to design sequences that speed up or slow down over irregular timings.',
          'It imports custom wavetables into P1.',
          'It forces the Animator to copy snapshot positions.'
        ],
        correctAnswerIndex: 1,
        explanation: 'The manual states that the overlay grid features handles to stretch and compress the overlay grid, which "makes it easy to use the overlay as a guide for creating modulation sections that speed up or slow down."'
      },
      {
        id: 'q-vr-use',
        question: 'What is the primary sonic benefit of using the Voice Randomization (VR) modulator?',
        options: [
          'It synchronizes LFO speeds with the host DAW tempo.',
          'It adds a unique pseudo-random static value per played voice, emulating physical analog component variance.',
          'It locks the master pitch to scale correction values.',
          'It automatically randomizes preset names.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Voice Randomization provides a unique, pseudo-random static value to each individual voice played, ideal for creating organic, analog-style drift between keys in a chord.'
      }
    ]
  }
];
