<template>
    <div>
        <PageHeader title="Avatar" />

        <div class="row">
            <div class="col-6">
                <Row gap="5">
                    <Avatar url="https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg" size="xl" alt="JD" />
                    <Avatar :url="avatars[3].url" size="lg" alt="JD" />
                    <Avatar :url="avatars[2].url" size="md" alt="JD" />
                    <Avatar :url="avatars[1].url" size="sm" alt="JD" />
                </Row>

                <Code class="mt-3 mb-5" code='<Avatar url="" size="xl" alt="JD" />' />

                <Avatar :list="avatars" size="sm" radius="50%"  />

                <Code class="mt-3 mb-5" code='<Avatar :list="[]" size="sm" radius="50%" />' />

            </div>
        </div>
    </div>
</template>

<script lang="ts">

export default {
    setup() {
        return {}
    },

    data() {
        return {
            avatars: [
                { url: 'https://fiverr-res.cloudinary.com/images/q_auto,f_auto/gigs2/318751795/original/b543cef7d0a034f60fbb5dc3f48a74e47b0eb4ff/create-ai-generated-3d-cartoon-avatar-for-your-website.png' },
                { url: 'https://img.freepik.com/premium-photo/3d-illustration-cartoon-character-avatar-profile_1183071-178.jpg?w=360' },
                { url: 'https://img.freepik.com/premium-photo/3d-illustration-cartoon-character-avatar-profile_1183071-194.jpg?w=360' },
                { url: 'https://img.freepik.com/premium-photo/3d-illustration-cartoon-girl-character-avatar-profile_1183071-200.jpg' },
                { url: 'https://img.freepik.com/premium-photo/3d-illustration-cartoon-girl-character-avatar-profile_1183071-297.jpg' },
                { alt: '+5' }
            ]
        }
    },
}
</script>

<style lang="scss" scoped></style>