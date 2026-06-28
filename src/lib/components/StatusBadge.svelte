<script>
  /** @type {{ status: 'emprestado' | 'devolvido' }} */
  let { status } = $props();

  const label = $derived(status === 'devolvido' ? 'Devolvido' : 'Emprestado');
</script>

<span class="badge {status}">{label}</span>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    white-space: nowrap;
  }

  .emprestado {
    background: var(--color-borrowed);
  }

  .devolvido {
    background: var(--color-returned);
  }
</style>
