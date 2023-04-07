<script setup lang="ts">
import BackwardIcon from '@heroicons/vue/24/outline/BackwardIcon'
import ForwardIcon from '@heroicons/vue/24/outline/ForwardIcon'
import SpeakerwaveIcon from '@heroicons/vue/24/outline/SpeakerWaveIcon'
import SpeakerXMarkIcon from '@heroicons/vue/24/outline/SpeakerXMarkIcon'
import ExpandIcon from '@heroicons/vue/24/outline/ArrowsPointingOutIcon'
import PlayIcon from '@heroicons/vue/24/solid/PlayIcon'
import PauseIcon from '@heroicons/vue/24/solid/PauseIcon'


interface PlayerProps {
    Source: string
}

const props = defineProps<PlayerProps>()

const VideoPlayer = ref<HTMLVideoElement | null>(null)
const progressBar = ref<HTMLDivElement | null>(null)
const volumeSlider = ref<HTMLInputElement | null>(null)
const container = ref<HTMLDivElement | null>(null)
const videoTimeline = ref<HTMLDivElement | null>(null)


const setPlayPause = ref(false)
const muteVolume = ref(false)
const fullscreen = ref(false)
const currentVideoTime = ref('00:00')
const VideoDuration = ref('00:00')



// Utils
const formatTime = (time:number) => {
    let seconds: string | number = Math.floor(time % 60)
    let minutes: string | number = Math.floor(time / 60) % 60
    let hours: string | number = Math.floor(time / 3600)

    seconds = +seconds < 10 ? `0${seconds}` : seconds
    minutes = +minutes < 10 ? `0${minutes}` : minutes
    hours = +hours < 10 ? `0${hours}` : hours

    if(hours == 0){
        return `${minutes}:${seconds}`
    }
    return `${hours}:${minutes}:${seconds}`
}


const timeUpdateHandle = (e: any) => {
    const { currentTime, duration } = e.target
    const prc = (currentTime / duration) * 100
    if (progressBar.value) {
        progressBar.value.style.width = `${prc}%`
    }
    currentVideoTime.value = formatTime(currentTime)


}

const loadedDataHandler = (e: any) => {
    VideoDuration.value = formatTime(e.target.duration)
}

const videoTimelineHandler = (e: any) => {
    const timelineWidth = (videoTimeline.value as HTMLDivElement).clientWidth
    if(VideoPlayer.value)
        VideoPlayer.value.currentTime = (e.offsetX / timelineWidth) * VideoPlayer.value.duration
}

const volumeHandler = () => {
    muteVolume.value = !muteVolume.value
    if (VideoPlayer.value)
        if (!muteVolume.value){
            VideoPlayer.value.volume = 0.5
        }   
        else{
            VideoPlayer.value.volume = 0
        }
        if(VideoPlayer.value && volumeSlider.value)
            volumeSlider.value.valueAsNumber = VideoPlayer.value.volume 
            
}

const VolumeSliderHandler = (event: Event) => {
    if (VideoPlayer.value)
        VideoPlayer.value.volume = +(event.target as HTMLInputElement).value 
        if(+(event.target as HTMLInputElement).value === 0)
            muteVolume.value = true
        else
            muteVolume.value = false
}

const fullscreenHandler = () => {
    console.log(VideoPlayer)
    // fullscreen.value = !fullscreen.value
    if(document.fullscreenElement){
        return document.exitFullscreen()
    }
    container.value?.requestFullscreen()
    
}

const skipBackward = () => {
    if (VideoPlayer.value)
        VideoPlayer.value.currentTime -= 5
}

const skipForward = () => {
    if (VideoPlayer.value)
        VideoPlayer.value.currentTime += 5
}

const PlayPause = () => {
    setPlayPause.value = !setPlayPause.value
    VideoPlayer.value?.paused ? VideoPlayer.value.play() : VideoPlayer.value?.pause()
}









</script>


<template>
    <div ref="container" class="videoPlayer  relative max-w-4xl w-[98%] m-auto">
        <div class="wrapper z-10 absolute left-0 right-0 bottom-0">
            <div ref="videoTimeline" @click="videoTimelineHandler" class="video-timeline h-2 w-full cursor-pointer">
                <div class="progress-area h-1 bg-slate-50">
                    <span class="absolute -top-6 hidden text-xs text-white">00:00</span>
                    <div ref="progressBar" class="progress-bar h-full bg-yellow-300 w-0 transition-[width]"></div>
                </div>
            </div>
            <ul class="video-controls flex items-center justify-center py-4 px-1">
                <li class="options w-full left flex items-center justify-start">
                    <button @click="volumeHandler" class="volume h-5 w-5">
                        <SpeakerwaveIcon v-if="!muteVolume" />
                        <SpeakerXMarkIcon v-else\ />
                    </button>
                    <input ref="volumeSlider" class="h-1 max-w-[75px]" @input="VolumeSliderHandler" type="range" min="0" max="1" step="any">
                    <div class="video-timer flex items-center justify-center text-xs ml-3">
                        <p class="current-time">{{ currentVideoTime }}</p>
                        <p class="separator">/</p>
                        <p class="video-duration">{{ VideoDuration }}</p>
                    </div>
                </li>
                <li class="options w-full center  flex items-center justify-center">
                    <button @click="skipBackward" class="skip-backward h-5 w-5">
                        <BackwardIcon />
                    </button>
                    <button @click="PlayPause" class="play-pause h-5 w-5">
                        <PlayIcon v-if="!setPlayPause" />
                        <PauseIcon v-else />
                    </button>
                    <button @click="skipForward" class="skip-forward h-5 w-5">
                        <ForwardIcon />
                    </button>
                </li>
                <li class="options w-full right  flex items-center justify-end">
                    <button @click="fullscreenHandler" class="fullscreen h-5 w-5">
                        <ExpandIcon />
                    </button>
                </li>

            </ul>
        </div>
        <video @loadeddata="loadedDataHandler" @timeupdate="timeUpdateHandle" ref="VideoPlayer"  class="w-full"
            :src="props.Source"></video>
    </div>
</template>