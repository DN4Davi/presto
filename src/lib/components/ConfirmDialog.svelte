<script>
  import Button from './Button.svelte';

  /**
   * Diálogo de confirmação de exclusão, acessível.
   * Usa o elemento nativo <dialog> (showModal): foco preso, Esc fecha,
   * fundo inerte. O foco é restaurado ao elemento anterior ao fechar.
   * Compartilhado pela Listagem e pela Edição.
   * @type {{
   *   item: string,
   *   friend: string,
   *   oncancel: () => void,
   *   onconfirm: () => void
   * }}
   */
  let { item, friend, oncancel, onconfirm } = $props();

  let dialogEl = $state();

  $effect(() => {
    const previouslyFocused = document.activeElement;
    dialogEl.showModal();
    // foca a ação não destrutiva (Cancelar) ao abrir
    dialogEl.querySelector('button')?.focus();
    return () => {
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  });

  // Esc dispara o evento nativo "cancel"
  function handleCancel(e) {
    e.preventDefault();
    oncancel();
  }

  // clique no backdrop (fora do conteúdo) fecha
  function handleClick(e) {
    if (e.target === dialogEl) oncancel();
  }
</script>

<dialog
  bind:this={dialogEl}
  class="dialog"
  aria-labelledby="confirm-title"
  aria-describedby="confirm-desc"
  oncancel={handleCancel}
  onclick={handleClick}
>
  <div class="body">
    <h2 id="confirm-title">Excluir empréstimo?</h2>
    <p id="confirm-desc">
      Tem certeza que deseja excluir <strong>{item}</strong> (emprestado a {friend})?
      Esta ação não pode ser desfeita.
    </p>
    <div class="actions">
      <Button variant="secondary" onclick={oncancel}>Cancelar</Button>
      <Button variant="danger" onclick={onconfirm}>Excluir</Button>
    </div>
  </div>
</dialog>

<style>
  .dialog {
    padding: 0;
    border: none;
    border-radius: var(--radius);
    max-width: 400px;
    width: calc(100% - 2 * var(--space));
    background: var(--color-surface);
    color: var(--color-text);
    box-shadow: var(--shadow-md);
  }

  .dialog::backdrop {
    background: rgba(17, 24, 39, 0.5);
  }

  .body {
    padding: 24px;
  }

  .dialog h2 {
    font-size: 18px;
    margin: 0 0 8px;
  }

  .dialog p {
    margin: 0 0 20px;
    color: var(--color-text-muted);
  }

  .actions {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
  }

  /* Animação de entrada (preserva o polimento; respeita reduced-motion) */
  @media (prefers-reduced-motion: no-preference) {
    .dialog[open] {
      animation: dialog-in 160ms ease-out;
    }
    .dialog[open]::backdrop {
      animation: backdrop-in 160ms ease-out;
    }
  }

  @keyframes dialog-in {
    from {
      opacity: 0;
      transform: translateY(8px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes backdrop-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
