
const gameState = {
            isPlaying: false,
            currentStage: 1,
            score: 0,
            correctInStage: 0,
            totalCorrect: 0,
            gridSize: 2,
            colorDiff: 15.0,
            multiplier: 1.0,
            differentIndex: -1,
            baseColor: null,
            differentColor: null,
            shape: 'square',
            isProcessing: false,
            isClickLocked: false,
            clickLockTimer: null,
            debounceTimer: null,
            initialDifficulty: 1,
            highScore: localStorage.getItem('colorVisionHighScore') || 0,
            timeModeHighScore: parseFloat(localStorage.getItem('colorVisionTimeHighScore')) || 0.00,
            highScoreDetail: localStorage.getItem('colorVisionHighScoreDetail') || '经典模式',
            timeModeHighScoreDetail: localStorage.getItem('colorVisionTimeHighScoreDetail') || '0.00 分/秒',
            gameMode: 'classic',
            timeLimit: 30,
            timeLeft: 30,
            timer: null,
            isDarkTheme: localStorage.getItem('colorVisionDarkTheme') === 'true',
            isTimeMode: localStorage.getItem('colorVisionTimeMode') === 'true',
            currentTheme: parseInt(localStorage.getItem('colorVisionTheme')) || 0
        };

        const difficultyCurve = [
            { stage: 1, gridSize: 2, colorDiff: 15.0, shape: 'square', shapeRadius: 4, difficultyType: '初始难度' },
            { stage: 2, gridSize: 2, colorDiff: 14.5, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 3, gridSize: 2, colorDiff: 14.0, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 4, gridSize: 3, colorDiff: 14.0, shape: 'square', shapeRadius: 4, difficultyType: '网格增大' },
            { stage: 5, gridSize: 3, colorDiff: 13.5, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 6, gridSize: 3, colorDiff: 13.0, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 7, gridSize: 4, colorDiff: 13.0, shape: 'square', shapeRadius: 4, difficultyType: '网格增大' },
            { stage: 8, gridSize: 4, colorDiff: 12.5, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 9, gridSize: 4, colorDiff: 12.0, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 10, gridSize: 5, colorDiff: 12.0, shape: 'square', shapeRadius: 4, difficultyType: '网格增大' },
            { stage: 11, gridSize: 5, colorDiff: 11.5, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 12, gridSize: 5, colorDiff: 11.0, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 13, gridSize: 5, colorDiff: 10.5, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 14, gridSize: 6, colorDiff: 10.5, shape: 'square', shapeRadius: 4, difficultyType: '网格增大' },
            { stage: 15, gridSize: 6, colorDiff: 10.0, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 16, gridSize: 6, colorDiff: 9.5, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 17, gridSize: 6, colorDiff: 9.0, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 18, gridSize: 7, colorDiff: 9.0, shape: 'square', shapeRadius: 4, difficultyType: '网格增大' },
            { stage: 19, gridSize: 7, colorDiff: 8.5, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 20, gridSize: 7, colorDiff: 8.3, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 21, gridSize: 7, colorDiff: 8.1, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 22, gridSize: 8, colorDiff: 8.0, shape: 'square', shapeRadius: 4, difficultyType: '网格增大' },
            { stage: 23, gridSize: 8, colorDiff: 7.8, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 24, gridSize: 8, colorDiff: 7.5, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 25, gridSize: 8, colorDiff: 7.3, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 26, gridSize: 8, colorDiff: 7.2, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 27, gridSize: 8, colorDiff: 7.0, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 28, gridSize: 8, colorDiff: 6.8, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 29, gridSize: 8, colorDiff: 6.6, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 30, gridSize: 8, colorDiff: 6.4, shape: 'square', shapeRadius: 4, difficultyType: '色差减小' },
            { stage: 31, gridSize: 8, colorDiff: 6.2, shape: 'round-square', shapeRadius: 9, difficultyType: '形状变化' },
            { stage: 32, gridSize: 8, colorDiff: 6.0, shape: 'round-square', shapeRadius: 12, difficultyType: '形状变化' },
            { stage: 33, gridSize: 8, colorDiff: 5.9, shape: 'round-square', shapeRadius: 15, difficultyType: '形状变化' },
            { stage: 34, gridSize: 8, colorDiff: 5.8, shape: 'round-square', shapeRadius: 18, difficultyType: '形状变化' },
            { stage: 35, gridSize: 8, colorDiff: 5.7, shape: 'round-square', shapeRadius: 21, difficultyType: '形状变化' },
            { stage: 36, gridSize: 8, colorDiff: 5.6, shape: 'round-square', shapeRadius: 24, difficultyType: '形状变化' },
            { stage: 37, gridSize: 8, colorDiff: 5.5, shape: 'round-square', shapeRadius: 27, difficultyType: '形状变化' },
            { stage: 38, gridSize: 8, colorDiff: 5.4, shape: 'round-square', shapeRadius: 30, difficultyType: '形状变化' },
            { stage: 39, gridSize: 8, colorDiff: 5.3, shape: 'round-square', shapeRadius: 33, difficultyType: '形状变化' },
            { stage: 40, gridSize: 8, colorDiff: 5.2, shape: 'circle', shapeRadius: 50, difficultyType: '形状变化' },
            { stage: 41, gridSize: 6, colorDiff: 3.8, shape: 'circle', shapeRadius: 50, difficultyType: '返璞归真' },
            { stage: 42, gridSize: 5, colorDiff: 3.6, shape: 'circle', shapeRadius: 50, difficultyType: '返璞归真' },
            { stage: 43, gridSize: 4, colorDiff: 3.4, shape: 'circle', shapeRadius: 50, difficultyType: '返璞归真' },
            { stage: 44, gridSize: 3, colorDiff: 3.2, shape: 'circle', shapeRadius: 50, difficultyType: '返璞归真' },
            { stage: 45, gridSize: 2, colorDiff: 2.6, shape: 'circle', shapeRadius: 50, difficultyType: '返璞归真' },
            { stage: 46, gridSize: 2, colorDiff: 2.3, shape: 'circle', shapeRadius: 50, difficultyType: '色差减小' },
            { stage: 47, gridSize: 2, colorDiff: 2.0, shape: 'circle', shapeRadius: 50, difficultyType: '色差减小' },
            { stage: 48, gridSize: 2, colorDiff: 1.8, shape: 'circle', shapeRadius: 50, difficultyType: '色差减小' },
            { stage: 49, gridSize: 2, colorDiff: 1.6, shape: 'circle', shapeRadius: 50, difficultyType: '色差减小' },
            { stage: 50, gridSize: 4, colorDiff: 1.0, shape: 'circle', shapeRadius: 50, difficultyType: '最终难度' }
        ];

        const multiplierByStage = {
            1: 1.0, 2: 1.1, 3: 1.2, 4: 1.3, 5: 1.4,
            6: 1.5, 7: 1.6, 8: 1.7, 9: 1.8, 10: 2.0,
            11: 2.1, 12: 2.2, 13: 2.3, 14: 2.4, 15: 2.5,
            16: 2.6, 17: 2.7, 18: 2.8, 19: 2.9, 20: 3.0,
            21: 3.1, 22: 3.2, 23: 3.3, 24: 3.4, 25: 3.5,
            26: 3.6, 27: 3.7, 28: 3.8, 29: 3.9, 30: 4.0,
            31: 4.1, 32: 4.2, 33: 4.3, 34: 4.4, 35: 4.5,
            36: 4.6, 37: 4.7, 38: 4.8, 39: 4.9, 40: 5.0,
            41: 5.5, 42: 6.0, 43: 6.5, 44: 7.0, 45: 7.5,
            46: 8.0, 47: 8.5, 48: 9.0, 49: 9.5, 50: 10.0
        };

        const colorGrid = document.getElementById('colorGrid');
        const stageElement = document.getElementById('stage');
        const scoreElement = document.getElementById('score');
        const gridSizeElement = document.getElementById('gridSize');
        const colorDiffElement = document.getElementById('colorDiff');
        const multiplierElement = document.getElementById('multiplier');
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        const targetCountElement = document.getElementById('targetCount');
        const targetLabelElement = document.getElementById('targetLabel');
        const targetDetailElement = document.getElementById('targetDetail');
        const messageElement = document.getElementById('message');
        const startBtn = document.getElementById('startBtn');
        const giveupBtn = document.getElementById('giveupBtn');
        const highScoreElement = document.getElementById('highScore');
        const highScoreDetailElement = document.getElementById('highScoreDetail');
        const shapePreview = document.getElementById('shapePreview');
        const shapeLabel = document.getElementById('shapeLabel');
        const rainbowEmoji = document.querySelector('.rainbow-emoji');

        const difficultySlider = document.getElementById('difficultySlider');
        const selectedDifficultyDisplay = document.getElementById('selectedDifficultyDisplay');
        const previewGridSize = document.getElementById('previewGridSize');
        const previewColorDiff = document.getElementById('previewColorDiff');
        const previewMultiplier = document.getElementById('previewMultiplier');
        const previewShape = document.getElementById('previewShape');
        const applySettingsBtn = document.getElementById('applySettingsBtn');
        const sliderMarks = document.querySelectorAll('.slider-mark');
        const timeSettings = document.getElementById('timeSettings');
        const timeSlider = document.getElementById('timeSlider');
        const selectedTimeDisplay = document.getElementById('selectedTimeDisplay');
        const previewTime = document.getElementById('previewTime');
        const previewTimeTarget = document.getElementById('previewTimeTarget');
        const previewTimeScoring = document.getElementById('previewTimeScoring');
        const timeMarks = document.querySelectorAll('.time-mark');
        const timerContainer = document.querySelector('.timer-container.time-mode-only');
        const timerFill = document.getElementById('timerFill');
        const timerText = document.getElementById('timerText');

        const normalModeBtn = document.getElementById('normalMode');
        const timeModeBtn = document.getElementById('timeMode');
        const lightThemeBtn = document.getElementById('lightTheme');
        const darkThemeBtn = document.getElementById('darkTheme');

        const labCache = new Map();

        function applyTheme(themeIndex) {
            const body = document.body;
            for (let i = 0; i <= 5; i++) {
                body.classList.remove(`theme-${i}`);
            }
            body.classList.add(`theme-${themeIndex}`);
            gameState.currentTheme = themeIndex;
            localStorage.setItem('colorVisionTheme', themeIndex.toString());
        }

        function initTheme() {
            const body = document.body;
            body.classList.add(`theme-${gameState.currentTheme}`);

            if (gameState.isDarkTheme) {
                body.classList.add('dark-theme');
                body.classList.remove('light-theme');
                darkThemeBtn.classList.add('active');
                lightThemeBtn.classList.remove('active');
            } else {
                body.classList.add('light-theme');
                body.classList.remove('dark-theme');
                lightThemeBtn.classList.add('active');
                darkThemeBtn.classList.remove('active');
            }
        }

        rainbowEmoji.addEventListener('click', function(e) {
            e.stopPropagation();
            let nextTheme = gameState.currentTheme + 1;
            if (nextTheme > 5) nextTheme = 0;
            applyTheme(nextTheme);
            const themeNames = ['经典', '酷洛米', '深海柔白', '藤萝绿意', '茶花无白', '清水捣蓝'];
            showNotification(`已切换到「${themeNames[nextTheme]}」主题ヾ(≧▽≦*)o`);
            AudioFX.playClick();

            rainbowEmoji.classList.add('active');
            setTimeout(() => {
                rainbowEmoji.classList.remove('active');
            }, 3000);
        });

        function initGameMode() {
            if (gameState.isTimeMode) {
                document.body.classList.add('time-mode-active');
                timeModeBtn.classList.add('active');
                normalModeBtn.classList.remove('active');
                timeSettings.style.display = 'block';
                timerContainer.style.display = 'block';
                targetLabelElement.textContent = '已完成';
                targetDetailElement.textContent = '限时模式';
                highScoreElement.textContent = gameState.timeModeHighScore.toFixed(2);
                highScoreDetailElement.textContent = '分/秒';
            } else {
                document.body.classList.remove('time-mode-active');
                normalModeBtn.classList.add('active');
                timeModeBtn.classList.remove('active');
                timeSettings.style.display = 'none';
                timerContainer.style.display = 'none';
                targetLabelElement.textContent = '目标';
                targetDetailElement.textContent = '进入下一阶段';
                highScoreElement.textContent = gameState.highScore;
                highScoreDetailElement.textContent = gameState.highScoreDetail;
            }
        }

        function updateHighScoreDisplay() {
            if (gameState.isTimeMode) {
                highScoreElement.textContent = gameState.timeModeHighScore.toFixed(2);
                highScoreDetailElement.textContent = '分/秒';
            } else {
                highScoreElement.textContent = gameState.highScore;
                highScoreDetailElement.textContent = gameState.highScoreDetail;
            }
        }

        function updateHighScore() {
            if (gameState.isTimeMode) {
                const scorePerSecond = (gameState.score / gameState.timeLimit).toFixed(2);
                const detail = `${scorePerSecond} 分/秒`;
                if (parseFloat(scorePerSecond) > gameState.timeModeHighScore) {
                    gameState.timeModeHighScore = parseFloat(scorePerSecond);
                    gameState.timeModeHighScoreDetail = detail;
                    localStorage.setItem('colorVisionTimeHighScore', gameState.timeModeHighScore.toFixed(2));
                    localStorage.setItem('colorVisionTimeHighScoreDetail', gameState.timeModeHighScoreDetail);
                }
            } else {
                if (gameState.score > gameState.highScore) {
                    gameState.highScore = gameState.score;
                    const difficultyName = getDifficultyName(gameState.initialDifficulty);
                    gameState.highScoreDetail = `${difficultyName} 第${gameState.currentStage}阶段`;
                    localStorage.setItem('colorVisionHighScore', gameState.highScore);
                    localStorage.setItem('colorVisionHighScoreDetail', gameState.highScoreDetail);
                }
            }
            updateHighScoreDisplay();
        }

        function ciede2000(Lab1, Lab2) {
            const L1 = Lab1[0], a1 = Lab1[1], b1 = Lab1[2];
            const L2 = Lab2[0], a2 = Lab2[1], b2 = Lab2[2];
            const avgL = (L1 + L2) / 2;
            const C1 = Math.sqrt(a1 * a1 + b1 * b1);
            const C2 = Math.sqrt(a2 * a2 + b2 * b2);
            const avgC = (C1 + C2) / 2;
            const G = 0.5 * (1 - Math.sqrt(Math.pow(avgC, 7) / (Math.pow(avgC, 7) + Math.pow(25, 7))));
            const a1Prime = a1 * (1 + G);
            const a2Prime = a2 * (1 + G);
            const C1Prime = Math.sqrt(a1Prime * a1Prime + b1 * b1);
            const C2Prime = Math.sqrt(a2Prime * a2Prime + b2 * b2);
            const avgCPrime = (C1Prime + C2Prime) / 2;
            let h1Prime = Math.atan2(b1, a1Prime);
            h1Prime = h1Prime < 0 ? h1Prime + 2 * Math.PI : h1Prime;
            let h2Prime = Math.atan2(b2, a2Prime);
            h2Prime = h2Prime < 0 ? h2Prime + 2 * Math.PI : h2Prime;
            const avgHPrime = Math.abs(h1Prime - h2Prime) > Math.PI ?
                (h1Prime + h2Prime + 2 * Math.PI) / 2 : (h1Prime + h2Prime) / 2;
            const T = 1 - 0.17 * Math.cos(avgHPrime - Math.PI / 6) +
                0.24 * Math.cos(2 * avgHPrime) +
                0.32 * Math.cos(3 * avgHPrime + Math.PI / 30) -
                0.2 * Math.cos(4 * avgHPrime - 63 * Math.PI / 180);
            let deltaHPrime = h2Prime - h1Prime;
            if (Math.abs(deltaHPrime) > Math.PI) {
                deltaHPrime = deltaHPrime > 0 ? deltaHPrime - 2 * Math.PI : deltaHPrime + 2 * Math.PI;
            }
            const deltaLPrime = L2 - L1;
            const deltaCPrime = C2Prime - C1Prime;
            const deltaHPrime2 = 2 * Math.sqrt(C1Prime * C2Prime) * Math.sin(deltaHPrime / 2);
            const S_L = 1 + (0.015 * Math.pow(avgL - 50, 2)) / Math.sqrt(20 + Math.pow(avgL - 50, 2));
            const S_C = 1 + 0.045 * avgCPrime;
            const S_H = 1 + 0.015 * avgCPrime * T;
            const deltaTheta = 30 * Math.PI / 180 * Math.exp(-Math.pow((180 / Math.PI * avgHPrime - 275) / 25, 2));
            const R_C = 2 * Math.sqrt(Math.pow(avgCPrime, 7) / (Math.pow(avgCPrime, 7) + Math.pow(25, 7)));
            const R_T = -R_C * Math.sin(2 * deltaTheta);
            return Math.sqrt(
                Math.pow(deltaLPrime / S_L, 2) +
                Math.pow(deltaCPrime / S_C, 2) +
                Math.pow(deltaHPrime2 / S_H, 2) +
                R_T * (deltaCPrime / S_C) * (deltaHPrime2 / S_H)
            );
        }

        function rgbToHsl(r, g, b) {
            r /= 255; g /= 255; b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;
            if (max === min) { h = s = 0; }
            else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            return [h, s, l];
        }

        function hslToRgb(h, s, l) {
            let r, g, b;
            if (s === 0) { r = g = b = l; }
            else {
                const hue2rgb = (p, q, t) => {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1/6) return p + (q - p) * 6 * t;
                    if (t < 1/2) return q;
                    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                };
                const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                const p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }

        function getOptimizedBaseColor(difficulty) {
            const intensity = Math.max(0.2, 1 - (15 - difficulty) / 30);
            const min = Math.floor(50 * intensity);
            const max = Math.floor(205 * intensity);
            let r, g, b;
            do {
                r = Math.floor(Math.random() * (max - min + 1)) + min;
                g = Math.floor(Math.random() * (max - min + 1)) + min;
                b = Math.floor(Math.random() * (max - min + 1)) + min;
            } while (Math.abs(r - g) < 10 && Math.abs(g - b) < 10 && Math.abs(r - b) < 10);
            return `rgb(${r}, ${g}, ${b})`;
        }

        function generatePreciseContrastColor(baseColor, targetDE) {
            const baseRgb = parseRgb(baseColor);
            if (!baseRgb) return getOptimizedBaseColor(targetDE);
            const [baseH, baseS, baseL] = rgbToHsl(baseRgb.r, baseRgb.g, baseRgb.b);
            const fixedH = Math.max(0, Math.min(1, baseH + (Math.random() - 0.5) * 0.01));
            const stepFactor = Math.max(0.02, targetDE / 50);
            let bestColor = baseColor, bestDE = 0;
            let attempts = 0;
            const maxAttempts = 20;
            while ((Math.abs(bestDE - targetDE) > targetDE * 0.05) && attempts < maxAttempts) {
                const sAdjust = (Math.random() - 0.5) * stepFactor * 0.8;
                const lAdjust = (Math.random() - 0.5) * stepFactor * 1.2;
                const newS = Math.max(0.15, Math.min(0.85, baseS + sAdjust));
                const newL = Math.max(0.15, Math.min(0.85, baseL + lAdjust));
                const [r, g, b] = hslToRgb(fixedH, newS, newL);
                const testColor = `rgb(${r}, ${g}, ${b})`;
                const currentDE = calculateDeltaE(baseColor, testColor);
                if (Math.abs(currentDE - targetDE) < Math.abs(bestDE - targetDE)) {
                    bestDE = currentDE;
                    bestColor = testColor;
                }
                attempts++;
            }
            return bestColor;
        }

        function rgbToLab(rgb) {
            if (labCache.has(rgb)) return [...labCache.get(rgb)];
            const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (!match) return [0, 0, 0];
            let r = parseInt(match[1]) / 255, g = parseInt(match[2]) / 255, b = parseInt(match[3]) / 255;
            r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
            g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
            b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;
            let x = r * 0.4124564 + g * 0.3575761 + b * 0.1804375;
            let y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750;
            let z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041;
            x /= 0.95047; y /= 1.00000; z /= 1.08883;
            x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
            y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
            z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;
            const lab = [(116 * y) - 16, 500 * (x - y), 200 * (y - z)];
            labCache.set(rgb, lab);
            return lab;
        }

        function calculateDeltaE(color1, color2) {
            return ciede2000(rgbToLab(color1), rgbToLab(color2));
        }

        function parseRgb(rgbStr) {
            const match = rgbStr.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (!match) return null;
            return { r: parseInt(match[1]), g: parseInt(match[2]), b: parseInt(match[3]) };
        }

        function createParticles(x, y, color, count, type) {
            count = count || 15;
            type = type || 'normal';
            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                if (type === 'score') {
                    particle.style.width = '12px';
                    particle.style.height = '12px';
                } else {
                    const size = 6 + Math.random() * 6;
                    particle.style.width = `${size}px`;
                    particle.style.height = `${size}px`;
                }
                particle.style.backgroundColor = color;
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                document.body.appendChild(particle);
                const angle = Math.random() * Math.PI * 2;
                const speed = type === 'score' ? 3 + Math.random() * 2 : 2 + Math.random() * 3;
                const distance = type === 'score' ? 30 + Math.random() * 50 : 20 + Math.random() * 40;
                const animation = particle.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`, opacity: 0 }
                ], { duration: (type === 'score' ? 800 : 600) + Math.random() * 400, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
                animation.onfinish = () => particle.remove();
            }
        }

        function createScoreAnimation(x, y, score) {
            const el = document.createElement('div');
            el.textContent = `+${score}`;
            el.style.position = 'fixed';
            el.style.left = `${x}px`;
            el.style.top = `${y}px`;
            el.style.color = 'var(--success-color)';
            el.style.fontWeight = 'bold';
            el.style.fontSize = '2.8rem';
            el.style.zIndex = '1000';
            el.style.pointerEvents = 'none';
            el.style.textShadow = '0 4px 8px var(--shadow-color)';
            document.body.appendChild(el);
            createParticles(x, y, 'var(--success-color)', 20, 'score');
            const animation = el.animate([
                { transform: 'translateY(0) scale(0.8)', opacity: 0, filter: 'blur(4px)' },
                { transform: 'translateY(-60px) scale(1.5)', opacity: 1, filter: 'blur(0px)' },
                { transform: 'translateY(-80px) scale(1.8)', opacity: 0, filter: 'blur(4px)' }
            ], { duration: 1200, easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)' });
            animation.onfinish = () => el.remove();
        }

        function highlightCorrectCell(correctIndex) {
            const cells = document.querySelectorAll('.color-cell');
            if (cells.length > 0 && correctIndex >= 0 && correctIndex < cells.length) {
                const cell = cells[correctIndex];
                document.querySelectorAll('.color-cell.correct-highlight').forEach(c => c.classList.remove('correct-highlight'));
                cell.classList.add('correct-highlight');
                setTimeout(() => cell.classList.remove('correct-highlight'), 3000);
            }
        }

        function lockClick(duration) {
            duration = duration || 800;
            gameState.isClickLocked = true;
            if (gameState.clickLockTimer) clearTimeout(gameState.clickLockTimer);
            document.querySelectorAll('.color-cell').forEach(cell => cell.classList.add('disabled'));
            gameState.clickLockTimer = setTimeout(() => {
                gameState.isClickLocked = false;
                document.querySelectorAll('.color-cell').forEach(cell => cell.classList.remove('disabled'));
            }, duration);
        }

        function debounce(func, delay) {
            delay = delay || 200;
            return function(...args) {
                if (gameState.debounceTimer) clearTimeout(gameState.debounceTimer);
                gameState.debounceTimer = setTimeout(() => func.apply(this, args), delay);
            };
        }

        function updateUI() {
            stageElement.textContent = gameState.currentStage;
            scoreElement.textContent = gameState.score;
            gridSizeElement.textContent = `${gameState.gridSize}×${gameState.gridSize}`;
            colorDiffElement.textContent = gameState.colorDiff.toFixed(1);
            multiplierElement.textContent = `${gameState.multiplier.toFixed(1)}x`;
            if (gameState.isTimeMode) {
                const progressPercent = (gameState.correctInStage / 3) * 100;
                progressBar.style.width = `${progressPercent}%`;
                progressText.textContent = `${gameState.correctInStage}/3`;
                targetCountElement.textContent = `${gameState.correctInStage}`;
                const timePercent = (gameState.timeLeft / gameState.timeLimit) * 100;
                timerFill.style.width = `${timePercent}%`;
                const minutes = Math.floor(gameState.timeLeft / 60);
                const seconds = gameState.timeLeft % 60;
                timerText.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
                const progressPercent = (gameState.correctInStage / 3) * 100;
                progressBar.style.width = `${progressPercent}%`;
                progressText.textContent = `${gameState.correctInStage}/3`;
                targetCountElement.textContent = `${gameState.correctInStage}/3`;
            }
            const shapeData = difficultyCurve.find(s => s.stage === gameState.currentStage) || difficultyCurve[0];
            updateShapePreview(shapeData);
        }

        function updateShapePreview(shapeData) {
            shapePreview.style.borderRadius = shapeData.shapeRadius + 'px';
            if (shapeData.shape === 'circle') shapeLabel.textContent = '圆形';
            else if (shapeData.shape === 'round-square') shapeLabel.textContent = '圆角方形';
            else shapeLabel.textContent = '正方形';
        }

        function showMessage(text, type) {
            type = type || '';
            messageElement.textContent = text;
            messageElement.className = `message ${type}`;
            if (type === 'correct' || type === 'stage-up') {
                messageElement.style.animation = 'none';
                setTimeout(() => { messageElement.style.animation = 'pulse 1s infinite'; }, 10);
            }
        }

        function showNotification(message) {
            const notif = document.getElementById('notification');
            notif.textContent = message;
            notif.classList.add('show');
            setTimeout(() => notif.classList.remove('show'), 2000);
        }

        function generateColorGrid() {
            if (gameState.isProcessing) return;
            gameState.isProcessing = true;
            showMessage('生成颜色中...', 'loading');
            setTimeout(() => {
                colorGrid.innerHTML = '';
                const containerWidth = Math.max(120, colorGrid.parentElement.clientWidth - 40);
                colorGrid.style.gridTemplateColumns = `repeat(${gameState.gridSize}, 1fr)`;
                gameState.baseColor = getOptimizedBaseColor(gameState.colorDiff);
                gameState.differentColor = generatePreciseContrastColor(gameState.baseColor, gameState.colorDiff);
                let attempts = 0;
                let actualDE = calculateDeltaE(gameState.baseColor, gameState.differentColor);
                while ((actualDE < gameState.colorDiff * 0.92 || actualDE > gameState.colorDiff * 1.08) && attempts < 3) {
                    gameState.differentColor = generatePreciseContrastColor(gameState.baseColor, gameState.colorDiff);
                    actualDE = calculateDeltaE(gameState.baseColor, gameState.differentColor);
                    attempts++;
                }
                const totalCells = gameState.gridSize * gameState.gridSize;
                gameState.differentIndex = Math.floor(Math.random() * totalCells);
                const cellSize = Math.min(Math.floor((containerWidth - (gameState.gridSize - 1) * 8) / gameState.gridSize), 70);
                const fragment = document.createDocumentFragment();
                for (let i = 0; i < totalCells; i++) {
                    const cell = document.createElement('div');
                    cell.className = 'color-cell';
                    cell.style.width = `${cellSize}px`;
                    cell.style.height = `${cellSize}px`;
                    cell.style.backgroundColor = i === gameState.differentIndex ? gameState.differentColor : gameState.baseColor;
                    const shapeData = difficultyCurve.find(s => s.stage === gameState.currentStage) || difficultyCurve[0];
                    cell.style.borderRadius = shapeData.shapeRadius + 'px';
                    cell.style.opacity = '0';
                    cell.addEventListener('click', debounce(() => handleCellClick(i)));
                    cell.addEventListener('mouseenter', () => {
                        if (gameState.isPlaying && !gameState.isClickLocked) {
                            AudioFX.playHover();
                        }
                    });
                    fragment.appendChild(cell);
                }
                colorGrid.appendChild(fragment);
                setTimeout(() => {
                    colorGrid.querySelectorAll('.color-cell').forEach(cell => {
                        cell.style.transition = 'opacity 0.3s ease';
                        cell.style.opacity = '1';
                    });
                }, 10);
                gameState.isProcessing = false;
                showMessage('请找出颜色不同的色块ψ(｀∇´)ψ', '');
            }, 200);
        }

        function handleCellClick(index) {
            if (!gameState.isPlaying || gameState.isClickLocked || gameState.isProcessing) return;
            lockClick();
            const cell = document.querySelectorAll('.color-cell')[index];
            const rect = cell.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            if (index === gameState.differentIndex) {
                cell.classList.add('correct');
                createParticles(centerX, centerY, 'var(--success-color)', 12);
                const scoreAdd = Math.floor(10 * gameState.multiplier);
                createScoreAnimation(centerX, centerY, scoreAdd);
                gameState.correctInStage++;
                gameState.totalCorrect++;
                gameState.score += scoreAdd;
                AudioFX.playCorrect();
                showMessage('正确！o((>ω< ))o', 'correct');
                updateUI();
                if (gameState.isTimeMode) {
                    setTimeout(() => generateColorGrid(), 400);
                } else {
                    if (gameState.correctInStage >= 3) {
                        gameState.currentStage = Math.min(gameState.currentStage + 1, 50);
                        gameState.correctInStage = 0;
                        const newDiff = difficultyCurve.find(s => s.stage === gameState.currentStage) || difficultyCurve[difficultyCurve.length - 1];
                        gameState.gridSize = newDiff.gridSize;
                        gameState.colorDiff = newDiff.colorDiff;
                        gameState.multiplier = multiplierByStage[gameState.currentStage] || gameState.multiplier;
                        const msgRect = messageElement.getBoundingClientRect();
                        createParticles(msgRect.left + msgRect.width / 2, msgRect.top + msgRect.height / 2, 'var(--primary-color)', 20);
                        AudioFX.playStageUp();
                        showMessage(`升级到${gameState.currentStage}阶段！${newDiff.difficultyType}`, 'stage-up');
                        updateUI();
                    }
                    setTimeout(() => generateColorGrid(), 600);
                }
            } else {
                cell.classList.add('incorrect');
                createParticles(centerX, centerY, 'var(--error-color)', 15);
                highlightCorrectCell(gameState.differentIndex);
                AudioFX.playIncorrect();
                setTimeout(() => endGame('incorrect'), 1000);
            }
        }

        function updateDifficultyPreview(stage) {
            const diff = difficultyCurve.find(s => s.stage === stage) || difficultyCurve[0];
            const mult = multiplierByStage[stage] || 1.0;
            previewGridSize.textContent = `${diff.gridSize}×${diff.gridSize}`;
            previewColorDiff.textContent = diff.colorDiff.toFixed(1);
            previewMultiplier.textContent = `${mult.toFixed(1)}x`;
            if (diff.shape === 'circle') previewShape.textContent = '圆形';
            else if (diff.shape === 'round-square') previewShape.textContent = '圆角方形';
            else previewShape.textContent = '正方形';
            selectedDifficultyDisplay.textContent = `${stage} 级`;
            sliderMarks.forEach(mark => {
                mark.classList.remove('active');
                if (parseInt(mark.dataset.value) === stage) mark.classList.add('active');
            });
        }

        function updateTimePreview(seconds) {
            previewTime.textContent = `${seconds}秒`;
            if (seconds <= 30) previewTimeTarget.textContent = '极限速度';
            else if (seconds <= 60) previewTimeTarget.textContent = '保持速度';
            else if (seconds <= 180) previewTimeTarget.textContent = '节奏控制';
            else if (seconds <= 240) previewTimeTarget.textContent = '耐力挑战';
            else previewTimeTarget.textContent = '意志挑战';
            timeMarks.forEach(mark => {
                mark.classList.remove('active');
                if (parseInt(mark.dataset.value) === seconds) mark.classList.add('active');
            });
        }

        function setInitialDifficulty(stage) {
            gameState.initialDifficulty = stage;
            gameState.currentStage = stage;
            const diff = difficultyCurve.find(s => s.stage === stage) || difficultyCurve[0];
            gameState.gridSize = diff.gridSize;
            gameState.colorDiff = diff.colorDiff;
            gameState.multiplier = multiplierByStage[stage] || 1.0;
            gameState.shape = diff.shape;
            updateUI();
            updateDifficultyPreview(stage);
        }

        function setTimeLimit(seconds) {
            gameState.timeLimit = seconds;
            gameState.timeLeft = seconds;
            updateTimePreview(seconds);
            selectedTimeDisplay.textContent = `${seconds} 秒`;
        }

        function applySettings() {
            const selectedStage = parseInt(difficultySlider.value);
            setInitialDifficulty(selectedStage);
            if (gameState.isTimeMode) setTimeLimit(parseInt(timeSlider.value));
            if (gameState.isPlaying) {
                gameState.isPlaying = false;
                startBtn.disabled = false;
                giveupBtn.disabled = true;
                colorGrid.innerHTML = '';
                if (gameState.isTimeMode) clearInterval(gameState.timer);
                showMessage('难度设置已更新，点击开始游戏', '');
            }
            AudioFX.playApply();
            showNotification(`设置已应用！${gameState.isTimeMode ? '限时模式' : '经典模式'}，难度 ${selectedStage} 级 (${getDifficultyName(selectedStage)})`);
        }

        function getDifficultyName(stage) {
            if (stage <= 10) return '简单';
            if (stage <= 20) return '中等';
            if (stage <= 30) return '困难';
            if (stage <= 40) return '专家';
            return '大师';
        }

        function startTimer() {
            if (gameState.timer) clearInterval(gameState.timer);
            gameState.timer = setInterval(() => {
                gameState.timeLeft--;
                updateUI();
                if (gameState.timeLeft <= 5 && gameState.timeLeft > 0) {
                    AudioFX.playTimerTick();
                }
                if (gameState.timeLeft <= 0) endGame('timeup');
            }, 1000);
        }

        function endGame(reason) {
            gameState.isPlaying = false;
            clearInterval(gameState.timer);
            updateHighScore();
            AudioFX.playGameOver();
            if (reason === 'incorrect') {
                if (gameState.isTimeMode) {
                    const sps = (gameState.score / gameState.timeLimit).toFixed(2);
                    showMessage(`〒Δ〒错误！本次得分: ${gameState.score} (${sps}分/秒) 历史最高: ${gameState.timeModeHighScore.toFixed(2)}分/秒`, 'time-up');
                } else {
                    showMessage(`〒Δ〒游戏结束！本次得分: ${gameState.score} 历史最高: ${gameState.highScore}分`, 'game-over');
                }
            } else if (reason === 'timeup') {
                const sps = (gameState.score / gameState.timeLimit).toFixed(2);
                showMessage(`(～o￣3￣)～时间到！本次得分: ${gameState.score} (${sps}分/秒) 历史最高: ${gameState.timeModeHighScore.toFixed(2)}分/秒`, 'time-up');
            } else if (reason === 'giveup') {
                if (gameState.isTimeMode) {
                    const elapsed = gameState.timeLimit - gameState.timeLeft;
                    const sps = elapsed > 0 ? (gameState.score / elapsed).toFixed(2) : '0.00';
                    showMessage(`放弃该局！本次得分: ${gameState.score} (${sps}分/秒)`, 'game-over');
                } else {
                    showMessage(`放弃该局！本次得分: ${gameState.score}`, 'game-over');
                }
            }
            startBtn.textContent = '再玩一次';
            startBtn.disabled = false;
            giveupBtn.disabled = true;
            document.querySelectorAll('.color-cell').forEach(cell => cell.classList.add('disabled'));
            const gridContainer = document.querySelector('.color-grid-container');
            gridContainer.style.animation = 'none';
            setTimeout(() => { gridContainer.style.animation = 'pulse 0.5s ease-in-out 2'; }, 10);
        }

        function giveUpGame() {
            if (!gameState.isPlaying) return;
            if (confirm('确定要放弃当前游戏吗？')) endGame('giveup');
        }

        function initGame() {
            gameState.isPlaying = false;
            gameState.score = 0;
            gameState.correctInStage = 0;
            gameState.totalCorrect = 0;
            if (gameState.isTimeMode) {
                gameState.timeLeft = gameState.timeLimit;
                clearInterval(gameState.timer);
            } else {
                setInitialDifficulty(gameState.initialDifficulty);
            }
            updateUI();
            showMessage('第一次游玩先看下方[游戏规则]哦(≧∇≦)ﾉ', '');
            colorGrid.innerHTML = '';
            startBtn.textContent = '开始游戏';
            startBtn.disabled = false;
            giveupBtn.disabled = true;
            updateHighScoreDisplay();
        }

        function startGame() {
            if (gameState.isPlaying) return;
            if (startBtn.textContent === '再玩一次') initGame();
            gameState.isPlaying = true;
            startBtn.disabled = true;
            giveupBtn.disabled = false;
            AudioFX.playStart();
            if (gameState.isTimeMode) {
                gameState.timeLeft = gameState.timeLimit;
                showMessage(`限时模式开始！你有${gameState.timeLimit}秒时间`, 'stage-up');
                startTimer();
            } else {
                showMessage('游戏开始！', 'stage-up');
            }
            generateColorGrid();
        }

        function initDifficultySelector() {
            difficultySlider.addEventListener('input', () => updateDifficultyPreview(parseInt(difficultySlider.value)));
            sliderMarks.forEach(mark => {
                mark.addEventListener('click', function() {
                    difficultySlider.value = this.dataset.value;
                    updateDifficultyPreview(parseInt(this.dataset.value));
                    AudioFX.playClick();
                });
            });
            timeSlider.addEventListener('input', () => setTimeLimit(parseInt(timeSlider.value)));
            timeMarks.forEach(mark => {
                mark.addEventListener('click', function() {
                    timeSlider.value = this.dataset.value;
                    setTimeLimit(parseInt(this.dataset.value));
                    AudioFX.playClick();
                });
            });
            applySettingsBtn.addEventListener('click', applySettings);

            lightThemeBtn.addEventListener('click', function() {
                if (gameState.isDarkTheme) {
                    gameState.isDarkTheme = false;
                    localStorage.setItem('colorVisionDarkTheme', 'false');
                    document.body.classList.remove('dark-theme');
                    document.body.classList.add('light-theme');
                    darkThemeBtn.classList.remove('active');
                    lightThemeBtn.classList.add('active');
                    AudioFX.playClick();
                    showNotification('已切换到浅色模式');
                }
            });

            darkThemeBtn.addEventListener('click', function() {
                if (!gameState.isDarkTheme) {
                    gameState.isDarkTheme = true;
                    localStorage.setItem('colorVisionDarkTheme', 'true');
                    document.body.classList.remove('light-theme');
                    document.body.classList.add('dark-theme');
                    lightThemeBtn.classList.remove('active');
                    darkThemeBtn.classList.add('active');
                    AudioFX.playClick();
                    showNotification('已切换到深色模式');
                }
            });

            normalModeBtn.addEventListener('click', function() {
                if (gameState.isTimeMode) {
                    gameState.isTimeMode = false;
                    localStorage.setItem('colorVisionTimeMode', 'false');
                    AudioFX.playClick();
                    initGameMode();
                    initGame();
                }
            });

            timeModeBtn.addEventListener('click', function() {
                if (!gameState.isTimeMode) {
                    gameState.isTimeMode = true;
                    localStorage.setItem('colorVisionTimeMode', 'true');
                    AudioFX.playClick();
                    initGameMode();
                    initGame();
                }
            });

            updateDifficultyPreview(1);
            setTimeLimit(30);
        }

        const toggleDifficultyBtn = document.getElementById('toggleDifficultyBtn');
        const difficultySection = document.getElementById('difficultySection');
        toggleDifficultyBtn.addEventListener('click', function() {
            AudioFX.playClick();
            if (difficultySection.style.display === 'none' || difficultySection.style.display === '') {
                difficultySection.style.display = 'block';
                toggleDifficultyBtn.textContent = '收起难度设置';
            } else {
                difficultySection.style.display = 'none';
                toggleDifficultyBtn.textContent = '难度设置';
            }
        });

        const toggleRulesBtn = document.getElementById('toggleRulesBtn');
        const rulesSection = document.getElementById('rulesSection');
        toggleRulesBtn.addEventListener('click', function() {
            AudioFX.playClick();
            if (rulesSection.style.display === 'none' || rulesSection.style.display === '') {
                rulesSection.style.display = 'block';
                toggleRulesBtn.textContent = '收起游戏规则';
            } else {
                rulesSection.style.display = 'none';
                toggleRulesBtn.textContent = '游戏规则';
            }
        });

        startBtn.addEventListener('click', () => {
            AudioFX.init();
            startGame();
        });

        giveupBtn.addEventListener('click', () => {
            AudioFX.playClick();
            giveUpGame();
        });

        window.addEventListener('load', () => {
            initTheme();
            initGameMode();
            initGame();
            initDifficultySelector();

            const themeNames = ['经典', '酷洛米', '深海柔白', '藤萝绿意', '茶花无白', '清水捣蓝'];
            showNotification(`当前主题：「${themeNames[gameState.currentTheme]}」`);
        });

        window.addEventListener('resize', debounce(() => {
            if (gameState.isPlaying && !gameState.isProcessing) generateColorGrid();
        }, 500));

        document.addEventListener('click', () => AudioFX.init(), { once: true });
