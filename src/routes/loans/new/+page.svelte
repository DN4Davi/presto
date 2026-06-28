<script>
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
  import { base } from '$app/paths';
  import { addLoan } from '$lib/stores/loans.svelte.js';
  import LoanForm from '$lib/components/LoanForm.svelte';

  function handleSubmit(data) {
    addLoan(data);
    goto(base + '/loans');
  }
</script>

<svelte:head>
  <title>Novo empréstimo · Presto</title>
</svelte:head>

<div class="head">
  <a class="back" href="{base}/loans">← Voltar</a>
  <h1>Novo empréstimo</h1>
</div>

<div in:fade={{ duration: 200 }}>
  <LoanForm submitLabel="Salvar" onsubmit={handleSubmit} />
</div>

<style>
  .head {
    margin-bottom: var(--space);
  }

  .back {
    display: inline-block;
    margin-bottom: 8px;
    color: var(--color-text-muted);
    font-size: 14px;
    font-weight: 500;
  }

  .back:hover {
    color: var(--color-text);
  }
</style>
