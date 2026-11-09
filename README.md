# Portfólio - landing page

Atividade 4 e 5 do curso Dev. Full Stack Jr. (+praTI / Codifica): site simples com HTML, CSS e JavaScript.

Site no ar: https://sbuavas.github.io/portfolio-landing/

## O que tem na página

- cabeçalho fixo com menu, que ganha fundo ao rolar, e menu de tela cheia no celular
- hero com foto, slogan, botão "Ver projetos" e botão "Fale comigo", que rola até o formulário e dá foco no campo de nome (JS)
- barra de números, seção sobre, faixa animada de tecnologias (marquee), cards de projetos, stack por grupo e linha do tempo
- tema escuro e claro, com a escolha salva no navegador
- formulário de contato com nome, e-mail, CEP e mensagem
- consulta à API ViaCEP ao sair do campo CEP, preenchendo cidade e UF
- validação dos campos obrigatórios e mensagem de agradecimento depois do envio (sem backend, é só front)
- animação de entrada das seções com IntersectionObserver

Paleta: fundo quase preto (#0a0a0a), superfície #141414, texto #f5f5f5 e verde-limão (#e8ff4d) como cor de destaque. No tema claro o destaque vira #7acc00. Fontes Syne para títulos, DM Sans para o texto e JetBrains Mono para rótulos e tags.

## Branches

- `main`: versão publicada
- `develop`: onde vou mexendo antes de subir para a main

## Rodar local

Não precisa de nada além de um navegador: abre o `index.html`. Para a ViaCEP funcionar sem bloqueio de CORS em alguns navegadores, vale servir com `python3 -m http.server` e acessar `http://localhost:8000`.
