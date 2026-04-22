import type { SearchResult } from "../types/types.ts";
import { httpWrapper } from "../utils/httpWrapper.ts";

const baseUrl = 'http://localhost:3000/'

export async function fetchWatchList() {
  return await httpWrapper(`${baseUrl}favorites/`)
}

export async function fetchWatchListItem(id: number) {
  return await httpWrapper(`${baseUrl}favorites/${id}`)
}

export async function addWatchList(data: Partial<SearchResult>) {
  return await httpWrapper(`${baseUrl}favorites`, {
    method: 'POST',
    body: JSON.stringify(data || {}),
  })
}

export async function removeFromWatchList(data: Partial<SearchResult>) {
  return await httpWrapper(`${baseUrl}favorites/${data.id}`, {
    method: 'DELETE'
  })
}

export async function fakeLogin() {
  const res = await fetch(`${baseUrl}login`, {
    method: 'POST',
    body: JSON.stringify({username: 'guest1', password: 'password123'}),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  })
  if (!res.ok) throw new Error(`Login failed: ${res.status}`)
  return res.json()
}