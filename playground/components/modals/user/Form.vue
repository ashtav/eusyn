<template>
  <Modal :id="id" :elevation="false" :actions="actions" @init="onInit">
    <Form @submit="onSubmit" debug>
      <div class="modal-body space-y-3">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, praesentium deserunt. Voluptatem
          voluptatibus officiis maxime perspiciatis voluptates a, vel maiores delectus incidunt iure alias aperiam
          non id magni, sit perferendis!
        </p>

        <Input hint="Type something and press enter" />

        <Input hint="Enter your name" v-model="forms.name" required autofocus @enter="onEnter" @focus="$form" />
        <Code code='// disable form submission on Enter, use "<Form>" component
<Input hint="Type and enter to search" @enter="onSearch" @focus="$form" />' />


        <Card title="Tabbed Card" :tabs="tabs" tab-pos="top" v-slot="{ tab }" v-model:tab-active="tab" :colors="{
          tabColor: '#2e3545',
          tabActiveColor: '#1f2937',
          background: '#2e3545',
        }">
          <div class="card-body">
            <div class="card-title">Content of tab #{{ tab }}</div>
            <p class="text-secondary">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci, alias aliquid
              distinctio
              dolorem expedita, fugiat hic magni molestiae molestias odit.
            </p>
          </div>
        </Card>

        <Select label="Select your hobby" hint="Please select your hobby" v-model="forms.hobby_id" :options="hobbies" />

        <code>{{ forms }}</code>
      </div>

      <div class="modal-footer border-0">
        <Button label="Submit" ref="el" submit />
      </div>
    </Form>
  </Modal>
</template>

<script lang="ts">
export default {
  props: {
    id: {
      default: 'form-user'
    }
  },

  setup() {
    const nuxt = useNuxtApp();
    const theme = useCookie('theme');

    const toggleTheme = () => {
      const currentTheme = theme.value || 'system';
      const value = currentTheme === 'dark' ? 'light' : 'dark'

      theme.value = value;
      nuxt.$e.theme.set(value);
    };

    return { toggleTheme };
  },

  computed: {
    actions() {
      return [
        {
          icon: this.$e.theme.get.value != 'dark' ? 'hgi-sun-03' : 'hgi-moon-02',
          click: this.toggleTheme,
        }
      ]
    }
  },

  data() {
    return {
      forms: {
        name: 'John Doe',
        hobby: '',
        hobby_id: 0
      },

      tabs: [
        { label: 'Biodata', icon: 'hgi-user-circle-02' },
        { label: 'Education', icon: 'hgi-pencil' },
        { label: 'Works', icon: 'hgi-briefcase-08' },
      ],

      tab: 0,
      hobbies: <any>[]
    }
  },

  methods: {
    onInit(value: any) {
      const data = [
        { id: 1, label: 'Reading' },
        { id: 2, label: 'Traveling' },
        { id: 3, label: 'Cooking' },
      ]

      this.hobbies = data.map((item) => ({
        value: item.id,
        label: item.label
      }));

      this.forms.hobby_id = 3

      setTimeout(() => {
        this.forms.hobby_id = 1
        console.log('change value')
      }, 1000);
    },

    onEnter() {
      console.log('Enter key pressed');
    },

    onFocus(value: boolean) {
      (this.$refs.form as any)?.enterable(value);
      console.log(value)
    },

    onSubmit() {
      this.$loading()

      setTimeout(() => {
        this.$loading(false)
        this.$modal.callback(this.forms);
      }, 1000);
    }
  },
}
</script>

<style lang="scss">
[data-bs-theme="dark"] {
  --card-tab-color: #1f2937;
  --card-background-color: #273144;
}

.modal-body .card {
  background-color: var(--card-background-color);
  box-shadow: none;
}

.modal-body .card-tabs {
  .nav-tabs .nav-link {
    background: var(--card-tab-color);
  }

  .nav-tabs .nav-link.active {
    background: var(--card-background-color);
  }
}
</style>