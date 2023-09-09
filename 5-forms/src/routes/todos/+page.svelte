<script lang="ts">
  import { enhance, type SubmitFunction } from '$app/forms'

  export let data
  export let form

  let loading = false

  const addTodo: SubmitFunction = () => {
    loading = true

    return async ({ update }) => {
      loading = false
      await update()
    }
  }
</script>

<ul>
  {#each data.todos as todo}
    <li>
      <span>{todo.text}</span>
      <form method="POST" action="?/removeTodo" use:enhance>
        <input type="hidden" name="id" value={todo.id} />
        <button class="delete" type="submit">❌</button>
      </form>
    </li>
  {/each}
</ul>

<form method="POST" action="?/addTodo" use:enhance={addTodo}>
  <input type="text" name="todo" value={form?.todo ?? ''} />
  {#if form?.missing}
    <p class="error">This field is required</p>
  {/if}

  <button aria-busy={loading} class:secondary={loading} type="submit">
    {#if !loading}+ Add todo{/if}
  </button>

  <button	formaction="?/clearTodos" class="secondary" type="submit">
    Clear
  </button>
</form>

{#if form?.success}
  <p>Added todo! 🥳</p>
{/if}
  
  <style>
    ul {
      padding: 0;
    }
  
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    span {
      text-transform: capitalize;
    }
  
    .delete {
      margin: 0;
      background: none;
      border: none;
    }
  
    .error {
      color: tomato;
    }
  </style>