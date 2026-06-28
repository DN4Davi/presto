<script>
  /**
   * Botão reutilizável. Suporta variantes de cor e renderiza como <a> quando recebe `href`.
   * @type {{
   *   variant?: 'primary' | 'secondary' | 'danger',
   *   href?: string,
   *   type?: 'button' | 'submit',
   *   onclick?: (e: MouseEvent) => void,
   *   disabled?: boolean,
   *   block?: boolean,
   *   children?: any
   * }}
   */
  let {
    variant = 'primary',
    href = undefined,
    type = 'button',
    onclick = undefined,
    disabled = false,
    block = false,
    children
  } = $props();
</script>

{#if href}
  <a class="btn {variant}" class:block {href} role="button">
    {@render children?.()}
  </a>
{:else}
  <button class="btn {variant}" class:block {type} {onclick} {disabled}>
    {@render children?.()}
  </button>
{/if}

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 44px;
    padding: 0 20px;
    border: 1px solid transparent;
    border-radius: var(--radius);
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.15s ease, opacity 0.15s ease,
      transform 0.15s ease, box-shadow 0.15s ease;
    user-select: none;
  }

  .btn.block {
    width: 100%;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .btn:active:not(:disabled) {
    transform: scale(0.97);
  }

  .primary {
    background: var(--color-primary);
    color: #fff;
  }
  .primary:hover:not(:disabled) {
    background: var(--color-primary-dark);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
  }

  .secondary {
    background: var(--color-surface);
    color: var(--color-text);
    border-color: var(--color-border);
  }
  .secondary:hover:not(:disabled) {
    background: var(--color-bg);
  }

  .danger {
    background: var(--color-surface);
    color: var(--color-danger);
    border-color: var(--color-danger);
  }
  .danger:hover:not(:disabled) {
    background: var(--color-danger);
    color: #fff;
  }
</style>
