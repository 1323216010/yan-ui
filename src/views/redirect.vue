<script>
export default {
  created() {
    this.$router.push('/files/review')
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
