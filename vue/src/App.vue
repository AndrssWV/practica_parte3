<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import type { User } from '@/types/user'
import UserCard from '@/components/UserCard.vue'
import { filterUsers } from '@/utils/filterUsers'

const users = ref<User[]>([])
const query = ref('')
const favorites = ref<number[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const filtered = computed(() => filterUsers(users.value, query.value))

async function load() {
  loading.value = true
  error.value = null
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!res.ok) throw new Error(res.status)
    users.value = await res.json()
  } catch {
    error.value = 'No se pudo cargar los usuarios.'
  } finally {
    loading.value = false
  }
}

function toggleFavorite(id: number) {
  favorites.value = favorites.value.includes(id) ? favorites.value.filter((x) => x !== id) : [...favorites.value, id]
}

onMounted(load)
</script>

<template>

  <h1>Usuarios</h1>

  <input v-model="query" placeholder="Buscar por nombre..." />
  <p>Favoritos: {{ favorites.length }}</p>

  <p v-if="loading">Cargando…</p>

  <div v-else-if="error">
    <p style="color: red">{{ error }}</p>
    <button @click="load">Reintentar</button>
  </div>

  <template v-else>
    <UserCard v-for="u in filtered" :key="u.id" :user="u" :favorite="favorites.includes(u.id)"@toggle="toggleFavorite" />
    <p v-if="!filtered.length">Sin resultados</p>
  </template>
</template>
