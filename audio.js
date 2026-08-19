const AudioFX = (function() {
            let ctx = null;
            let masterGain = null;
            let muted = false;

            function init() {
                if (ctx) return;
                try {
                    ctx = new (window.AudioContext || window.webkitAudioContext)();
                    masterGain = ctx.createGain();
                    masterGain.gain.value = 0.3;
                    masterGain.connect(ctx.destination);
                } catch(e) {
                    console.warn('Web Audio API not supported');
                }
            }

            function resume() {
                init();
                if (ctx && ctx.state === 'suspended') {
                    ctx.resume();
                }
            }

            function playTone(freq, duration, type, volume, attack) {
                if (muted || !ctx) return;
                attack = attack || 0.01;
                volume = volume || 0.3;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = type || 'sine';
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0, ctx.currentTime);
                gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + attack);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
                osc.connect(gain);
                gain.connect(masterGain);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + duration + 0.05);
            }

            function playClick() {
                resume();
                if (muted || !ctx) return;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'square';
                osc.frequency.value = 600;
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
                osc.connect(gain);
                gain.connect(masterGain);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.08);
            }

            function playHover() {
                resume();
                if (muted || !ctx) return;
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.value = 1200;
                gain.gain.setValueAtTime(0.06, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
                osc.connect(gain);
                gain.connect(masterGain);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.05);
            }

            function playCorrect() {
                resume();
                playTone(523.25, 0.15, 'sine', 0.25, 0.01);
                setTimeout(() => playTone(659.25, 0.15, 'sine', 0.25, 0.01), 80);
                setTimeout(() => playTone(783.99, 0.2, 'sine', 0.25, 0.01), 160);
            }

            function playIncorrect() {
                resume();
                playTone(220, 0.3, 'sawtooth', 0.2, 0.02);
                setTimeout(() => playTone(165, 0.4, 'sawtooth', 0.2, 0.02), 100);
            }

            function playStageUp() {
                resume();
                const notes = [523.25, 659.25, 783.99, 1046.5];
                notes.forEach((f, i) => {
                    setTimeout(() => playTone(f, 0.18, 'sine', 0.22, 0.01), i * 100);
                });
            }

            function playTimerTick() {
                resume();
                playTone(880, 0.05, 'square', 0.12, 0.005);
            }

            function playGameOver() {
                resume();
                const notes = [392, 311.13, 261.63, 196];
                notes.forEach((f, i) => {
                    setTimeout(() => playTone(f, 0.3, 'triangle', 0.2, 0.02), i * 150);
                });
            }

            function playApply() {
                resume();
                playTone(440, 0.1, 'sine', 0.2, 0.01);
                setTimeout(() => playTone(660, 0.12, 'sine', 0.2, 0.01), 60);
            }

            function playStart() {
                resume();
                playTone(330, 0.12, 'sine', 0.22, 0.01);
                setTimeout(() => playTone(494, 0.12, 'sine', 0.22, 0.01), 70);
                setTimeout(() => playTone(660, 0.18, 'sine', 0.22, 0.01), 140);
            }

            function setMuted(val) {
                muted = val;
            }

            function isMuted() {
                return muted;
            }

            return {
                init: resume,
                playClick,
                playHover,
                playCorrect,
                playIncorrect,
                playStageUp,
                playTimerTick,
                playGameOver,
                playApply,
                playStart,
                setMuted,
                isMuted
            };
        })();
