<script>
  import StatusBadge from './StatusBadge.svelte';
  import { base } from '$app/paths';

  /**
   * @type {{
   *   loan: { id: string, item: string, friend: string, date: string, status: 'emprestado' | 'devolvido' },
   *   onDelete?: (id: string) => void
   * }}
   */
  let { loan, onDelete } = $props();

  const formattedDate = $derived(
    loan.date ? loan.date.split('-').reverse().join('/') : ''
  );

  const statusColor = $derived(
    loan.status === 'devolvido' ? 'var(--color-returned)' : 'var(--color-borrowed)'
  );
</script>

<article class="card" style="--status-color: {statusColor}">
  <div class="info">
    <h2 class="item">{loan.item}</h2>
    <p class="meta">
      <span>{loan.friend}</span>
      <span class="dot">•</span>
      <span>{formattedDate}</span>
    </p>
  </div>

  <div class="side">
    <StatusBadge status={loan.status} />
    <div class="actions">
      <a
        class="icon-btn"
        href="{base}/loans/{loan.id}/edit"
        aria-label="Editar empréstimo"
        title="Editar"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M11.333 2a1.886 1.886 0 0 1 2.667 2.667L5.333 13.333 2 14l.667-3.333L11.333 2Z"/>
        </svg>
      </a>
      <button
        class="icon-btn danger"
        onclick={() => onDelete?.(loan.id)}
        aria-label="Excluir empréstimo"
        title="Excluir"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="2 4 14 4"/>
          <path d="M5.333 4V2.667h5.334V4"/>
          <path d="M3.333 4l.667 9.333h8l.667-9.333"/>
          <path d="M6.667 7.333v4M9.333 7.333v4"/>
        </svg>
      </button>
    </div>
  </div>
</article>

<style>
  .card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-left: 4px solid var(--status-color);
    border-radius: var(--radius);
    padding: var(--space) var(--space) var(--space) 12px;
    box-shadow: var(--shadow-sm);
    transition: box-shadow 0.2s ease, transform 0.15s ease;
  }

  .card:hover {
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }

  .item {
    font-size: 17px;
    font-weight: 600;
    word-break: break-word;
  }

  .meta {
    margin: 6px 0 0;
    color: var(--color-text-muted);
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    align-items: center;
  }

  .dot {
    color: var(--color-border);
  }

  .side {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
    flex-shrink: 0;
  }

  .actions {
    display: flex;
    gap: 4px;
  }

  .icon-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: var(--color-primary);
    cursor: pointer;
    transition: background 0.15s ease;
    text-decoration: none;
  }

  .icon-btn:hover {
    background: var(--color-primary-surface);
  }

  .icon-btn.danger {
    color: var(--color-danger);
  }

  .icon-btn.danger:hover {
    background: rgba(220, 38, 38, 0.08);
  }
</style>
