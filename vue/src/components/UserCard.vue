<script setup lang="ts">
import type { User } from '@/types/user'

defineProps<{ user: User; favorite: boolean }>()
const emit = defineEmits<{ toggle: [id: number] }>()
</script>

<template>

  <div class="card">
    <h3>{{ user.name }}</h3>
    <p>{{ user.email }}</p>
    <p>{{ user.address.city }}</p>
    
    <button @click="emit('toggle', user.id)">
      {{ favorite ? '★ Quitar favorito' : '☆ Favorito' }}
    </button>
  </div>

</template>

<style scoped>
.card { border: 1px solid #ccc; border-radius: 8px; padding: 12px; margin: 8px 0; }
</style>
