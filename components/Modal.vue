<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
    isOpen: boolean;
    closeOnOverlay: boolean;
    close: () => void;
}>();

const isOpen = computed(() => props.isOpen);
const onClick = () => {
   if (props.closeOnOverlay) {
       props.close();
   }
};

</script>


<template>
    <div class="modal" v-show="isOpen">
        <div class="modal__overlay" @click="onClick">
            <div class="modal__content" @click.stop>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .modal__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal__content {
    background-color: white;
    padding: 20px;
    border-radius: 6px;
    width: 80%;
    max-width: 500px;
}

</style>