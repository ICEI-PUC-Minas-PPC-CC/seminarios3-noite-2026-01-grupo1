# 02 — Documento de Requisitos do Software

> **Grupo:** Danthe, Isabela, Laura, Luis, Thiago  
> **Aplicação:** Cidade dos Valores  
> **Comunidade:** Centro Municipal de Atendimento Educacional Especializado Dr. Tarso de Coimbra

---

## 1. Visão Geral

A aplicação é um jogo de navegador baseado em decisões, no qual o jogador administra uma cidade e aprende sobre valores como respeito, paciência e gentileza por meio das consequências de suas escolhas. Ela é destinada principalmente a estudantes do Tarso de Coimbra e ao público jovem em contexto educacional. O projeto busca promover a reflexão ética e social, além de contribuir para a inclusão ao ensinar conceitos também em LIBRAS.

### 1.1. Objetivos do Projeto

#### Objetivo Geral
Desenvolver uma aplicação web gamificada e interativa voltada ao ensino de valores éticos e de cidadania para os alunos do Centro Municipal de Atendimento Educacional Especializado Dr. Tarso de Coimbra, garantindo acessibilidade universal e autonomia para a comunidade surda e com deficiência auditiva.

#### Objetivos Específicos
1. **Fomentar a Educação em Valores:** Criar dinâmicas de jogo baseadas em escolhas cotidianas que permitam aos alunos compreender o impacto de atitudes éticas (como empatia, respeito, tolerância e paciência) no convívio social.
2. **Estimular a Comunicação e Vocabulário em Libras:** Integrar mídias visuais e referências em Língua Brasileira de Sinais (Libras) associadas aos conceitos éticos apresentados, auxiliando o processo pedagógico bilíngue da instituição.
3. **Assegurar Acessibilidade e Autonomia:** Implementar uma interface inteiramente voltada à acessibilidade auditiva, eliminando barreiras de comunicação e dependência de áudio, com feedbacks exclusivamente visuais e táteis (se compatível).
4. **Promover a Inclusão Digital e Social:** Oferecer uma ferramenta lúdico-pedagógica simplificada e atrativa que estimule a inserção tecnológica dos alunos e promova momentos de descontração e aprendizagem compartilhada com seus familiares e educadores.
5. **Entregar uma Interface Intuitiva e Responsiva:** Projetar um layout responsivo (adaptado para diferentes telas) que minimize a carga cognitiva e priorize ícones e guias visuais, adequado ao nível de letramento tecnológico do público.

## 2. Público-Alvo

| Campo | Informação |
| ------- | ----------- |
| Perfil dos usuários | Estudantes e membros da comunidade escolar do Centro Dr. Tarso de Coimbra |
| Faixa etária | A partir de 12 anos (podendo englobar outras idades conforme orientação pedagógica) |
| Necessidades de acessibilidade | Deficiência auditiva e surdez (usuários de Libras e/ou com desafios no letramento em Português escrito) |
| Nível de familiaridade com tecnologia | Baixo a moderado (necessitam de interfaces de simples navegação) |

### 2.1. Descrição Detalhada do Público-Alvo

O público-alvo prioritário deste projeto é composto pelos alunos assistidos pelo **Centro Municipal de Atendimento Educacional Especializado Dr. Tarso de Coimbra** em Poços de Caldas - MG, que apresenta as seguintes particularidades:

* **Características Linguísticas e Cognitivas:** Muitos alunos utilizam a Língua Brasileira de Sinais (Libras) como sua língua de instrução principal (L1), estando em fases variadas de aprendizado e consolidação da língua escrita (L2). Por isso, textos excessivamente longos ou vocábulos complexos podem se tornar barreiras.
* **Barreiras Sensoriais:** Dada a presença de deficiência auditiva e surdez, qualquer feedback sonoro (como efeitos de acerto/erro, música ou instruções faladas) é ineficaz se não for traduzido para estímulos visuais claros (cores vivas, animações, luzes, ícones e gestos em Libras).
* **Familiaridade Tecnológica:** Por possuírem pouca familiaridade com sistemas complexos de navegação em computadores de mesa, necessitam de um sistema com mecânica simplificada (ex: navegação baseada puramente em cliques no mouse ou toques na tela), com botões amplos e fluxos lineares de decisão.
* **Público Secundário (Apoio):** Professores, intérpretes de Libras e familiares dos alunos, que atuarão como facilitadores e também se beneficiarão de uma ferramenta que integre a diversão em família com o aprendizado de atitudes éticas.

## 3. Requisitos Funcionais

| ID | Requisito | Prioridade | Origem da demanda |
| ---- | ---------- | :----------: | ------------------ |
| RF01 | Deve ser interativa com alta responsividade (respostas rápidas e claras para as ações do jogador) | Alta | 06/03/2026 |
| RF02 | A aplicação deve armazenar o progresso do jogador | Alta | 06/03/2026 |
| RF03 | A interação do jogador deve poder ser feita através apenas do mouse | Alta | 06/03/2026 |
| RF04 | | | |
| RF05 | | | |

## 4. Requisitos Não Funcionais

| ID | Requisito | Categoria |
| ---- | ---------- | ----------- |
| RNF01 | A aplicação deve ser acessível via navegador web | Acessibilidade |
| RNF02 | A interface deve ser simples e intuitiva | Usabilidade |
| RNF03 | A aplicação não deve utilizar muitos textos | Acessibilidade |
| RNF04 | Responsividade em ações através de cores, luzes, animações | Acessibilidade/Usabilidade|
| RNF05 | O jogo deve ser divertido e educativo | Usabilidade |

## 5. Requisitos de Acessibilidade

- [x] Interface predominantemente visual (ícones, cores, imagens)
- [x] Textos curtos e objetivos
- [x] Botões grandes e identificáveis
- [x] Contraste adequado de cores
- [x] Compatível com Libras (se aplicável: vídeos, sinais, glossário)
- [x] Sem dependência de áudio para funcionalidades essenciais
- [ ] Outro: *(especificar)*

## 6. Tecnologias Escolhidas

| Componente | Tecnologia |
| ----------- | ----------- |
| Front-end | Html, React |
| Back-end (se houver) | JavaScript |
| Banco de dados (se houver) | | postgres/ sql
| Hospedagem | Vercel|
| Outras ferramentas | |

## 7. Protótipo / Wireframes
Link para o protótipo no FIGMA: [https://www.figma.com/site/S3FYxBOoaMfQRjlPZhATwd/Cidade-dos-Valores?node-id=0-1&t=6KiUvBa9pWZAU9w9-1](https://www.figma.com/design/7tpByZal4Jt8uEVH07c7CM/Cidade-dos-Valores?node-id=0-1&t=CvdSTD1YKlGOukwY-1)

## 8. Escopo Mínimo Viável (MVP)

(Quais funcionalidades compõem a versão mínima que pode ser entregue à comunidade?)

- [x] Aplicação Web interativa, retratando Valores.
- [x] Acessibilidade para Deficiência Auditiva/Surdez.
- [x] Exemplos em Libras dentro da aplicação.

## 9. Funcionalidades Desejáveis (se houver tempo)

- Sistema de pontuação do jogador
- Armazenamento de dados na nuvem
- localstorage de segundo plano
