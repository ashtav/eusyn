<template>
    <div class="p-5 wallet">

        <PageHeader title="Wallet" />

        <div class="row">
            <div class="col-lg-4">
                <div class="card card-body bg-dark text-white">
                    <h3 class="m-0">Wallet Name</h3>
                    <p class="created">2024 08 10 . 15 25 02</p>

                    <p class="m-0">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit, mpedit eum maxime!
                    </p>

                    <ul class="control">
                        <li> <span>
                                <Ti icon="ti-pencil" />
                            </span> </li>
                        <li> <span>
                                <Ti icon="ti-trash" />
                            </span> </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    setup() {

        definePageMeta({
            middleware: 'auth',
        })


        return {}
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