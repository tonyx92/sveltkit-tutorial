import type { Post } from '@prisma/client'

export async function load({ fetch }) {
  // `fetch` understands the relative path and saves the response
  // inside the HTML to be reused avoiding additional requests
  const response = await fetch('/api/posts')

  // SvelteKit is going to generate the types
  const posts: Post[] = await response.json()

  // this becomes available on the page as `data.posts`
  return { posts }
}