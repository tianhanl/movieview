<template>
    <div>
        {{imageID}}
    </div>
</template>
<script>
    export default {
        data() {
          return {
            imageID: 0
          }
        },
        created() {
          this.imageID = this.$route.params.id
        }
    }

</script>
<style lang="scss">

</style>