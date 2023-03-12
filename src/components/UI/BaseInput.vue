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
    <input class="input" :value="inputValue" @input="updateInput" type="text" placeholder="Введите город">
</template>

<style>
.input {
    width: 40%;
    padding: 15px;
    background-color: #eeeeee;
    border: 1px solid #eeeeee;
    border-radius: 15px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}

.input:focus {
    outline: none;
    border: 1px solid slateblue;
    border-right: 1px solid transparent;
}
</style>
