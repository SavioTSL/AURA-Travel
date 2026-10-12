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

## Executar localmente

Na raiz do repositório, inicie um servidor HTTP:

```sh
python3 -m http.server 8000
```

Abra **http://localhost:8000** no navegador. Para encerrar o servidor, pressione `Ctrl+C` no terminal.

Também é possível abrir `index.html` diretamente, mas o servidor local é recomendado para testar o comportamento do site e a área de transferência. A cópia automática depende de um contexto seguro, como HTTPS ou localhost, e da permissão do navegador; quando indisponível, o texto pode ser selecionado para cópia manual.

## Personalizar o projeto

| Arquivo ou pasta | O que modificar |
| --- | --- |
| `index.html` | Textos, seções, navegação e metadados de SEO |
| `css/style.css` | Paleta, tipografia, espaçamento, layouts e animações |
| `js/script.js` | Array `destinations`, categorias, valores, detalhes e contato |
| `assets/images/` | Imagens dos destinos e seções |
| `assets/fonts/` | Fontes locais e suas licenças |
| `assets/favicon.svg` | Símbolo exibido na aba do navegador |

Os destinos estão organizados no array `destinations`, com identificador, nome, localização, categoria, duração, preço, imagem, texto alternativo, descrição e detalhes. Ao alterar as imagens, mantenha os caminhos e as variantes de resolução consistentes com a função `imageURL`.

Para adaptar a demonstração a uma agência real, substitua o conteúdo fictício por informações verificadas, imagens adequadas e condições comerciais próprias.

### Configurar WhatsApp

Em `js/script.js`, a configuração começa desativada:

```js
const WHATSAPP_NUMBER = "";
```

Preencha somente com um **número autorizado**, incluindo código do país e DDD, composto por 10 a 15 dígitos, sem espaços, sinal `+` ou pontuação. Não use um número inventado.

Sem número configurado, o formulário oferece apenas a cópia da mensagem. Com um número válido, o site apresenta um link para abrir o WhatsApp com o texto preenchido; o visitante ainda precisa confirmar o envio no serviço externo.

## Privacidade e acessibilidade

Os dados do formulário não são armazenados pelo site nem enviados automaticamente. Apenas os identificadores dos destinos favoritos são mantidos no navegador. Não há analytics, cadastro ou processamento de pagamentos.

O site inclui labels nos campos, nomes acessíveis nos botões, textos alternativos nas imagens, link para pular ao conteúdo, estados de foco, controle de teclado nos modais e menu, além de suporte a `prefers-reduced-motion`.

Esses recursos e a auditoria automatizada não substituem uma avaliação completa com leitores de tela e aparelhos reais.

## Testes e validação

Os testes disponíveis usam **Playwright** e **axe-core**, exclusivamente como ferramentas de desenvolvimento. Eles não são necessários para executar ou publicar a aplicação.

A revisão realizada verificou perfis emulados de iPhone SE, iPhone 13, Pixel 7, iPad e desktop no Chromium, incluindo layout, filtros, favoritos e navegação por teclado. A auditoria automatizada terminou sem violações nos estados desktop, mobile, modal e menu aberto.

Safari/WebKit e aparelhos físicos ainda não foram validados. Há verificações de contraste sobre fotografias que exigem revisão humana. Consulte [VALIDATION.md](VALIDATION.md) para os resultados completos, limitações e comandos para repetir os testes.

## Publicar na Vercel

1. Importe este repositório na Vercel.
2. Selecione **Other** como preset do projeto.
3. Deixe os comandos de instalação e build vazios.
4. Defina `.` como diretório de saída.
5. Revise as configurações e publique pelo painel.

O arquivo `vercel.json` prepara a hospedagem estática. Depois de definir o endereço público, revise os metadados de compartilhamento e valide o site no domínio final.

## Finalidade do projeto

AURA Travel é uma demonstração profissional de interface e desenvolvimento front-end. Sua finalidade é mostrar como uma agência de turismo pode apresentar destinos e receber intenções de viagem em uma experiência digital clara e visualmente cuidada.

Não representa uma agência em operação, uma oferta comercial ou uma plataforma de reservas.
