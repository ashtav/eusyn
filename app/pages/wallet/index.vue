<template>
  <div class="p-5 wallet">
    <PageHeader title="Wallet" @click="getData" />

    <div v-if="isLoading" class="row">
      <div class="col-lg-4">
        <Shimmer :size="['100%', 120]" />
      </div>
    </div>

    <div class="row" v-else>
      <div class="col-lg-4" v-for="(data, i) in wallets" :key="i" @click="onDetail(data)">
        <div class="card card-body bg-dark text-white">
          <h3 class="m-0"> {{ data.name }} </h3>
          <p class="created">
            {{ $helper.convertTimestamp(data.created_at) }}
          </p>

          <p class="m-0"> {{ data.description }} </p>

          <ul class="control">
            <li>
              <span>
                <Ti icon="ti-pencil" />
              </span>
            </li>
            <li>
              <span>
                <Ti icon="ti-trash" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <ModalsWalletForm />
  </div>
</template>

<script lang="ts">
import { useAppStore } from '@/stores/app';
import { useWalletStore } from '@/stores/wallet';

export default {
  setup() {

    definePageMeta({
      middleware: 'auth'
    })

    const app = useAppStore()
    const wallet = useWalletStore()

    return { app, wallet }
  },

  computed: {
    wallets() {
      return this.wallet.wallets
    }
  },

  data() {
    return {
      isLoading: false
    }
  },

  mounted() {
    this.app.navbar.actions = [
      { icon: 'ti-plus', label: 'New Wallet', click: this.onCreate }
    ]

    this.getData()
  },

  methods: {
    getData() {
      this.isLoading = true
      this.wallet.getData().then(() => {
        this.isLoading = false
      })
    },

    onDetail(data: Wallet){
      this.$router.push({ path: `/wallet/${data.id}` })
    },

    onCreate() {
      this.$modal.show('form-wallet', {
        title: 'New Wallet'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wallet {
  .card {
    transition: .2s;
    z-index: 9;
    position: relative;
    overflow: hidden;
    box-shadow: 15px 15px 25px -5px lighten($color: #182433, $amount: 100%);

    .created {
      word-spacing: 10px;
      color: #ddd;
    }

    h3,
    p {
      opacity: 1;
      transition: .2s;
    }

    &::before {
      content: '';
      position: absolute;
      background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 100%);
      border-radius: 0px;
      height: 100%;
      width: 120%;
      top: 0px;
      left: 0;
      z-index: 0;
      transition: .2s;
      opacity: .3;
    }

    &:hover {
      cursor: pointer;
      box-shadow: 15px 15px 25px -5px lighten($color: #182433, $amount: 60%);

      h3,
      p {
        opacity: .5;
      }

      &::before {
        transform: skew(15deg, 10deg) scale(.9);
        top: -30px;
        left: 35px;
        opacity: .5;
        backdrop-filter: blur(25px);
        border-radius: 30px;
      }

      .control {
        opacity: 1;
        top: 15px;

      }
    }

    &:active {
      transform: scale(.98);
    }

    .control {
      position: absolute;
      top: 0px;
      right: 10px;
      padding: 0;
      margin: 0;
      list-style: none;
      opacity: 0;
      transition: .2s;

      li {
        display: inline-block;

        span {
          padding: 15px 10px;

          i {
            color: #fff
          }
        }

        &:hover {
          span i {
            color: #ddd
          }
        }
      }
    }
  }
}
</style>