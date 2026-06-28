<script>
  import Button from './Button.svelte';

  /**
   * Formulário compartilhado por Create e Update.
   * Sem `loan` → modo criação (vazio). Com `loan` → modo edição (preenchido).
   * @type {{
   *   loan?: { item: string, friend: string, date: string, status: 'emprestado' | 'devolvido' },
   *   submitLabel?: string,
   *   onsubmit: (data: { item: string, friend: string, date: string, status: string }) => void
   * }}
   */
  let { loan = undefined, submitLabel = 'Salvar', onsubmit } = $props();

  let item = $state(loan?.item ?? '');
  let friend = $state(loan?.friend ?? '');
  let date = $state(loan?.date ?? new Date().toISOString().slice(0, 10));
  let status = $state(loan?.status ?? 'emprestado');

  let error = $state('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!item.trim() || !friend.trim() || !date) {
      error = 'Preencha item, amigo e data.';
      return;
    }
    error = '';
    onsubmit({ item: item.trim(), friend: friend.trim(), date, status });
  }
</script>

<form onsubmit={handleSubmit} novalidate>
  <div class="field">
    <label for="item">Item</label>
    <input id="item" type="text" bind:value={item} placeholder="ex.: Carregador USB-C" autocomplete="off" />
  </div>

  <div class="field">
    <label for="friend">Amigo</label>
    <input id="friend" type="text" bind:value={friend} placeholder="ex.: Marina" autocomplete="off" />
  </div>

  <div class="field">
    <label for="date">Data</label>
    <input id="date" type="date" bind:value={date} />
  </div>

  <div class="field">
    <span class="status-label">Status</span>
    <div class="status-toggle" role="group" aria-label="Status do empréstimo">
      <button
        type="button"
        class="toggle-btn emprestado"
        class:active={status === 'emprestado'}
        onclick={() => (status = 'emprestado')}
      >Emprestado</button>
      <button
        type="button"
        class="toggle-btn devolvido"
        class:active={status === 'devolvido'}
        onclick={() => (status = 'devolvido')}
      >Devolvido</button>
    </div>
  </div>

  {#if error}
    <p class="error" role="alert">{error}</p>
  {/if}

  <Button type="submit" block>{submitLabel}</Button>
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: var(--space);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: var(--space);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  label {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text);
  }

  input {
    min-height: 44px;
    padding: 0 12px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    background: var(--color-surface);
    color: var(--color-text);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }

  input:focus {
    border-color: var(--color-primary);
    outline: none;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  }

  .status-label {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text);
  }

  .status-toggle {
    display: flex;
    background: var(--color-bg);
    border: 1px solid var(--color-border);
    border-radius: var(--radius);
    padding: 3px;
    gap: 3px;
  }

  .toggle-btn {
    flex: 1;
    min-height: 38px;
    border: none;
    border-radius: calc(var(--radius) - 4px);
    background: transparent;
    color: var(--color-text-muted);
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
  }

  .toggle-btn.active {
    background: var(--color-surface);
    box-shadow: var(--shadow-sm);
  }

  .toggle-btn.emprestado.active {
    color: var(--color-borrowed);
  }

  .toggle-btn.devolvido.active {
    color: var(--color-returned);
  }

  .error {
    margin: 0;
    color: var(--color-danger);
    font-size: 14px;
    font-weight: 500;
  }
</style>
