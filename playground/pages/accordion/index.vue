<template>
    <div>
        <PageHeader title="Accordion" />

        <div class="row">
            <div class="col-7">

                <Accordion :items="items" :open="[0]" />

                <br>
                <Code code='<Accordion :items="items" :open="[0]" :multiple="false" />' />
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
            items: [
                {
                    label: 'HTML',
                    content: 'HTML, or HyperText Markup Language, is the standard markup language for documents that are displayed in a web browser. It\'s used to define the structure and content of web content, such as paragraphs, lists, images, and data tables. HTML is often used with other technologies, such as Cascading Style Sheets (CSS) and JavaScript, to describe a web page\'s appearance, presentation, functionality, and behavior. '
                },

                {
                    label: 'CSS - Cascading Style Sheet',
                    content: 'CSS (Cascading Style Sheets) allows you to create great-looking web pages, but how does it work under the hood? This article explains what CSS is with a simple syntax example and also covers some key terms about the language.'
                },

                {
                    label: 'Javascript',
                    content: 'JavaScript (JS) is a scripting programming language that runs on web browsers to make web pages interactive. It\'s a fundamental language in web development and is used by every modern web app. JavaScript allows developers to create dynamically updating content, use animations, pop-up menus, clickable buttons, and control multimedia.'
                }
            ]
        }
    }
}
</script>

<style lang="scss" scoped></style>