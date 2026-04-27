import type { SearchResult } from "../types/types.ts";
import { httpWrapper } from "./httpWrapper.ts";

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

export async function fakeLogin(credentials: Record<string, string>) {
  return await httpWrapper(`${baseUrl}login`, {
    method: 'POST',
    body: JSON.stringify(credentials),
  })
}
