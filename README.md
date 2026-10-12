# AURA Travel

**Viagens que viram histórias.**

AURA Travel é um website demonstrativo de uma agência de turismo fictícia, desenvolvido para apresentar uma experiência de navegação elegante, intuitiva e focada na descoberta de destinos. O projeto combina uma identidade visual premium com funcionalidades reais, usando apenas HTML, CSS e JavaScript Vanilla.

Criado como peça de portfólio, o site serve para demonstrar serviços de desenvolvimento front-end, apresentar uma proposta digital para agências de turismo e oferecer uma base personalizável para futuros projetos comerciais.

> Marca, preços, roteiros e depoimentos são fictícios. As imagens são ilustrações geradas por IA. O site não realiza reservas, pagamentos ou envio automático de solicitações.

## Sobre a experiência

A navegação começa com um hero de imagens imersivas e segue por um catálogo de destinos, experiências de viagem, apresentação da marca, depoimentos ilustrativos, perguntas frequentes e um formulário de planejamento.

A proposta é dar protagonismo às paisagens e ao conteúdo, com composição editorial, espaços equilibrados e interações discretas. O desenvolvimento segue uma abordagem mobile-first, com layouts adaptados a celulares, tablets e desktops.

## Funcionalidades

- **Hero com slider:** reprodução automática, setas, indicador da imagem atual e controle de pausa. Respeita movimento reduzido e pausa quando a aba fica oculta.
- **Catálogo de destinos:** Fernando de Noronha, Santorini, Alpes Suíços, Costa Italiana, Maldivas e Paris, com descrição, categoria, duração e preço ilustrativo.
- **Busca e filtros:** pesquisa sem distinção de maiúsculas ou acentos, filtros por praias, aventura, cultura e romance, indicadores dos filtros ativos e mensagem para buscas sem resultados.
- **Favoritos persistentes:** destinos salvos no navegador com localStorage, contador e visualização exclusiva de favoritos. Podem ser combinados com busca e estilo de viagem.
- **Detalhes em modal:** imagem ampliada, informações do destino e encaminhamento ao formulário com o destino já selecionado.
- **Experiências editoriais:** natureza, cultura e aventura, com links para categorias relevantes do catálogo.
- **Menu responsivo:** fundo inerte durante a abertura, controle de foco, navegação por teclado e fechamento por Escape.
- **FAQ:** perguntas e respostas em accordions nativos com suporte a teclado e toque.
- **Solicitação de orçamento:** validação de nome, data e quantidade de viajantes, geração de uma mensagem e opção de copiar o texto.
- **WhatsApp opcional:** link com mensagem preenchida, disponível somente após configurar um número autorizado.

## Identidade visual

A direção visual utiliza azul-marinho, turquesa, off-white e detalhes dourados, com a tipografia **Manrope** nos títulos e **DM Sans** nos textos e controles.

| Cor | Código | Aplicação |
| --- | --- | --- |
| Azul-marinho | `#102B3F` | Identidade, títulos e seções de destaque |
| Turquesa | `#17B8B0` | Ações principais e detalhes visuais |
| Azul escuro | `#091E2C` | Rodapé e fundos profundos |
| Branco | `#FFFFFF` | Superfícies e contraste |
| Off-white | `#F5F7F8` | Alternância entre seções |
| Dourado | `#F4B860` | Detalhes da paleta |

O projeto inclui oito imagens distintas, inspiradas nos destinos e na ideia de viajar com presença. Elas estão armazenadas localmente em WebP, com versões menores para os cards e fallback gráfico para falhas de carregamento. São representações ilustrativas, sem fidelidade documental garantida a paisagens, hotéis ou serviços reais.

As fontes também são locais, em WOFF2, obtidas pelo Fontsource 5.3.0 a partir do catálogo Google Fonts. Suas licenças OFL estão incluídas em `assets/fonts/`. Não há dependência de serviços externos para carregar imagens ou fontes.

## Tecnologias e arquitetura

- HTML5 semântico.
- CSS3 com variáveis, Grid, Flexbox e media queries.
- JavaScript ES6+ Vanilla.
- SVG para ícones e identidade da marca.
- localStorage para os identificadores dos favoritos.
- Intersection Observer para animações de entrada.
- `<dialog>` para detalhes dos destinos e `<details>` para perguntas frequentes.
- Configuração para hospedagem estática na Vercel.

A aplicação não utiliza frameworks, backend ou dependências de execução e não exige etapa de build.

```text
AURA-Travel/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── favicon.svg
│   ├── image-fallback.svg
│   ├── fonts/
│   └── images/
├── tests/
│   ├── site.cjs
│   └── accessibility.cjs
├── README.md
├── VALIDATION.md
└── vercel.json
```

