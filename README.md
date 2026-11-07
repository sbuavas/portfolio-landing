# Portfólio - landing page

Atividade 4 e 5 do curso Dev. Full Stack Jr. (+praTI / Codifica): site simples com HTML, CSS e JavaScript.

Site no ar: https://sbuavas.github.io/portfolio-landing/

## O que tem na página

- cabeçalho com nome e menu
- slogan e botão "Fale comigo", que rola até o formulário e dá foco no campo de nome (JS)
- seção sobre e cards de projetos
- formulário de contato com nome, e-mail, CEP e mensagem
- consulta à API ViaCEP ao sair do campo CEP, preenchendo cidade e UF
- validação dos campos obrigatórios e mensagem de agradecimento depois do envio (sem backend, é só front)

Paleta: fundo claro, azul petróleo (#1f4e5f) como cor principal e laranja (#e07a2f) no botão de ação. Fontes Sora para títulos e Inter para o texto.

## Branches

- `main`: versão publicada
- `develop`: onde vou mexendo antes de subir para a main

## Rodar local

Não precisa de nada além de um navegador: abre o `index.html`. Para a ViaCEP funcionar sem bloqueio de CORS em alguns navegadores, vale servir com `python3 -m http.server` e acessar `http://localhost:8000`.
