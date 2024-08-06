<template>
    <div class="sidebar">

        <ul class="controls">
            <li class="close"></li>
            <li class="minimize"></li>
            <li class="expand" @click="app.expand"></li>
        </ul>

        <div class="p-3">
            <div class="card card-body p-2">
                <div class="row">
                    <div class="col-auto">
                        <span class="avatar" :style="$style.image()"></span>
                    </div>
                    <div class="col">
                        <div class="text-truncate strong">
                            {{ $faker.name() }}
                        </div>
                        <div class="text-secondary small text-overflow"> {{ $faker.email() }} </div>
                    </div>
                </div>
            </div>
        </div>

        <ul class="d-block mb-auto">
            <li class="text-label">MAIN MENU</li>
            <li v-for="menu in menus">
                <NuxtLink :to="menu.path">
                    <div>
                        <Ti :icon="menu.icon" class="me-2" /> {{ menu.label }}
                    </div>

                    <span class="badge bg-red-lt" v-if="menu.badge"> {{ menu.badge }} </span>
                </NuxtLink>
            </li>
        </ul>

        <div class="bg-blue-lt rounded py-3 px-3 sb-footer">
            <h4> <Ti icon="ti-lock me-1"/> Security</h4>
            <p class="m-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi pariatur et magni illo aspernatur vero
                at minima.</p>
        </div>
    </div>
</template>

<script lang="ts">
import { useAppStore } from "@/stores/app";

export default {
    setup() {
        const app = useAppStore()
        return { app }
    },

    data() {
        return {
            menus: [
                { icon: 'ti-home', label: 'Dashboard', path: '/' },
                { icon: 'ti-bell', label: 'Notification', path: '#', badge: '99+' },
                { icon: 'ti-calendar-event', label: 'Calendar', path: '#' },
                { icon: 'ti-settings', label: 'Settings', path: '#' },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.sidebar {
    // background-color: white;
    width: 250px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    display: flex;
    flex-direction: column;

    .controls {
        margin-left: 18px;
        margin-top: 10px;

        li {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            display: inline-block;
            margin-right: 7px;
            cursor: pointer;
            transition: .1s;

            &.close {
                background: red
            }

            &.minimize {
                background: orange
            }

            &.expand {
                background: green
            }

            &:active {
                transform: scale(.8)
            }
        }
    }

    ul {
        padding: 0;
        margin: 0;
        list-style: none;

        li {
            cursor: pointer;

            a {
                display: inline-block;
                padding: 12px 20px;
                color: #777;
                font-size: 13px;
                text-decoration: none;
                display: inline-flex;
                justify-content: space-between;
                width: 100%;
            }

            &:hover {
                a {
                    color: #333
                }
            }

            &.text-label {
                font-size: 10px;
                margin-left: 17px;
                color: #777;
                margin-bottom: 15px;
            }
        }
    }

    .text-overflow {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }

    .sb-footer {
        margin: 10px 15px;
        border-radius: 5px;
        border: 1px #0054a6 dashed;
    }
}
</style>