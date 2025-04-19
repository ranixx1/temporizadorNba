Sistema completo para controle de partidas de basquete com painel de controle remoto.

📌 Recursos Principais

    ⏱️ Temporizador de quarto (12 minutos)
    
    🔴 Shot clock (24/14 segundos) com centésimos nos últimos 10s
    
    🔄 Reset automático para 24 segundos com troca de posse
    
    🏀 Controle completo de todas as situações de jogo
    
    📊 Placar eletrônico com pontuação por time
    
    📱 Telas separadas para display e controle
    
    ⚡ Conexão em tempo real via WebSocket

🚀 Como Instalar e Executar
Pré-requisitos
Node.js (v16 ou superior)

Navegador moderno (Chrome, Firefox, Edge)

Passo a Passo
Clone o repositório:

bash
git clone https://github.com/Ranixx1/temporizadorNba.git
Acesse a pasta do projeto:

bash
cd temporizadorNba
Instale as dependências:

bash
npm install
Inicie o servidor:

bash
npm start


Acesse as telas:

    Display: http://localhost:3000/display.html
    Controle: http://localhost:3000/control.html


🎮 Manual de Controles
      Controles Gerais
      Botão	Função
      ▶️ Iniciar Jogo	Inicia todos os temporizadores
      ⏸️ Pausar Jogo	Pausa todos os temporizadores
      🔄 Novo Quarto	Avança para o próximo quarto (1º-4º)
      Controle do Shot Clock
      Botão	Função
      24s	Reseta para 24 segundos
      14s	Reseta para 14 segundos
      ⏱️ Violação 8s	Marca violação e troca posse
      Pontuação
      Botão	Time A	Time B
      +1 Ponto	✅ Add 1	✅ Add 1
      +2 Pontos	✅ Add 2	✅ Add 2
      +3 Pontos	✅ Add 3	✅ Add 3
      -1 Ponto	✅ Remove 1	✅ Remove 1


🖥️ Telas do Sistema
 Display Principal

      Display
      
      Visor grande do shot clock (24s)
      
      Temporizador do quarto (12:00)
      
      Placar dos times
      
      Indicação de posse de bola
      
      Efeitos visuais quando o tempo está acabando
      
      Painel de Controle
      Controle
      
      Controles completos do jogo
      
      Botões grandes para fácil acesso
      
      Feedback visual das ações


🛠️ Tecnologias Utilizadas

  Frontend: HTML5, CSS3, JavaScript
  
  Backend: Node.js, Express, WebSocket
  
  Design: Interface otimizada para visibilidade

📂 Estrutura de Arquivos
        temporizadorNba/
        ├── public/               # Arquivos frontend
        │   ├── display.html      # Tela principal
        │   ├── control.html      # Painel de controle
        │   └── assets/           # Recursos estáticos(caso queira escolher outra fonte)
        │       └── fonts/        # Fontes personalizadas(caso dejese)
        ├── server.js             # Servidor backend
        ├── package.json          # Dependências
        ├── README.md             # Documentação
        └── .gitignore            # Arquivos ignorados
        

🔧 Personalização

      Para alterar configurações:
      
      Tempo dos quartos: Modifique gameTime no server.js
      
      Cores: Edite as variáveis CSS no display.html
      
      Comportamento: Ajuste as funções em updateGameState()
      
⁉️ Solução de Problemas
  
      Problema: Conexão não estabelecida
      Solução: Verifique se o servidor está rodando e recarregue as páginas
      
      Problema: Fontes não carregam
      Solução: Verifique o caminho das fontes no CSS
      
      Problema: Comandos não respondem
      Solução: Reinicie o servidor e verifique o console do navegador (F12)
