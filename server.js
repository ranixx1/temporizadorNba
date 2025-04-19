const express = require('express');
const WebSocket = require('ws');
const path = require('path');

// Configuração do servidor
const app = express();
const PORT = 3000;

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'display.html'));
});

// Inicia servidor HTTP
const server = app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// Configuração WebSocket
const wss = new WebSocket.Server({ server });

// Estado do jogo
let gameState = {
    gameTime: 12 * 60,      // 12 minutos em segundos
    shotClock: 24,          // Shot clock (24 segundos)
    milliseconds: 0,        // Centésimos de segundo (00-99)
    activeTeam: 'A',        // Time com posse
    scoreA: 0,              // Pontuação Time A
    scoreB: 0,              // Pontuação Time B
    quarter: 1,             // Quarto atual (1-4)
    isGameRunning: false,   // Jogo em andamento
    isShotClockRunning: false, // Shot clock em andamento
    lastUpdate: Date.now()  // Última atualização
};

// Clientes conectados
let displayClient = null;
let controlClient = null;

// Conexão WebSocket
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        try {
            const msg = JSON.parse(message);
            
            // Identifica tipo de cliente
            if (msg.type === 'display') {
                displayClient = ws;
                ws.send(JSON.stringify(gameState));
                return;
            } else if (msg.type === 'control') {
                controlClient = ws;
                return;
            }
            
            // Processa comandos
            handleCommand(msg.command, msg.value);
            
        } catch (error) {
            console.error('Erro ao processar mensagem:', error);
        }
    });

    ws.on('close', () => {
        if (ws === displayClient) displayClient = null;
        if (ws === controlClient) controlClient = null;
    });
});

// Atualiza estado do jogo
function updateGameState() {
    const now = Date.now();
    const delta = now - gameState.lastUpdate;
    gameState.lastUpdate = now;
    
    // Atualiza tempo do jogo
    if (gameState.isGameRunning) {
        gameState.gameTime -= delta / 1000;
        if (gameState.gameTime <= 0) {
            gameState.gameTime = 0;
            gameState.isGameRunning = false;
        }
    }
    
    // Atualiza shot clock (com centésimos)
    if (gameState.isShotClockRunning) {
        const totalMs = gameState.shotClock * 1000 + gameState.milliseconds * 10;
        const newTotalMs = totalMs - delta;
        
        if (newTotalMs <= 0) {
            // Reinicia automaticamente para 24s e troca posse
            gameState.shotClock = 24;
            gameState.milliseconds = 0;
            gameState.activeTeam = gameState.activeTeam === 'A' ? 'B' : 'A';
            gameState.isShotClockRunning = true; // Continua contando
            gameState.lastUpdate = Date.now(); // Reinicia contagem
        } else {
            gameState.shotClock = Math.floor(newTotalMs / 1000);
            gameState.milliseconds = Math.floor((newTotalMs % 1000) / 10);
        }
    }
    
    // Envia atualização para o display
    if (displayClient && displayClient.readyState === WebSocket.OPEN) {
        displayClient.send(JSON.stringify(gameState));
    }
}

// Processa comandos
function handleCommand(command, value) {
    switch (command) {
        case 'startGame':
            gameState.isGameRunning = true;
            gameState.isShotClockRunning = true;
            gameState.lastUpdate = Date.now();
            break;
            
        case 'pauseGame':
            gameState.isGameRunning = false;
            gameState.isShotClockRunning = false;
            break;
            
        case 'nextQuarter':
            gameState.quarter = gameState.quarter < 4 ? gameState.quarter + 1 : 1;
            gameState.gameTime = 12 * 60;
            gameState.shotClock = 24; // Reseta para 24s
            gameState.milliseconds = 0;
            gameState.isGameRunning = true;
            gameState.isShotClockRunning = true; // Inicia automaticamente
            gameState.lastUpdate = Date.now();
            break;
            
        case 'startShotClock':
            gameState.isShotClockRunning = true;
            gameState.lastUpdate = Date.now();
            break;
            
        case 'pauseShotClock':
            gameState.isShotClockRunning = false;
            break;
            
        case 'resetShotClock':
            gameState.shotClock = value;
            gameState.milliseconds = 0;
            break;
            
        case 'setTeam':
            gameState.activeTeam = value;
            break;
            
        case 'violation8s':
            gameState.activeTeam = gameState.activeTeam === 'A' ? 'B' : 'A';
            gameState.shotClock = 24;
            gameState.milliseconds = 0;
            gameState.isShotClockRunning = true;
            gameState.lastUpdate = Date.now();
            break;
            
        case 'timeout':
            gameState.isGameRunning = false;
            gameState.isShotClockRunning = false;
            break;
            
        case 'addScore':
            if (value.team === 'A') {
                gameState.scoreA = Math.max(0, gameState.scoreA + value.points);
            } else {
                gameState.scoreB = Math.max(0, gameState.scoreB + value.points);
            }
            break;
            
        case 'shotMissed':
            // Não altera o shot clock
            break;
            
        case 'shotOffReb':
            gameState.shotClock = 14;
            gameState.milliseconds = 0;
            gameState.isShotClockRunning = true;
            gameState.lastUpdate = Date.now();
            break;
            
        case 'shotDefReb':
            gameState.activeTeam = gameState.activeTeam === 'A' ? 'B' : 'A';
            gameState.shotClock = 24;
            gameState.milliseconds = 0;
            gameState.isShotClockRunning = true;
            gameState.lastUpdate = Date.now();
            break;
            
        case 'outOfBounds':
        case 'foul':
            gameState.isShotClockRunning = false;
            break;
    }
    
    // Envia atualização imediata
    if (displayClient && displayClient.readyState === WebSocket.OPEN) {
        displayClient.send(JSON.stringify(gameState));
    }
}

// Atualiza a cada 16ms (~60fps)
setInterval(updateGameState, 16);

console.log(`Sistema pronto:
- Display: http://localhost:${PORT}/display.html
- Controle: http://localhost:${PORT}/control.html`);