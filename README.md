# AURA Travel

Website demonstrativo de turismo em português brasileiro, feito com HTML, CSS e JavaScript Vanilla. Marca, preços, roteiros e depoimentos fictícios. Não realiza reservas ou pagamentos.

## Executar

Na raiz do repositório:

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```

Abra `http://localhost:8000` no seu computador. Também funciona abrindo `index.html`, mas um servidor HTTP é recomendado para testar a área de transferência. Nenhuma instalação ou build é necessário.

## Personalizar

- `index.html`: conteúdo, SEO, navegação e seções.
- `css/style.css`: paleta em variáveis CSS, tipografia, layouts e animações.
- `js/script.js`: array `destinations`, preços, imagens, categorias e detalhes.
- `assets/favicon.svg`: símbolo da marca.

Imagens locais em `assets/images/`, geradas por IA para este projeto e inspiradas nos destinos, sem pretensão documental. São ilustrações: não representam hotéis, serviços ou paisagens com fidelidade garantida. WebP em duas resoluções e lazy loading fora do hero reduzem transferências. O site não depende de serviços externos para carregar suas imagens.

Manrope e DM Sans são fontes do catálogo Google Fonts, hospedadas localmente em WOFF2 via Fontsource (versão 5.3.0), com licenças OFL incluídas em `assets/fonts/`. O visual também funciona sem conexão externa. Não há alegação de parceria com destinos ou fornecedores.

## WhatsApp

O campo `WHATSAPP_NUMBER` em `js/script.js` fica vazio por padrão. Assim, o formulário apenas prepara texto para copiar. Para habilitar o link, configure **somente um número autorizado**, incluindo país e DDD, composto por 10 a 15 dígitos sem espaços, sinal `+` ou pontuação. O link abre o WhatsApp com uma mensagem preenchida; o visitante ainda precisa enviá-la. Nunca use um número inventado. Dados pessoais não são salvos; apenas IDs de favoritos ficam no localStorage. Sem analytics ou backend.

## Vercel

Importe este repositório na Vercel, selecione **Other**, deixe o comando de build vazio e use `.` como diretório de saída. `vercel.json` configura o deploy estático. Se a interface pedir Install Command, deixe vazio também. Publique pelo painel após revisar as alterações. Nenhum domínio ou deploy é criado automaticamente por este projeto.

## Validação

Teste os layouts em 375, 390, 768 e 1440 pixels; busca com acentos, filtros, favoritos após reload, modal por teclado, menu mobile, slider, geração de mensagem e datas passadas. O WhatsApp só deve aparecer após configurar um contato autorizado. A cópia automática exige contexto seguro (HTTPS ou localhost) e permissão do navegador; existe seleção manual como alternativa.

O slider pausa em abas ocultas e com movimento reduzido. Modal usa `<dialog>` nativo, com foco e Escape; menu mobile contém o foco e fecha com Escape. Navegação, FAQ e campos possuem controles acessíveis.

## Direção visual e assets

Sete imagens distintas: Santorini, Fernando de Noronha, Alpes, costa italiana, Maldivas, Paris e natureza. O hero usa variantes com composição ampla; cards utilizam versões de 800 pixels. `assets/image-fallback.svg` é a alternativa gráfica local para falhas de carregamento. As imagens originais PNG geradas não fazem parte do deploy; os WebP preparados estão versionados.

O slider possui pausa manual, além de respeitar movimento reduzido e visibilidade da aba. O enquadramento das imagens, o contraste do hero e a composição editorial das experiências se adaptam ao viewport.
