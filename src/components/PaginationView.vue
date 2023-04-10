
<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination en-font">
      <li class="page-item" :class="{ disabled:!pagination.has_pre }">
        <a class="page-link border-0 bd-rd-12" href="#" aria-label="Previous" @click.prevent="getDanceGroupProduct(path,pagination.current_page-1)">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item" :class="{ active: page === pagination.current_page}" v-for="page in pagination.total_pages" :key="page + 'page'">
      <a class="page-link border-0 bd-rd-12" href="#" @click.prevent="getDanceGroupProduct(path,page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled:!pagination.has_next }">
        <a class="page-link border-0 bd-rd-12" href="#" aria-label="Next" @click.prevent="getDanceGroupProduct(path,pagination.current_page+1)">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import productsStore from '../store/productsStore.js'
import { mapActions } from 'Pinia'

export default {
  props: ['pagination', 'path'],
  methods: {
    ...mapActions(productsStore, ['getDanceGroupProduct'])
  },
  mounted () {
    this.getDanceGroupProduct(this.pagination)
  }
}
</script>
