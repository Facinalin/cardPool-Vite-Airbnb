<template>
  <router-view />
</template>

<script>
import axios from 'axios'
export default {
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    axios.defaults.headers.common.Authorization = token
  }
}
</script>

<style lang="scss">

</style>
