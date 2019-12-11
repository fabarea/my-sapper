<script>
  import { getClient, query, mutate } from "svelte-apollo";
  import {GETTODO, ADDTODO} from "../queries/todo";

  let todoEdit = "";
  const client = getClient();
  const todos = query(client, { query: GETTODO });

  function addTodo() {
    const todoAdd = mutate(client, {
      mutation: ADDTODO,
      variables: {
        todoEdit
      }
    })
      .then(data => {
        todoEdit = "";
        todos.refetch();
      })
      .catch(e => {
        console.error("error: ", e);
      });
  }
</script>

<style>
  .done {
    text-decoration: line-through;
  }
</style>

<div style="text-align:center">

  <!--    <form on:submit|preventDefault={addTodo}>-->
  <!--        <input placeholder="new todo" bind:value={todoEdit}/>-->
  <!--        <button method="submit">Submit</button>-->
  <!--    </form>-->

  {#await $todos}
    <p>.. loading</p>
  {:then data}

    {#each data.data['allTodos']['data'] as todo, i}
      <p class:done={todo.completed}>{todo.title}</p>
    {/each}

  {:catch e}
    {e}
  {/await}

</div>
