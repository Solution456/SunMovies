<script setup lang="ts">

interface imageProps{
    width:string
    height?:string 
    minHeight?:string | 'auto'
    maxHeight?:string | 'auto'
    maxWidth?:string
    url:string
}

const props = withDefaults(defineProps<imageProps>(), {
    height:'',
    maxHeight:'0',
    minHeight:'0',
    maxWidth:'0'
})
</script>


<template>
    <div class="movie-image rounded" :style="`min-height: ${props.minHeight}px; width:${props.width}px`">
        <div class="image__sizer pb-[132%] transition-[padding-bottom] flex-grow shrink-0 ">
            
        </div>
        <div class="movie-image__image "
            :style="`background-image:url('${props.url}')`">
        </div>
    </div>
</template>

<style scoped>
.movie-image__image{
    background-size: cover;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-position: center center;
}

.movie-image{
    display: flex;
    position: relative;
    max-width: 100%;
    overflow: hidden;
}
</style>
