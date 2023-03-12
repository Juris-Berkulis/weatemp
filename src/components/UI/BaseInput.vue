<script>
export default {
    name: 'BaseInput',
    props: {
        inputValue: {
            type: [String ,Number],
        },
    },
    methods: {
        updateInput(event) {
            this.$emit('update:inputValue', event.target.value);
        },
    },
}
</script>

<template>
    <input :value="inputValue" @input="updateInput" type="text" placeholder="Введите город">
</template>

<style>

</style>
