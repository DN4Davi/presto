<script>
  import '../app.css';
  import { onMount } from 'svelte';
  import { onNavigate } from '$app/navigation';

  onMount(async () => {
    const { registerSW } = await import('virtual:pwa-register');
    registerSW({ immediate: true });
  });

  let { children } = $props();

  onNavigate((navigation) => {
    if (!document.startViewTransition) return;
    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<div class="app">
  <header class="header">
    <a class="brand" href="/">Presto</a>
  </header>

  <main class="container">
    {@render children()}
  </main>
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .header {
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: 14px var(--space);
    position: sticky;
    top: 0;
    z-index: 10;
  }

  .brand {
    font-size: 20px;
    font-weight: 700;
    color: var(--color-primary);
    letter-spacing: -0.02em;
  }

  .container {
    width: 100%;
    max-width: 560px;
    margin: 0 auto;
    padding: var(--space);
    flex: 1;
  }
</style>
