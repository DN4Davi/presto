<script>
  import { fade } from 'svelte/transition';
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { getLoan, updateLoan, deleteLoan } from '$lib/stores/loans.svelte.js';
  import LoanForm from '$lib/components/LoanForm.svelte';
  import Button from '$lib/components/Button.svelte';
  import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';

  const id = $derived(page.params.id);
  const loan = $derived(getLoan(id));

  let confirming = $state(false);

  function handleSubmit(data) {
    updateLoan(id, data);
    goto('/loans');
  }

  function handleDelete() {
    deleteLoan(id);
    goto('/loans');
  }
</script>

<svelte:head>
  <title>Editar empréstimo · Presto</title>
</svelte:head>

<div class="head">
  <a class="back" href="/loans">← Voltar</a>
  <h1>Editar empréstimo</h1>
</div>

{#if loan}
  <div in:fade={{ duration: 200 }}>
    <LoanForm {loan} submitLabel="Atualizar" onsubmit={handleSubmit} />

    <div class="danger-zone">
      <Button variant="danger" block onclick={() => (confirming = true)}>Excluir empréstimo</Button>
    </div>
  </div>

  {#if confirming}
    <ConfirmDialog
      item={loan.item}
      friend={loan.friend}
      oncancel={() => (confirming = false)}
      onconfirm={handleDelete}
    />
  {/if}
{:else}
  <div class="not-found">
    <p>Empréstimo não encontrado.</p>
    <Button href="/loans">Voltar à listagem</Button>
  </div>
{/if}

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

  .danger-zone {
    margin-top: var(--space);
  }

  .not-found {
    text-align: center;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 32px var(--space);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
</style>
