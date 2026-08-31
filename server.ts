import dotenv from "dotenv";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Check if GEMINI_API_KEY is available
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;

  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini client successfully initialized.");
  } else {
    console.warn("⚠️ Warning: GEMINI_API_KEY is not defined in environment variables. Chatbot will run in simulation mode.");
  }

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", geminiConfigured: !!apiKey });
  });

  // Chat API endpoint
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    if (!ai) {
      // Fallback/simulation response if key is missing
      return res.json({
        text: `🤖 **Demo Mode Response**: I am ready to help you with Massive X! However, the \`GEMINI_API_KEY\` is not currently set in the Secrets panel. Please configure it in **Settings > Secrets** to enable my full AI brain!\n\nHere is a quick manual tip: To create a classic sub-oscillator, add an **Insert Oscillator (OSC)** in slot A, set its mode to **Lock**, and configure the Ratio to **1:2** (one octave down) relative to OSC 1!`
      });
    }

    try {
      // Build a comprehensive system prompt representing the Massive X manual
      const systemInstruction = `You are the absolute expert Massive X synthesis master and assistant chatbot. 
Your goal is to guide the user in mastering Native Instruments' Massive X synthesizer. 
Use the following strict technical boundaries and content directly from the manual to answer questions with 100% technical accuracy. Do not omit details.

Key Technical Manual Context:
- Document Version: 1.6 (July 2025). Authors: Jan Ola Korte, Hannah Lockwood, David Gover, Nicolas Sidi.
- Play View: Includes Macros 1-8 (with Morph switches), Morpher snapshot board (for corners 1-4, blending via bilinear interpolation), and the Animator (with 12 paths like circle/infinity, rate from 16 bars to 1/8 bar, retrigger, and sync).
- Routing: Open architecture. Polyphonic area (OSC 1/2, Noise 1/2, Main Filter, Insert FX A/B/C) handles voices independently. Monophonic area sums them and applies Stereo FX (X, Y, Z) and master VCA.
- Feedback Loop: Configured via FB input/output modules on routing. Its level and an adjustable High-pass Filter (to prevent bass buildup) are located in the Amplifier module. processed polyphonically.
- PM Aux Bus: Feeds signals from routing to Wavetable phase modulation inputs.
- Wavetable Modes: 10 readout modes:
  1. Standard (Spectrum filtering, reduces harmonics, morphs square to sine)
  2. Bend (Bend curve Strong/Med/Gentle, Direction Neutral/Up-Down/For-Back) - Up-Down cuts even harmonics!
  3. Mirror (wave folding)
  4. Hardsync (analog sync without 2nd OSC, Window: Hard/Soft/Grain)
  5. Wrap (sync folding with fewer artifacts)
  6. Formant Capture (corrects formant shift, pitch-static vowels, Formant control)
  7. ART (Artificial Resonance Technology, filter sweeps without filter, FU-DB mode)
  8. Gorilla (kings: King/Kong/Kang, Over & Bend, Ratio x1-x6, x2 is prime sweet spot)
  9. Random (Fluid, Thunder, Divide)
  10. Jitter (Rate J1/J2/J3, adds jitter to fundamental)
- Noise Player: Supports custom imports: WAV, FLAC, AIFF, MP3, OGG, MP4. Length between 10ms and 1min. Automatically resampled to 88200Hz. Stereo is summed to mono.
- Filter Types: Asimov (squelchy bass filter, lacks self-oscillation), Blue Monark (Monark model with Gain saturator, LP1/2/4, BP, Peak, HP, Dual Notch, self-oscillates), Comb (resonator, exciter/OSC/flanger modes, feedback polarity), Creak (experimental, flanger-style, nasal/vocal), Groian (unstable at low Hz self-osc), Scanner, SVF (clean state-variable, Res Boost for pinging), SVF Parallel (7 modes including Plateau), SVF Serial (series HP->LP, HP/LP Peak).
- Insert Effects: Anima, Bass Enhancer (X-Freq 40-200Hz), Bit Crusher, Distortion (half-sample latency in HQ), Folder, Frequency Shifter, Insert Oscillator (Sine/Saw/Pulse, locks to OSC1/2 ratio 1:1, 1:2, 1:3, 1:4, makes 5-OSC synth), PM Oscillator, Ring Modulator, Sample and Hold, Track Delay, Utility.
- Stereo Effects: Dimension Expander, Equalizer, Flanger (stompbox style, 7 modes), Nonlinear Lab (6 guitar cabinet simulations: California, West Coast, Classy, Hi Gain, Crank, British), Multi Compressor (3-band upward/downward), Phaser (Barber pole infinite sweep), Quad Chorus, Reverb (17 modes), Stereo Delay (Latch synchronizes times on note-on to prevent sweeps), Stereo Expander.
- Modulators: Amp Envelope (logarithmic ADSR, dual hold, Gate/OneShot/Loop), Modulation Envelope (adds delay stage), Exciter Envelope (A-H-R single-cycle, window mirrored), Switcher LFO (Sync numerator/denominators up to 99, Free 0.004Hz to 60Hz, Osc audio rate keytracker, 16 shapes, Fall/Rise), Random LFO (S&H jitter, Threshold noise, Seed repeatability, Audio Noise button for synth path noise).
- Trackers: Note Pitch, Velocity On/Off, Gate, Inverse Gate. Curve vs Offset modes (with vertical grid).
- Voice Randomization: pseudo-random static voice offsets.

When answering:
1. Be encouraging, educational, and professional. Avoid sales-y hype or fluff.
2. Structure answers with clear sections or bullets when explaining synthesis recipes.
3. Reference specific sections, parameters, or specifications from the manual (e.g., exact Hertz ranges, folder modes, file sizes).
4. If asked to design a specific sound (e.g., acid bass, flute, kick, pad), provide a step-by-step "Patch Sheet" outlining OSC settings, Routing pathways, Filter types, and Modulators.`;

      // Formulate query. Combine history for context if available
      const chatHistory = history && Array.isArray(history) 
        ? history.map((msg: any) => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }]
          }))
        : [];

      // Add user message
      chatHistory.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: chatHistory,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini Generation Error:", err);
      res.status(500).json({ error: "Failed to generate AI response. Make sure your API key is correct and valid." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

startServer();
