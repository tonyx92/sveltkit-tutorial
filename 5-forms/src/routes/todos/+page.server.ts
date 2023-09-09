import { getTodos } from '$lib/server/database'

export async function load() {
  const todos = getTodos()
  return { todos }
}