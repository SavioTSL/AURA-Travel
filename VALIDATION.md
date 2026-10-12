# Revisão de qualidade — AURA Travel

## Executado

- Chromium com Playwright 1.62.1: perfis emulados de iPhone SE (320px), iPhone 13 (390px), Pixel 7 (393px), iPad (810px) e desktop (1440px).
- Sem overflow horizontal nesses perfis. Verificação adicional com viewport de 720px e tamanho de fonte raiz de 200%.
- Busca sem acentos, categorias, favoritos combinados com estilo, remoção individual e limpeza de filtros.
- Texto da busca tratado como texto ao criar indicadores, incluindo uma entrada de teste contendo markup.
- Modal com contenção e restauração de foco; solicitação segue para o campo de nome e preenche o destino.
- Menu mobile com fundo inerte, ciclo de Tab/Shift+Tab e fechamento por Escape com retorno de foco.
- Nenhum erro JavaScript nas execuções dos perfis.
- Axe-core 4.14.0, regras WCAG 2 A/AA, WCAG 2.1 AA e boas práticas: zero violações automáticas nos estados desktop, mobile, modal e menu aberto após as correções.
- Na revisão anterior da mesma implementação: slider, pausa e retomada, movimento reduzido, persistência dos favoritos, datas passadas, cópia da mensagem, destinos dos links e fallback de imagens foram exercitados no Chromium.

## Limites reais

Emulação no Chromium **não é Safari no iPhone nem um aparelho Android físico**. Não havia dispositivos físicos disponíveis. O download do WebKit foi bloqueado com HTTP 403 pela política de rede, portanto o Safari/WebKit não foi validado.

O Axe sinaliza contraste sobre fotografias para revisão humana e o link de pular conteúdo quando o fundo está inerte no menu. Esses resultados incompletos não equivalem a uma certificação de acessibilidade. O contraste dos textos sobre fundos sólidos foi corrigido; overlays escuros mantêm a leitura sobre as imagens. Testes com VoiceOver/TalkBack e aparelhos reais continuam recomendados.

Nenhum deploy foi realizado nesta revisão, conforme solicitado. O WhatsApp continua sem destinatário e não foi usado para transmitir mensagens.

## Reproduzir testes

Com o servidor HTTP ativo na raiz do projeto, instale ferramentas de teste **fora do checkout**:

```sh
npm install --prefix /tmp/aura-test-tools --no-save playwright@1.62.1 axe-core@4.14.0
/tmp/aura-test-tools/node_modules/.bin/playwright install chromium
NODE_PATH=/tmp/aura-test-tools/node_modules node tests/site.cjs
NODE_PATH=/tmp/aura-test-tools/node_modules node tests/accessibility.cjs
```

Se já houver Chromium disponível, dispense o download e forneça `BROWSER_EXECUTABLE_PATH=/usr/bin/chromium` junto ao comando. `AURA_TEST_URL` pode definir outro servidor de testes; o padrão é `http://localhost:8000`. Os testes de site salvam capturas em `/tmp/aura-polish-*.png`. Ferramentas de testes não são dependências da aplicação e não são necessárias para publicar o site.
