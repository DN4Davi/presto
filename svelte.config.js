import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // Modo SPA: sem servidor, necessário por causa da rota dinâmica /loans/[id]/edit
    adapter: adapter({
      fallback: 'index.html'
    }),
    // Caminhos de assets ABSOLUTOS (/_app/...). Com o padrão (relative: true), a
    // casca em cache do service worker usa caminhos relativos que quebram em rotas
    // profundas (ex.: recarregar /loans/ID/edit busca /loans/ID/_app/... → 404).
    // Absoluto resolve a partir da raiz em qualquer profundidade — offline e online.
    paths: {
      base: '/presto',
      relative: false
    }
  }
};

export default config;
