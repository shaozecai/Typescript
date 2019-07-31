<template>
  <div class="home">
    <HomeContent/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HomeContent from '@/components/HomeContent.vue'; // @ is an alias to /src

@Component({
  components: {
    HomeContent,
  },
})
export default class Home extends Vue {}
</script>
