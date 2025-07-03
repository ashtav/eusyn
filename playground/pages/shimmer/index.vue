<template>
  <div>
    <!-- header -->
    <PageHeader title="Shimmer" />

    <div class="row">
      <div class="col-lg-6">
        <!-- simple -->
        <Shimmer /> <br>
        <Code class="mb-5" code="<Shimmer />" />

        <!-- with size -->
        <Row align="end" gap="5">
          <Shimmer size="80" />
          <Shimmer :size="[50, 100]" />
        </Row>

        <br>
        <Code class="mb-5" code='<Shimmer size="80" />
<Shimmer :size="[50, 100]" />' description="[width, height]" />

        <!-- with random size -->
        <Shimmer :size="[[50, 300]]" /> <br>
        <Code class="mb-5" code='<Shimmer :size="[[50, 300]]" />' description="With random size." />

        <!-- with iteration -->
        <Shimmer :size="[[50, 300]]" :iterate="2" /> <br>
        <Code class="mb-5" code='<Shimmer :size="[[50, 300]]" :iterate="2" />'
          description="With random size and iteration." />


        <Shimmer type="tile" :size="[[50, 100]]" :iterate="2" class="col-lg-6" /> <br>
        <Code class="mb-5" code='<Shimmer type="tile" :size="[[50, 100]]" :iterate="2" class="col-lg-6" />'
          description="Shimmer with type: card or tile" />


      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {


    return {}
  }
}
</script>

<style lang="scss" scoped>
code {
  background: #f5f5f5;
  margin-bottom: 25px;
  margin-top: 10px;
  display: inline-block;
  padding: 10px 10px;
  padding-right: 50px;
  border: 1px #e5e5e5 solid
}
</style>