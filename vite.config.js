import { sveltekit } from '@sveltejs/kit/vite';
import { SvelteKitPWA } from '@vite-pwa/sveltekit';
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: true
  },
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      registerType: 'autoUpdate',
      // Modo SPA: inclui a casca do app no precache do service worker p/ abrir
      // offline. Usamos '/' (não 'index.html') como fallback porque o servidor
      // estático serve a casca em '/' — pedir '/index.html' dá 404 e quebraria a
      // instalação do SW. O plugin usa este valor tanto para o precache quanto
      // para o navigateFallback, e deriva a revisão de _app/version.json.
      kit: {
        spa: true,
        adapterFallback: '/presto/'
      },
      manifest: {
        name: 'Presto',
        short_name: 'Presto',
        lang: 'pt-BR',
        description: 'Controle de empréstimos entre amigos',
        theme_color: '#4F46E5',
        background_color: '#FFFFFF',
        display: 'standalone',
        scope: '/presto/',
        start_url: '/presto/',
        icons: [
          { src: '/presto/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/presto/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/presto/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      }
    })
  ]
});
