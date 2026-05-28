# 📂 Código-Fonte da Aplicação

> Coloque aqui o código-fonte do software desenvolvido pelo grupo.

---

## Informações do Projeto

| Campo | Informação |
|-------|-----------|
| Nome da aplicação | *Cidade dos Valores* |
| Tecnologias utilizadas | *Vercel, HTML5, JavaScript, React* |
| URL em produção | *https://cidadedosvalores.vercel.app* |

## Como Executar Localmente

```bash
# 1. Clone o repositório
git clone <https://github.com/ICEI-PUC-Minas-PPC-CC/seminarios3-noite-2026-01-grupo1.git>

# 2. Instale as dependências
npm install

# 3. Execute a aplicação
npm build
npm run dev
```

## Estrutura do Código

```
src/
├── assets/
│   ├── characters/
│   ├── images/
│   ├── libras/
├── components/
│   ├── game/
│   ├── layout/
│   ├── libras/
│   ├── ui/
├── contexts/
├── data/
├── hooks/
├── images/
│   ├── characters/
│   ├── libras/
├── pages/
├── services/
├── styles/
├── App.css
├── App.jsx
├── config.js
├── index.css
├── main.jsx
└── README.md
```

## Deploy

*A aplicação foi hospedada na plataforma Vercel através de um fluxo contínuo e automatizado integrado diretamente ao GitHub. Cada vez que uma atualização é enviada para o repositório, a Vercel detecta a mudança, compila o código e realiza o deploy de forma transparente. A arquitetura do projeto foi dividida de maneira inteligente: toda a interface visual (frontend) é distribuída globalmente por uma rede de entrega rápida (Edge Network) para garantir carregamentos instantâneos, enquanto as rotas de código e lógica de negócio (backend) foram convertidas em funções serverless, que rodam de forma isolada e sob demanda apenas quando recebem requisições, eliminando a necessidade de gerenciar ou manter um servidor web ligado a todo momento.*
