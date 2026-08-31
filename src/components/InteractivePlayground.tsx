import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RefreshCw, Layers, Radio, Sparkles, Move, Split
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function InteractivePlayground() {
  const [activeTab, setActiveTab] = useState<'morpher' | 'routing' | 'wavetable' | 'envelope'>('morpher');

  return (
    <div id="playground-card" className="bg-ni-card border border-ni-border rounded-xl overflow-hidden shadow-2xl">
      {/* Tab Header */}
      <div className="flex border-b border-ni-border bg-ni-dark p-1 overflow-x-auto gap-1">
        <button
          onClick={() => setActiveTab('morpher')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-medium transition-all ${
            activeTab === 'morpher'
              ? 'bg-ni-orange/10 text-ni-orange border border-ni-orange/20'
              : 'text-gray-400 hover:text-white hover:bg-ni-border/30 border border-transparent'
          }`}
        >
          <Move size={14} />
          2D MORPHER & ANIMATOR
        </button>
        <button
          onClick={() => setActiveTab('routing')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-medium transition-all ${
            activeTab === 'routing'
              ? 'bg-ni-blue/10 text-ni-blue border border-ni-blue/20'
              : 'text-gray-400 hover:text-white hover:bg-ni-border/30 border border-transparent'
          }`}
        >
          <Layers size={14} />
          MODULAR ROUTING GRID
        </button>
        <button
          onClick={() => setActiveTab('wavetable')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-medium transition-all ${
            activeTab === 'wavetable'
              ? 'bg-ni-teal/10 text-ni-teal border border-ni-teal/20'
              : 'text-gray-400 hover:text-white hover:bg-ni-border/30 border border-transparent'
          }`}
        >
          <Radio size={14} />
          WAVETABLE READOUTS
        </button>
        <button
          onClick={() => setActiveTab('envelope')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-medium transition-all ${
            activeTab === 'envelope'
              ? 'bg-ni-yellow/10 text-ni-yellow border border-ni-yellow/20'
              : 'text-gray-400 hover:text-white hover:bg-ni-border/30 border border-transparent'
          }`}
        >
          <Sparkles size={14} />
          ENVELOPE CURVATOR
        </button>
      </div>

      {/* Tab Panels */}
      <div className="p-5">
        <AnimatePresence mode="wait">
          {activeTab === 'morpher' && <MorpherPlayground key="morpher" />}
          {activeTab === 'routing' && <RoutingPlayground key="routing" />}
          {activeTab === 'wavetable' && <WavetablePlayground key="wavetable" />}
          {activeTab === 'envelope' && <EnvelopePlayground key="envelope" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ==========================================================================
   1. MORPHER PLAYGROUND
   ========================================================================== */
function MorpherPlayground() {
  const [posX, setPosX] = useState(0.5); // 0 to 1
  const [posY, setPosY] = useState(0.5); // 0 to 1
  const [animating, setAnimating] = useState(false);
  const [trailShape, setTrailShape] = useState<'circle' | 'infinity' | 'square' | 'line'>('circle');
  const [animRate, setAnimRate] = useState(4); // seconds per loop
  const animationFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // Snapshot values for 8 macros
  const snapshots = {
    s1: [0.1, 0.9, 0.2, 0.1, 0.8, 0.2, 0.1, 0.5], // Top-Left (1)
    s2: [0.9, 0.8, 0.9, 0.3, 0.2, 0.7, 0.3, 0.2], // Top-Right (2)
    s3: [0.2, 0.1, 0.1, 0.8, 0.9, 0.1, 0.8, 0.9], // Bottom-Left (3)
    s4: [0.5, 0.4, 0.7, 0.9, 0.1, 0.9, 0.9, 0.1], // Bottom-Right (4)
  };

  const macroLabels = [
    'WT Pos', 'Cutoff', 'Reso', 'Anima', 'Delay', 'Reverb', 'Shifter', 'S&H Rate'
  ];

  // Calculate current morphed values using bilinear interpolation
  const getMorphicValue = (index: number) => {
    const w1 = (1 - posX) * (1 - posY); // s1: Top-Left
    const w2 = posX * (1 - posY);       // s2: Top-Right
    const w3 = (1 - posX) * posY;       // s3: Bottom-Left
    const w4 = posX * posY;             // s4: Bottom-Right

    const val = (
      snapshots.s1[index] * w1 +
      snapshots.s2[index] * w2 +
      snapshots.s3[index] * w3 +
      snapshots.s4[index] * w4
    );
    return Math.round(val * 100);
  };

  const padRef = useRef<HTMLDivElement>(null);

  const handlePadClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (padRef.current && !animating) {
      const rect = padRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setPosX(Math.max(0, Math.min(1, x)));
      setPosY(Math.max(0, Math.min(1, y)));
    }
  };

  const handlePadDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1 && padRef.current && !animating) {
      const rect = padRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setPosX(Math.max(0, Math.min(1, x)));
      setPosY(Math.max(0, Math.min(1, y)));
    }
  };

  useEffect(() => {
    if (animating) {
      const animate = () => {
        timeRef.current += 0.016; // Approx 60fps
        const cycle = (timeRef.current * (2 * Math.PI)) / animRate;

        if (trailShape === 'circle') {
          setPosX(0.5 + 0.4 * Math.cos(cycle));
          setPosY(0.5 + 0.4 * Math.sin(cycle));
        } else if (trailShape === 'infinity') {
          setPosX(0.5 + 0.4 * Math.sin(cycle));
          setPosY(0.5 + 0.25 * Math.sin(2 * cycle));
        } else if (trailShape === 'square') {
          const t = (timeRef.current / animRate) % 1;
          if (t < 0.25) { // Left to Right (Top)
            setPosX(0.1 + (t / 0.25) * 0.8);
            setPosY(0.1);
          } else if (t < 0.5) { // Top to Bottom (Right)
            setPosX(0.9);
            setPosY(0.1 + ((t - 0.25) / 0.25) * 0.8);
          } else if (t < 0.75) { // Right to Left (Bottom)
            setPosX(0.9 - ((t - 0.5) / 0.25) * 0.8);
            setPosY(0.9);
          } else { // Bottom to Top (Left)
            setPosX(0.1);
            setPosY(0.9 - ((t - 0.75) / 0.25) * 0.8);
          }
        } else if (trailShape === 'line') {
          setPosX(0.5 + 0.4 * Math.sin(cycle));
          setPosY(0.5 + 0.4 * Math.sin(cycle));
        }

        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animating, trailShape, animRate]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      {/* Pad Block */}
      <div className="lg:col-span-6 flex flex-col items-center">
        <h3 className="text-sm font-mono text-ni-orange font-bold self-start mb-2 uppercase tracking-wide flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-ni-orange rounded-full animate-ping" />
          Bilinear Morpher Canvas
        </h3>
        <p className="text-xs text-gray-400 mb-4 self-start">
          Click or drag the orange node to interpolate all 8 macros between the snapshot states of each corner. Toggle the automated Animator to trace algorithmic vector paths.
        </p>

        <div
          ref={padRef}
          onClick={handlePadClick}
          onMouseMove={handlePadDrag}
          className="relative w-full aspect-square max-w-[340px] bg-ni-dark rounded-lg border-2 border-ni-border cursor-crosshair overflow-hidden group select-none shadow-inner"
        >
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 opacity-10 pointer-events-none">
            {Array.from({ length: 64 }).map((_, i) => (
              <div key={i} className="border border-gray-500" />
            ))}
          </div>

          {/* Diagonal guides */}
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          {/* Animator trails */}
          {animating && (
            <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {trailShape === 'circle' && (
                <circle cx="50%" cy="50%" r="40%" fill="none" stroke="#ff5c00" strokeWidth="1.5" strokeDasharray="4 4" className="animate-spin" style={{ transformOrigin: 'center', animationDuration: '20s' }} />
              )}
              {trailShape === 'infinity' && (
                <path d="M 34,170 C 34,102 136,102 170,170 C 204,238 306,238 306,170 C 306,102 204,102 170,170 C 136,238 34,238 34,170 Z" fill="none" stroke="#ff5c00" strokeWidth="1.5" strokeDasharray="4 4" className="w-full h-full" style={{ transform: 'scale(0.85)', transformOrigin: 'center' }} />
              )}
              {trailShape === 'square' && (
                <rect x="10%" y="10%" width="80%" height="80%" fill="none" stroke="#ff5c00" strokeWidth="1.5" strokeDasharray="4 4" />
              )}
              {trailShape === 'line' && (
                <line x1="10%" y1="10%" x2="90%" y2="90%" fill="none" stroke="#ff5c00" strokeWidth="1.5" strokeDasharray="4 4" />
              )}
            </svg>
          )}

          {/* Snapshots Corners Label */}
          <div className="absolute top-2 left-2 text-[10px] font-mono text-ni-orange border border-ni-orange/20 bg-ni-dark/80 px-1.5 py-0.5 rounded">1: BASIC</div>
          <div className="absolute top-2 right-2 text-[10px] font-mono text-ni-blue border border-ni-blue/20 bg-ni-dark/80 px-1.5 py-0.5 rounded">2: BRIGHT</div>
          <div className="absolute bottom-2 left-2 text-[10px] font-mono text-ni-yellow border border-ni-yellow/20 bg-ni-dark/80 px-1.5 py-0.5 rounded">3: SUB</div>
          <div className="absolute bottom-2 right-2 text-[10px] font-mono text-ni-teal border border-ni-teal/20 bg-ni-dark/80 px-1.5 py-0.5 rounded">4: EXPERIMENTAL</div>

          {/* Morpher Cursor */}
          <motion.div
            className="absolute w-5 h-5 rounded-full border-2 border-white bg-ni-orange shadow-lg flex items-center justify-center cursor-pointer"
            style={{
              left: `calc(${posX * 100}% - 10px)`,
              top: `calc(${posY * 100}% - 10px)`,
            }}
            animate={{ scale: animating ? [1, 1.1, 1] : 1 }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* Right Controls & Macro Spinning Knobs */}
      <div className="lg:col-span-6 flex flex-col justify-between">
        {/* Animator control panel */}
        <div className="bg-ni-dark p-4 rounded-lg border border-ni-border mb-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider flex items-center gap-1.5">
              Animator Section
            </h4>
            <button
              onClick={() => setAnimating(!animating)}
              className={`flex items-center gap-1 px-3 py-1 rounded text-xs font-mono font-bold transition-all ${
                animating 
                  ? 'bg-ni-orange text-white hover:bg-ni-orange/90' 
                  : 'bg-ni-border text-gray-300 hover:bg-ni-border/80'
              }`}
            >
              {animating ? <Pause size={12} /> : <Play size={12} />}
              {animating ? 'ACTIVE' : 'RUN'}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-[10px] font-mono text-gray-400 block mb-1">TRAIL SHAPE</label>
              <select
                disabled={!animating}
                value={trailShape}
                onChange={(e) => setTrailShape(e.target.value as any)}
                className="w-full bg-ni-card text-white text-xs border border-ni-border rounded p-1.5 font-mono outline-none disabled:opacity-50"
              >
                <option value="circle">⚪ Circle Trail</option>
                <option value="infinity">♾️ Infinity Loop</option>
                <option value="square">⬜ Square Grid</option>
                <option value="line">➖ Diagonal Line</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-mono text-gray-400 block mb-1">RATE SPEED</label>
              <input
                disabled={!animating}
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={11 - animRate}
                onChange={(e) => setAnimRate(11 - parseFloat(e.target.value))}
                className="w-full h-1 bg-ni-card rounded-lg appearance-none cursor-pointer accent-ni-orange disabled:opacity-50 mt-3"
              />
              <span className="text-[10px] font-mono text-ni-orange block text-right mt-1">
                {(11 - animRate).toFixed(1)} Hz (Free)
              </span>
            </div>
          </div>
        </div>

        {/* 8 Macro values grid */}
        <div>
          <h4 className="text-xs font-mono font-bold text-gray-300 uppercase tracking-wider mb-2">
            Morphed Macro States (1-8)
          </h4>
          <div className="grid grid-cols-4 gap-2">
            {macroLabels.map((lbl, idx) => {
              const val = getMorphicValue(idx);
              return (
                <div key={lbl} className="bg-ni-dark/60 border border-ni-border/60 rounded-lg p-2 text-center flex flex-col justify-between h-20 group relative overflow-hidden">
                  {/* Arc Ring Mock */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25" viewBox="0 0 36 36">
                    <path
                      className="text-ni-orange"
                      strokeWidth="2"
                      strokeDasharray={`${val}, 100`}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="text-[9px] font-mono text-gray-400 truncate tracking-wide">{lbl}</span>
                  <span className="text-lg font-mono font-bold text-ni-orange tracking-tight">{val}%</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-ni-orange mx-auto opacity-80" style={{ transform: `scale(${0.3 + (val / 100) * 0.8})` }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ==========================================================================
   2. ROUTING PLAYGROUND
   ========================================================================== */
interface ModuleNode {
  id: string;
  name: string;
  type: 'generator' | 'processor';
  color: string;
  x: number;
  y: number;
  outputs: string[];
}

function RoutingPlayground() {
  const [nodes, setNodes] = useState<ModuleNode[]>([
    { id: 'osc1', name: 'Wavetable OSC 1', type: 'generator', color: 'bg-ni-orange', x: 40, y: 40, outputs: ['filter'] },
    { id: 'osc2', name: 'Wavetable OSC 2', type: 'generator', color: 'bg-ni-orange', x: 40, y: 120, outputs: [] },
    { id: 'noise1', name: 'Noise Player 1', type: 'generator', color: 'bg-ni-teal', x: 40, y: 200, outputs: ['filter'] },
    { id: 'filter', name: 'Main Filter (F)', type: 'processor', color: 'bg-gray-500', x: 260, y: 100, outputs: ['insertA'] },
    { id: 'insertA', name: 'Insert Effect A', type: 'processor', color: 'bg-gray-600', x: 440, y: 100, outputs: ['stereoX'] },
    { id: 'stereoX', name: 'Stereo Effect X', type: 'processor', color: 'bg-ni-blue', x: 620, y: 120, outputs: ['out'] },
    { id: 'out', name: 'Audio Output', type: 'processor', color: 'bg-ni-amber', x: 780, y: 120, outputs: [] },
  ]);

  const [selectedOutput, setSelectedOutput] = useState<{ node: string; index: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleConnection = (fromId: string, toId: string) => {
    setNodes(prev => prev.map(n => {
      if (n.id === fromId) {
        const index = n.outputs.indexOf(toId);
        if (index > -1) {
          // Remove connection
          return { ...n, outputs: n.outputs.filter(o => o !== toId) };
        } else {
          // Add connection
          return { ...n, outputs: [...n.outputs, toId] };
        }
      }
      return n;
    }));
  };

  const handleNodeClick = (nodeId: string) => {
    if (nodeId === 'out') return; // Master output has no outputs
    
    if (selectedOutput === null) {
      setSelectedOutput({ node: nodeId, index: 0 });
    } else {
      if (selectedOutput.node === nodeId) {
        setSelectedOutput(null); // Cancel selection
      } else {
        // Create connection from selected to clicked
        toggleConnection(selectedOutput.node, nodeId);
        setSelectedOutput(null);
      }
    }
  };

  const resetRouting = () => {
    setNodes([
      { id: 'osc1', name: 'Wavetable OSC 1', type: 'generator', color: 'bg-ni-orange', x: 40, y: 40, outputs: ['filter'] },
      { id: 'osc2', name: 'Wavetable OSC 2', type: 'generator', color: 'bg-ni-orange', x: 40, y: 120, outputs: [] },
      { id: 'noise1', name: 'Noise Player 1', type: 'generator', color: 'bg-ni-teal', x: 40, y: 200, outputs: ['filter'] },
      { id: 'filter', name: 'Main Filter (F)', type: 'processor', color: 'bg-gray-500', x: 260, y: 100, outputs: ['insertA'] },
      { id: 'insertA', name: 'Insert Effect A', type: 'processor', color: 'bg-gray-600', x: 440, y: 100, outputs: ['stereoX'] },
      { id: 'stereoX', name: 'Stereo Effect X', type: 'processor', color: 'bg-ni-blue', x: 620, y: 120, outputs: ['out'] },
      { id: 'out', name: 'Audio Output', type: 'processor', color: 'bg-ni-amber', x: 780, y: 120, outputs: [] },
    ]);
    setSelectedOutput(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col"
    >
      <div className="flex justify-between items-center mb-3">
        <div>
          <h3 className="text-sm font-mono text-ni-blue font-bold uppercase tracking-wide flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-ni-blue rounded-full" />
            Interactive Semi-Modular Routing Board
          </h3>
          <p className="text-xs text-gray-400 mt-1">
            Click on a module to select it as source, then click another module to connect a patch wire. Double-click any active wire to erase it.
          </p>
        </div>
        <button
          onClick={resetRouting}
          className="flex items-center gap-1 px-3 py-1 bg-ni-border hover:bg-ni-border/80 text-gray-300 font-mono text-xs rounded transition-all"
        >
          <RefreshCw size={12} />
          RESET PATCH
        </button>
      </div>

      {/* SVG Canvas Board */}
      <div 
        ref={containerRef}
        className="relative w-full h-[280px] bg-ni-dark rounded-xl border border-ni-border overflow-x-auto shadow-inner select-none p-4"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ minWidth: '850px' }}>
          {/* Active Wires and glowing dots */}
          {nodes.map(fromNode => 
            fromNode.outputs.map(toId => {
              const toNode = nodes.find(n => n.id === toId);
              if (!toNode) return null;

              // Wire starting and ending coordinates
              const x1 = fromNode.x + 140;
              const y1 = fromNode.y + 20;
              const x2 = toNode.x;
              const y2 = toNode.y + 20;

              // Cubic bezier control points for beautiful saggy analog wires
              const cx1 = x1 + 60;
              const cy1 = y1;
              const cx2 = x2 - 60;
              const cy2 = y2 + 20;

              const pathD = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

              return (
                <g key={`${fromNode.id}-${toId}`} className="cursor-pointer pointer-events-auto" onClick={() => toggleConnection(fromNode.id, toId)}>
                  {/* Hover thick strike zone */}
                  <path d={pathD} fill="none" stroke="transparent" strokeWidth="12" className="hover:stroke-red-500/20" />
                  {/* Shadow base wire */}
                  <path d={pathD} fill="none" stroke="#000000" strokeWidth="4" opacity="0.6" />
                  {/* Glowing color wire */}
                  <path 
                    d={pathD} 
                    fill="none" 
                    stroke={fromNode.type === 'generator' ? '#ff5c00' : '#0091ff'} 
                    strokeWidth="2.5" 
                    className="animate-pulse"
                  />
                  {/* Audio signal flow pulses */}
                  <circle r="4" fill="#00f0aa">
                    <animateMotion dur="2.5s" repeatCount="indefinite" path={pathD} />
                  </circle>
                </g>
              );
            })
          )}
        </svg>

        {/* Node Modules placement */}
        <div className="absolute inset-0 flex items-start" style={{ minWidth: '850px' }}>
          {nodes.map(node => {
            const isSelected = selectedOutput?.node === node.id;
            const hasOutputs = node.outputs.length > 0;
            return (
              <div
                key={node.id}
                onClick={() => handleNodeClick(node.id)}
                className={`absolute w-36 h-11 rounded-lg border-2 flex items-center justify-between px-3 cursor-pointer select-none transition-all ${
                  isSelected 
                    ? 'border-ni-orange bg-ni-orange/10 scale-105 shadow-lg shadow-ni-orange/10' 
                    : 'border-ni-border bg-ni-card hover:bg-ni-border/40 hover:border-gray-500'
                }`}
                style={{ left: `${node.x}px`, top: `${node.y}px` }}
              >
                {/* Node Generator/Processor left indicator */}
                <div className="flex items-center gap-2 overflow-hidden w-full">
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${node.color}`} />
                  <span className="text-[10px] font-mono font-bold text-gray-200 truncate">{node.name}</span>
                </div>

                {/* Ports */}
                <div className="flex flex-col gap-1 items-center shrink-0">
                  {node.id !== 'out' && (
                    <div className={`w-2.5 h-2.5 rounded-full border border-gray-400 ${isSelected ? 'bg-ni-orange' : 'bg-ni-dark'} hover:border-white transition-all`} />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modular Guide Label */}
        <div className="absolute bottom-2 right-4 flex gap-4 text-[10px] font-mono text-gray-400">
          <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-ni-orange inline-block" /> Polyphonic OSCs</div>
          <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-ni-teal inline-block" /> Noise Source</div>
          <div className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-ni-blue inline-block" /> Monophonic FX</div>
        </div>
      </div>
    </motion.div>
  );
}

/* ==========================================================================
   3. WAVETABLE PLAYGROUND
   ========================================================================== */
function WavetablePlayground() {
  const [wtMode, setWtMode] = useState<'standard' | 'bend' | 'hardsync' | 'gorilla' | 'jitter'>('standard');
  const [wtPosition, setWtPosition] = useState(0.3); // 0 to 1
  const [secondaryControl, setSecondaryControl] = useState(0.5); // 0 to 1

  // Draw simulated waveform based on selected wavetable mode
  const drawWaveform = () => {
    let points: [number, number][] = [];
    const width = 300;
    const height = 140;
    const centerY = height / 2;

    for (let x = 0; x <= width; x++) {
      const normalizedX = x / width; // 0 to 1
      const phase = normalizedX * 2 * Math.PI * 3; // 3 cycles

      let y = 0;

      // Base sine/saw mix based on WT position
      const sine = Math.sin(phase);
      const saw = ((phase % (2 * Math.PI)) / (2 * Math.PI)) * 2 - 1;
      const baseWave = sine * (1 - wtPosition) + saw * wtPosition;

      if (wtMode === 'standard') {
        // Reducing high frequencies (low-pass like)
        const filterVal = secondaryControl; // 0 is heavy filter, 1 is bright
        y = Math.sin(phase) * (1 - filterVal) + baseWave * filterVal;
      } else if (wtMode === 'bend') {
        // Bend curves phase compression / expansion
        const bendVal = (secondaryControl - 0.5) * 1.5; // -0.75 to +0.75
        const bentX = normalizedX + bendVal * Math.sin(normalizedX * Math.PI);
        const bentPhase = bentX * 2 * Math.PI * 3;
        y = Math.sin(bentPhase) * (1 - wtPosition) + (Math.sin(bentPhase) > 0 ? 0.7 : -0.7) * wtPosition;
      } else if (wtMode === 'hardsync') {
        // Hard sync restarts cycles early based on ratio
        const ratio = 1 + secondaryControl * 4; // 1x to 5x sync multiplier
        const syncPhase = (phase * ratio) % (2 * Math.PI);
        const syncSine = Math.sin(syncPhase);
        // Window envelope to smooth reset
        const windowVal = Math.sin(normalizedX * Math.PI);
        y = syncSine * windowVal;
      } else if (wtMode === 'gorilla') {
        // Ultra distorted double fold
        const drive = 1 + wtPosition * 5;
        const formants = Math.sin(phase * (1 + secondaryControl * 3)) * drive;
        y = Math.tanh(formants);
      } else if (wtMode === 'jitter') {
        // Random spikes in fundamental phase
        const noiseFactor = secondaryControl * 0.3;
        const randomPhaseOffset = (Math.random() - 0.5) * noiseFactor;
        y = Math.sin(phase + randomPhaseOffset * Math.sin(phase * 10));
      }

      points.push([x, centerY + y * (height * 0.4)]);
    }

    return points.map(([px, py]) => `${px},${py}`).join(' ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      <div className="lg:col-span-5 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-mono text-ni-teal font-bold uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-ni-teal rounded-full" />
            Wavetable Readout Deformer
          </h3>
          <p className="text-xs text-gray-400 mb-4">
            Synthesize sound shapes directly on the scope. Switching modes shifts the algorithm used to read and fold the wavetable position.
          </p>

          <div className="flex flex-col gap-3">
            <div>
              <label className="text-[10px] font-mono text-gray-400 block mb-1">SELECT MODE (10 AVAILABLE)</label>
              <select
                value={wtMode}
                onChange={(e) => setWtMode(e.target.value as any)}
                className="w-full bg-ni-dark text-white text-xs border border-ni-border rounded p-2.5 font-mono outline-none"
              >
                <option value="standard">Standard (Spectrum Cut)</option>
                <option value="bend">Bend Mode (Phase Warp)</option>
                <option value="hardsync">Hardsync (Analog Mirror)</option>
                <option value="gorilla">Gorilla Mode (Double-Fold)</option>
                <option value="jitter">Jitter Mode (Glitter Noise)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-mono text-gray-400 flex justify-between mb-1">
                <span>WAVETABLE POSITION (WT POS)</span>
                <span className="text-ni-teal font-bold">{Math.round(wtPosition * 100)}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={wtPosition}
                onChange={(e) => setWtPosition(parseFloat(e.target.value))}
                className="w-full h-1 bg-ni-dark rounded-lg appearance-none cursor-pointer accent-ni-teal"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono text-gray-400 flex justify-between mb-1">
                <span>
                  {wtMode === 'standard' && 'FILTER SPECTRAL DEPTH'}
                  {wtMode === 'bend' && 'BEND SHAPE RATIO'}
                  {wtMode === 'hardsync' && 'SYNC MULTIPLIER (RATIO)'}
                  {wtMode === 'gorilla' && 'FORMANT INTENSITY (OVER)'}
                  {wtMode === 'jitter' && 'JITTER DISPERSION RATE'}
                </span>
                <span className="text-ni-teal font-bold">{Math.round(secondaryControl * 100)}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={secondaryControl}
                onChange={(e) => setSecondaryControl(parseFloat(e.target.value))}
                className="w-full h-1 bg-ni-dark rounded-lg appearance-none cursor-pointer accent-ni-teal"
              />
            </div>
          </div>
        </div>

        {/* Spec Badge box */}
        <div className="bg-ni-dark/40 border border-ni-border p-3 rounded-lg text-[11px] font-mono text-gray-400 mt-4">
          {wtMode === 'bend' && '💡 Up-down mode on Bend inverts every second wave cycle, successfully cancelling even harmonics for a hollow hollowed-out square shape.'}
          {...wtModeExplain(wtModeText[wtMode as keyof typeof wtModeText])}
        </div>
      </div>

      {/* Scope Canvas Block */}
      <div className="lg:col-span-7 flex flex-col items-center justify-center">
        <div className="relative w-full h-56 bg-ni-dark rounded-xl border border-ni-border overflow-hidden shadow-inner flex flex-col justify-between p-3">
          {/* Wave scope headers */}
          <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
            <span>CH1 SCOPE: ACTIVE PREVIEW</span>
            <span className="text-ni-teal tracking-widest animate-pulse">● OSCILLATING</span>
          </div>

          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-5 pointer-events-none">
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="border border-gray-400" />
            ))}
          </div>

          {/* SVG Shape plot */}
          <svg className="w-full h-32 self-center overflow-visible" viewBox="0 0 300 140">
            <polyline
              fill="none"
              stroke="#00f0aa"
              strokeWidth="2.5"
              points={drawWaveform()}
              className="drop-shadow-[0_0_8px_rgba(0,240,170,0.5)]"
            />
          </svg>

          <div className="text-[9px] font-mono text-gray-500 text-right">
            X: Phase (0 - 1080°) | Y: Amplitude (-1.0 - +1.0)
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const wtModeText = {
  standard: 'Reduces higher frequency harmonics of the wave, working like an extremely smooth brick-wall filter sweep.',
  bend: 'Compresses certain regions of the wave phase and expands others. Up-Down cuts even harmonics entirely.',
  hardsync: 'Folds phase back to zero within a single cycle. Soft/Grain window options smooth out the abrupt reset edges.',
  gorilla: 'Exaggerated formant warping creating dirty vowels. Works best with low spectral complexity waves like Banana.',
  jitter: 'Scrambles end-of-cycle phases randomly to introduce shimmery glitch textures and high-frequency digital glitter.'
};

function wtModeExplain(text: string) {
  return [text];
}

/* ==========================================================================
   4. ENVELOPE PLAYGROUND
   ========================================================================== */
function EnvelopePlayground() {
  const [delay, setDelay] = useState(0.05); // 0 to 1
  const [attack, setAttack] = useState(0.2); // 0 to 1
  const [hold, setHold] = useState(0.1); // 0 to 1
  const [decay, setDecay] = useState(0.3); // 0 to 1
  const [sustain, setSustain] = useState(0.5); // 0 to 1
  const [release, setRelease] = useState(0.3); // 0 to 1

  const [triggerPulse, setTriggerPulse] = useState(false);

  const drawEnvelopePath = () => {
    const width = 340;
    const height = 150;
    const margin = 10;
    const plotWidth = width - 2 * margin;
    const plotHeight = height - 2 * margin;

    // Total units of normalized time: 1.0 (Delay + Attack + Hold + Decay + Release)
    const totalTime = delay + attack + hold + decay + release;

    // Scale factors
    const timeToX = (t: number) => margin + (t / totalTime) * plotWidth;
    const ampToY = (a: number) => height - margin - a * plotHeight;

    let dX = delay;
    let aX = dX + attack;
    let hX = aX + hold;
    let deX = hX + decay;
    let sX = deX + 0.25; // Dummy sustain spacer width
    let rX = sX + release;

    const pDelayStart = `${timeToX(0)}, ${ampToY(0)}`;
    const pAttackStart = `${timeToX(dX)}, ${ampToY(0)}`;
    const pPeak = `${timeToX(aX)}, ${ampToY(1.0)}`;
    const pHoldEnd = `${timeToX(hX)}, ${ampToY(1.0)}`;
    const pSustainStart = `${timeToX(deX)}, ${ampToY(sustain)}`;
    const pSustainEnd = `${timeToX(sX)}, ${ampToY(sustain)}`;
    const pEnd = `${timeToX(rX)}, ${ampToY(0)}`;

    return `M ${pDelayStart} L ${pAttackStart} Q ${timeToX(dX + attack * 0.5)} ${ampToY(0.7)}, ${pPeak} L ${pHoldEnd} Q ${timeToX(hX + decay * 0.5)} ${ampToY(sustain + (1 - sustain) * 0.6)}, ${pSustainStart} L ${pSustainEnd} L ${pEnd}`;
  };

  const triggerSound = () => {
    setTriggerPulse(true);
    setTimeout(() => setTriggerPulse(false), 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      <div className="lg:col-span-5 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-mono text-ni-yellow font-bold uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-ni-yellow rounded-full" />
            Interactive ADSDR Envelope Curvator
          </h3>
          <p className="text-xs text-gray-400 mb-4">
            Modify the logarithmic envelopes. Massive X uses dual Hold parameters (Hold-1 at peak, Hold-2 at sustain) to contour sound waves with immense precision.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">DELAY: {Math.round(delay * 1000)}ms</label>
              <input type="range" min="0" max="0.3" step="0.01" value={delay} onChange={e => setDelay(parseFloat(e.target.value))} className="w-full h-1 bg-ni-dark rounded-lg appearance-none cursor-pointer accent-ni-yellow" />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">ATTACK: {Math.round(attack * 1000)}ms</label>
              <input type="range" min="0.05" max="0.5" step="0.01" value={attack} onChange={e => setAttack(parseFloat(e.target.value))} className="w-full h-1 bg-ni-dark rounded-lg appearance-none cursor-pointer accent-ni-yellow" />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">PEAK HOLD: {Math.round(hold * 1000)}ms</label>
              <input type="range" min="0" max="0.3" step="0.01" value={hold} onChange={e => setHold(parseFloat(e.target.value))} className="w-full h-1 bg-ni-dark rounded-lg appearance-none cursor-pointer accent-ni-yellow" />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">DECAY: {Math.round(decay * 1000)}ms</label>
              <input type="range" min="0.05" max="0.6" step="0.01" value={decay} onChange={e => setDecay(parseFloat(e.target.value))} className="w-full h-1 bg-ni-dark rounded-lg appearance-none cursor-pointer accent-ni-yellow" />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">SUSTAIN: {Math.round(sustain * 100)}%</label>
              <input type="range" min="0" max="1" step="0.01" value={sustain} onChange={e => setSustain(parseFloat(e.target.value))} className="w-full h-1 bg-ni-dark rounded-lg appearance-none cursor-pointer accent-ni-yellow" />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 block mb-1">RELEASE: {Math.round(release * 1000)}ms</label>
              <input type="range" min="0.05" max="0.6" step="0.01" value={release} onChange={e => setRelease(parseFloat(e.target.value))} className="w-full h-1 bg-ni-dark rounded-lg appearance-none cursor-pointer accent-ni-yellow" />
            </div>
          </div>
        </div>

        <button
          onClick={triggerSound}
          className="w-full mt-4 flex items-center justify-center gap-1.5 py-2.5 bg-ni-yellow hover:bg-ni-yellow/90 text-ni-dark font-mono text-xs font-bold rounded-lg transition-all"
        >
          <Play size={12} fill="currentColor" />
          TRIGGER TEST PULSE ADSR
        </button>
      </div>

      <div className="lg:col-span-7 flex flex-col items-center justify-center">
        <div className="relative w-full h-56 bg-ni-dark rounded-xl border border-ni-border overflow-hidden shadow-inner p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
            <span>ACTIVE ADSR ENVELOPE PATH DISPLAY</span>
            <span className={`transition-all font-bold ${triggerPulse ? 'text-ni-yellow' : 'text-gray-600'}`}>
              {triggerPulse ? '● KEY DOWN (GATE)' : '○ STANDBY'}
            </span>
          </div>

          <svg className="w-full h-40 overflow-visible" viewBox="0 0 340 150">
            {/* Draw glowing guide grid */}
            <line x1="10" y1="10" x2="330" y2="10" stroke="#ffffff" strokeWidth="0.5" opacity="0.05" />
            <line x1="10" y1="140" x2="330" y2="140" stroke="#ffffff" strokeWidth="0.5" opacity="0.1" />

            {/* Filled background curve */}
            <path
              d={`${drawEnvelopePath()} L 330, 140 Z`}
              fill="url(#envGrad)"
              opacity="0.15"
            />

            {/* Envelope path line */}
            <motion.path
              d={drawEnvelopePath()}
              fill="none"
              stroke="#ffb800"
              strokeWidth="2.5"
              className="drop-shadow-[0_0_8px_rgba(255,184,0,0.5)]"
            />

            {/* Simulated trigger pulse */}
            {triggerPulse && (
              <motion.circle r="6" fill="#ff5c00" className="drop-shadow-[0_0_6px_#ff5c00]">
                <animateMotion dur="0.8s" repeatCount="1" path={drawSimplePath(delay, attack, hold, sustain, release)} />
              </motion.circle>
            )}

            <defs>
              <linearGradient id="envGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffb800" />
                <stop offset="100%" stopColor="#ffb800" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          <div className="flex justify-between text-[9px] font-mono text-gray-500">
            <span>D: {Math.round(delay * 1000)}ms | A: {Math.round(attack * 1000)}ms | H: {Math.round(hold * 1000)}ms</span>
            <span>D: {Math.round(decay * 1000)}ms | S: {Math.round(sustain * 100)}% | R: {Math.round(release * 1000)}ms</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Draw a basic representation of ADSR timing triggers for visual pulses
function drawSimplePath(d: number, a: number, h: number, s: number, r: number) {
  return "M 10,140 Q 50,70 120,20 L 150,20 Q 200,80 230,80 L 260,80 Q 300,140 330,140";
}
