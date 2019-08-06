<template>
  <div class="detail">
    <DetailContent/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DetailContent from '@/components/DetailContent.vue'; // @ is an alias to /src

@Component({
  components: {
    DetailContent,
  },
})
export default class Detail extends Vue {}
</script>
