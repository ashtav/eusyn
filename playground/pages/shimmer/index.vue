<template>
  <div class="container">
    <!-- header -->
    <PageHeader title="Shimmer" />

    <!-- simple -->
    <Shimmer />
    <code>&lt;Shimmer /&gt; // simple </code> <br>

    <!-- with size -->
    <Row align="end" gap="5">
      <Shimmer size="80" />
      <Shimmer :size="[50, 100]" />
    </Row>
    <code>
      &lt;Shimmer size="80" /&gt; // with size <br>
      &lt;Shimmer :size="[50, 100]" /&gt; // [width, height]
    </code>

    <!-- with random size -->
    <Shimmer :size="[[50, 300]]" />
    <code>&lt;Shimmer :size="[[50, 300]]" /&gt; // with random size</code>

    <!-- with iteration -->
    <Shimmer :size="[[50, 300]]" :iterate="2" />
    <code>&lt;Shimmer :size="[[50, 300]]" :iterate="2" /&gt; // with iteration</code>
  </div>
</template>

<script>
export default {
  setup () {


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