
# 🏀 Sistema de Controle de Partidas de Basquete

Sistema completo para gerenciamento de partidas de basquete com painel de controle remoto em tempo real.

---

## 📌 Recursos Principais

- ⏱️ **Temporizador de quarto** com 12 minutos por período  
- 🔴 **Shot Clock** de 24/14 segundos com precisão em centésimos nos últimos 10s  
- 🔄 **Reset automático** do Shot Clock ao trocar a posse de bola  
- 🏀 **Controle completo de jogo**, incluindo pontuação, posse e cronômetro  
- 📊 **Placar eletrônico** com exibição para dois times  
- 📱 **Telas separadas** para exibição (display) e controle (painel de comando)  
- ⚡ **Atualização em tempo real** via WebSocket

---

## 🚀 Instalação e Execução

### ✅ Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)  
- Navegador moderno (Chrome, Firefox, Edge)

### 📦 Passo a passo

1. Clone o repositório:
   ```bash
   git clone https://github.com/Ranixx1/temporizadorNba.git
   ```
2. Acesse a pasta do projeto:
   ```bash
   cd temporizadorNba
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```

### 🌐 Acesso às Telas

- **Display (visor):** [http://localhost:3000/display.html](http://localhost:3000/display.html)  
- **Controle:** [http://localhost:3000/control.html](http://localhost:3000/control.html)

---

## 🎮 Manual de Controles

### 🕹️ Controles Gerais

| Botão            | Função                        |
|------------------|-------------------------------|
| ▶️ Iniciar Jogo  | Inicia todos os temporizadores |
| ⏸️ Pausar Jogo   | Pausa todos os temporizadores  |
| 🔄 Novo Quarto   | Avança para o próximo quarto   |

### ⏲️ Controle do Shot Clock

| Botão             | Função                                  |
|-------------------|------------------------------------------|
| 24s               | Reseta o shot clock para 24 segundos     |
| 14s               | Reseta o shot clock para 14 segundos     |
| ⏱️ Violação 8s    | Marca violação e troca a posse de bola   |

### 🧮 Pontuação

| Ação       | Time A | Time B |
|------------|--------|--------|
| +1 Ponto   | ✅ Add 1 | ✅ Add 1 |
| +2 Pontos  | ✅ Add 2 | ✅ Add 2 |
| +3 Pontos  | ✅ Add 3 | ✅ Add 3 |
| -1 Ponto   | ✅ Remove 1 | ✅ Remove 1 |

---

## 🖥️ Telas do Sistema

### 🔵 **Display Principal**

- Visor grande para o Shot Clock (24s)
- Temporizador do quarto (12:00)
- Placar de pontuação dos times
- Indicação de posse de bola
- Efeitos visuais nos últimos segundos

### 🎛️ **Painel de Controle**

- Interface amigável e responsiva
- Botões grandes e de fácil acesso
- Feedback visual em tempo real

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript  
- **Backend:** Node.js, Express, WebSocket  
- **Design:** Interface otimizada para visibilidade e usabilidade

---

## 📂 Estrutura de Arquivos

```
temporizadorNba/
├── public/               # Arquivos do frontend
│   ├── display.html      # Tela de exibição
│   ├── control.html      # Painel de controle
│   └── assets/           # Recursos estáticos
│       └── fonts/        # Fontes personalizadas
├── server.js             # Lógica do servidor Node.js
├── package.json          # Gerenciador de dependências
├── README.md             # Documentação do projeto
└── .gitignore            # Arquivos ignorados no Git
```

---

## 🎨 Personalização

- **Tempo dos quartos:** edite a variável `gameTime` no arquivo `server.js`
- **Cores e estilos:** modifique as variáveis CSS no arquivo `display.html`
- **Comportamento do jogo:** ajuste as funções em `updateGameState()`

---

## ⁉️ Solução de Problemas

| Problema                          | Solução                                                                 |
|----------------------------------|-------------------------------------------------------------------------|
| ❌ Conexão não estabelecida       | Verifique se o servidor está rodando e recarregue as páginas            |
| 🔤 Fontes não carregam            | Confirme se o caminho para as fontes está correto no CSS                |
| 🕹️ Comandos não funcionam        | Reinicie o servidor e verifique o console do navegador (F12)           |

---

## 💡 Contribuições

Sinta-se à vontade para abrir *issues* ou enviar *pull requests* com melhorias, correções ou sugestões!

---

