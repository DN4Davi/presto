<script>
  import { fly, fade } from 'svelte/transition';
  import { loans, deleteLoan, getLoan } from '$lib/stores/loans.svelte.js';
  import LoanCard from '$lib/components/LoanCard.svelte';
  import Button from '$lib/components/Button.svelte';
  import ConfirmDialog from '$lib/components/ConfirmDialog.svelte';

  let pendingDeleteId = $state(null);

  const pendingLoan = $derived(pendingDeleteId ? getLoan(pendingDeleteId) : null);
  const borrowedCount = $derived(loans.items.filter(l => l.status === 'emprestado').length);
  const returnedCount = $derived(loans.items.filter(l => l.status === 'devolvido').length);

  function confirmDelete() {
    deleteLoan(pendingDeleteId);
    pendingDeleteId = null;
  }
</script>

<svelte:head>
  <title>Empréstimos · Presto</title>
</svelte:head>

<div class="toolbar">
  <h1>Empréstimos</h1>
  <Button href="/loans/new">+ Novo empréstimo</Button>
</div>

{#if loans.items.length === 0}
  <div class="empty">
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M8 28h48v28a4 4 0 01-4 4H12a4 4 0 01-4-4V28z" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M8 28L20 10h24l12 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M32 10v18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
      <path d="M8 42h48" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
    </svg>
    <p class="empty-title">Nenhum empréstimo ainda</p>
    <p class="empty-text">Quando você emprestar algo, registre aqui para não esquecer quem está com a sua coisa.</p>
    <Button href="/loans/new">+ Novo empréstimo</Button>
  </div>
{:else}
  <div class="stats">
    <span class="stat borrowed">● {borrowedCount} emprestado{borrowedCount !== 1 ? 's' : ''}</span>
    <span class="stat returned">● {returnedCount} devolvido{returnedCount !== 1 ? 's' : ''}</span>
  </div>
  <ul class="list">
    {#each loans.items as loan, index (loan.id)}
      <li
        in:fly={{ y: 12, duration: 250, delay: index * 50 }}
        out:fade={{ duration: 150 }}
      >
        <LoanCard {loan} onDelete={(id) => (pendingDeleteId = id)} />
      </li>
    {/each}
  </ul>
{/if}

{#if pendingLoan}
  <ConfirmDialog
    item={pendingLoan.item}
    friend={pendingLoan.friend}
    oncancel={() => (pendingDeleteId = null)}
    onconfirm={confirmDelete}
  />
{/if}

<style>
  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space);
    margin-bottom: var(--space);
    flex-wrap: wrap;
  }

  .stats {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: 600;
  }

  .stat.borrowed {
    color: var(--color-borrowed);
  }

  .stat.returned {
    color: var(--color-returned);
  }

  .list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .empty {
    text-align: center;
    background: var(--color-surface);
    border: 1px dashed var(--color-border);
    border-radius: var(--radius);
    padding: 40px var(--space);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: var(--color-text-muted);
  }

  .empty-title {
    margin: 8px 0 0;
    font-size: 17px;
    font-weight: 600;
    color: var(--color-text);
  }

  .empty-text {
    margin: 0 0 8px;
    color: var(--color-text-muted);
    max-width: 36ch;
  }
</style>
