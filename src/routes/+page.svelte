<script>
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
  <title>Presto</title>
</svelte:head>

<section class="home">
  <svg class="illustration" width="180" height="130" viewBox="0 0 180 130" fill="none" aria-hidden="true">
    <ellipse cx="90" cy="65" rx="70" ry="54" fill="#EEF2FF"/>

    <!-- Left person (lender, indigo) -->
    <circle cx="20" cy="52" r="11" fill="white" stroke="#4F46E5" stroke-width="2.5"/>
    <path d="M6 84 Q20 74 34 84" stroke="#4F46E5" stroke-width="2.5" stroke-linecap="round" fill="none"/>

    <!-- Right person (borrower, amber) -->
    <circle cx="160" cy="52" r="11" fill="white" stroke="#F59E0B" stroke-width="2.5"/>
    <path d="M146 84 Q160 74 174 84" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" fill="none"/>

    <!-- Package -->
    <rect x="67" y="36" width="46" height="40" rx="6" fill="white" stroke="#4F46E5" stroke-width="2.5"/>
    <path d="M67 51h46" stroke="#4F46E5" stroke-width="2.5"/>
    <path d="M90 36v15" stroke="#4F46E5" stroke-width="2.5"/>
    <!-- Bow (amber) -->
    <path d="M83 36 Q87 28 90 36 Q93 28 97 36" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" fill="none"/>

    <!-- Arrow: left person → package (indigo) -->
    <line x1="35" y1="56" x2="63" y2="56" stroke="#4F46E5" stroke-width="2" stroke-linecap="round"/>
    <path d="M58 51 L63 56 L58 61" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>

    <!-- Arrow: package → right person (amber) -->
    <line x1="117" y1="56" x2="145" y2="56" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
    <path d="M140 51 L145 56 L140 61" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>

  <div class="hero">
    <h1 class="brand-title">Presto</h1>
    <p class="subtitle">Controle de empréstimos entre amigos</p>
  </div>

  <Button href="/loans" block>Ver empréstimos →</Button>
</section>

<style>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 28px;
    padding-top: 48px;
    text-align: center;
  }

  .illustration {
    display: block;
  }

  .hero {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .brand-title {
    font-size: 48px;
    font-weight: 800;
    letter-spacing: -0.04em;
    background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    margin: 0;
    color: var(--color-text-muted);
    font-size: 16px;
  }
</style>
