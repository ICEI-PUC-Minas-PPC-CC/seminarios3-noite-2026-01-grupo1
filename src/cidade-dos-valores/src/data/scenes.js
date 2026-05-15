// dados de cenas da Cidade dos Valores

const SCENES = [
  // CENA 0: 
  {
    id: 0,
    phase: 0,
    location: "Boas-Vindas",
    type: "welcome",
    background: null,
    steps: [
      {
        type: "dialogue",
        text: "Bem-vindo à Cidade dos Valores!",
        subtext: "Escolha seu personagem, responda corretamente e chegue até o Cristo Redentor. Cuidado: 3 erros e você volta ao início!",
        showRules: true,
      },
      {
        type: "character_select",
        text: "Escolha seu personagem para começar a jornada!",
      }
    ]
  },

  // CENA 1:
  {
    id: 1,
    phase: 1,
    location: "Escola Tarso de Coimbra",
    type: "scene",
    background: "escola",
    steps: [
      {
        type: "dialogue",
        character: true,
        text: "Bom dia! Qual o seu nome?",
        librasSign: "bom-dia",
      },
      {
        type: "name_input",
        text: "Digite seu nome para se apresentar:",
      },
      {
        type: "dialogue",
        character: true,
        textTemplate: "Prazer, {playerName}! Vamos passear pela cidade?",
        librasSign: "prazer",
      }
    ]
  },

  // CENA 2: joao pioner
  {
    id: 2,
    phase: 2,
    location: "Rua João Pinheiro",
    type: "scene",
    background: "joao-pinheiro",
    steps: [
      {
        type: "dialogue",
        character: true,
        text: "Olha! Estamos na Rua João Pinheiro. O semáforo está vermelho para pedestres!",
        librasSign: "atencao",
      },
      {
        type: "libras_quiz",
        text: "Qual é o sinal correto? Escolha o sinal de ESPERAR:",
        options: [
          { id: 0, label: "ANDAR", emoji: "🚶", correct: false },
          { id: 1, label: "ESPERAR", emoji: "✋", correct: true },
          { id: 2, label: "CORRER", emoji: "🏃", correct: false },
        ],
        feedback: {
          correct: "Muito bem! Devemos ESPERAR o sinal verde para atravessar com segurança!",
          wrong: "Cuidado! O correto é ESPERAR. Respeitar o semáforo salva vidas!",
        },
        moral: "Respeito às leis de trânsito e paciência.",
        points: 15,
      }
    ]
  },

  // CENA 3: Complexo Cultural Urca
  {
    id: 3,
    phase: 3,
    location: "Complexo Cultural Urca",
    type: "scene",
    background: "urca",
    steps: [
      {
        type: "dialogue",
        character: true,
        text: "Aqui tem livros e arte! É um lugar de todos.",
        librasSign: "cultura",
      },
      {
        type: "dialogue",
        character: true,
        text: "Olha! Alguém deixou uma carteira cair no chão...",
      },
      {
        type: "choice",
        text: "O que devemos fazer com a carteira?",
        options: [
          { id: 0, label: "A) Deixar no chão", correct: false, feedback: "Deixar no chão não ajuda ninguém..." },
          { id: 1, label: "B) Pegar para mim", correct: false, feedback: "Isso não é certo! A carteira não é sua." },
          { id: 2, label: "C) Devolver ao dono", correct: true, feedback: "Parabéns! Honestidade é um valor muito importante!" },
        ],
        correctLibras: "parabens",
        points: 15,
      }
    ]
  },

  // CENA 4: 
  {
    id: 4,
    phase: 4,
    location: "Relógio Floral",
    type: "scene",
    background: "relogio-floral",
    steps: [
      {
        type: "dialogue",
        character: true,
        text: "Que lindo o Relógio Floral! Preciso saber a hora para não perder o bondinho.",
      },
      {
        type: "drag_drop",
        textParts: [
          { type: "text", value: "Você pode me dizer as horas, " },
          { type: "drop", id: "slot1", answer: "POR FAVOR" },
          { type: "text", value: "? Muito " },
          { type: "drop", id: "slot2", answer: "OBRIGADO" },
          { type: "text", value: "!" },
        ],
        words: ["POR FAVOR", "OBRIGADO"],
        feedback: {
          correct: "Perfeito! Palavras mágicas fazem toda a diferença!",
          wrong: "Tente novamente! Use POR FAVOR e OBRIGADO nos lugares certos.",
        },
        points: 20,
      }
    ]
  },

  // CENA 5: 
  {
    id: 5,
    phase: 5,
    location: "Praça Pedro Sanches",
    type: "scene",
    background: "praca",
    steps: [
      {
        type: "dialogue",
        character: true,
        text: "A Praça Pedro Sanches é linda! Mas olha... um papel de bala caiu no chão.",
      },
      {
        type: "choice",
        text: "O que devemos fazer com o papel de bala?",
        options: [
          { id: 0, label: "A) Ignorar", correct: false, feedback: "Não podemos ignorar! A cidade é de todos." },
          { id: 1, label: "B) Recolher o lixo", correct: true, feedback: "Muito bem! Cuidar do meio ambiente é um dever de todos!" },
          { id: 2, label: "C) Jogar em alguém", correct: false, feedback: "Isso é errado e desrespeitoso!" },
        ],
        points: 15,
      },
      {
        type: "recycle_minigame",
        text: "Agora, jogue o papel na lixeira correta!",
        correctBin: "blue",
        bins: [
          { id: "blue", label: "Papel", color: "#3498db", emoji: "📄" },
          { id: "red", label: "Plástico", color: "#e74c3c", emoji: "🥤" },
          { id: "yellow", label: "Metal", color: "#f1c40f", emoji: "🥫" },
          { id: "green", label: "Vidro", color: "#2ecc71", emoji: "🍾" },
        ],
        feedback: {
          correct: "Parabéns! Papel vai na lixeira AZUL! ♻️",
          wrong: "Ops! Papel de bala vai na lixeira AZUL (Papel).",
        },
        points: 15,
      }
    ]
  },

  // CENA 6: Bondinho ao Cristo cena final 
  {
    id: 6,
    phase: 6,
    location: "Bondinho → Cristo Redentor",
    type: "scene",
    background: "bondinho",
    steps: [
      {
        type: "dialogue",
        character: true,
        text: "Chegamos na estação do teleférico! A fila está grande.",
      },
      {
        type: "libras_quiz",
        text: "Para entrar no bondinho, mostre que você sabe o sinal de RESPEITO:",
        options: [
          { id: 0, label: "BRINCAR", emoji: "🎮", correct: false },
          { id: 1, label: "RESPEITO", emoji: "🤝", correct: true },
          { id: 2, label: "GRITAR", emoji: "📢", correct: false },
        ],
        feedback: {
          correct: "Excelente! RESPEITO é fundamental na convivência!",
          wrong: "Tente novamente! O sinal correto é RESPEITO.",
        },
        points: 20,
      },
      {
        type: "finale",
        text: "Nossa cidade é linda, e fica ainda mais bonita quando praticamos valores e respeitamos a todos!",
        subtext: "Parabéns por completar a jornada pela Cidade dos Valores! 🎉",
      }
    ]
  },
];

export default SCENES;
