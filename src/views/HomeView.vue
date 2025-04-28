<template>
    <div :class="store.theme">
        <Navigation />
        <Introduction />
        <Quote />
        <Summary />
        <Hobby />
    </div>
    <a-float-button @click="handleClick" />
</template>

<script setup>
import Navigation from '@/components/Navigation.vue'
import Introduction from '@/components/Introduction.vue'
import Quote from '@/components/Quote.vue'
import Summary from '@/components/Summary.vue'
import Hobby from '@/components/Hobby.vue'
import { useSettingsStore } from '@/stores/useSettingsStore'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useSettingsStore()
const handleClick = () => console.log('click');
</script>