<script setup lang="ts">
import DocumentIcon from '@heroicons/vue/24/outline/DocumentIcon'
import { TorrentInfo } from '~~/types';

interface TorrentProps {
    torrents: TorrentInfo[]
}

const props = defineProps<TorrentProps>()


</script>



<template>
    <div id="torrent" class="torrent my-10">
        <div class="torrent__count">
            Found <span class="text-yellow-300">{{ torrents.length }}</span> torrent/s
        </div>
        <ul v-if="torrents.length > 0" class="torrent_list mt-2">
            <li v-for="torrent of props.torrents" :key="torrent.magnet"
                class="torrent_item flex items-center overflow-hidden px-4 py-2 gap-2 hover:bg-opacity-10 hover:bg-gray-300 transition rounded-md cursor-pointer border-b border-b-gray-300 border-dashed">
                <div class="torrent_item__icon">
                    <DocumentIcon class="w-8 h-8 text-yellow-300" />
                </div>
                <div class="torrent_item__body w-full  flex flex-wrap items-center justify-between">
                    <div class="torrent_item__text">
                        <p class="font-medium text-sm xs:text-lg "> {{ torrent.title }}</p>
                        <a :href="torrent.torrentUrl" target="_blank" class="font-light text-xs xs:text-sm"> {{ torrent.torrentUrl
                        }}</a>
                    </div>
                    <div class="torrent_item__button mt-4">
                        <PublicBaseButton size="sm">Смотерть</PublicBaseButton>
                    </div>
                </div>
            </li>
        </ul>
        <div v-else class="w-full flex items-center justify-center mt-2">
            <p>Sorry, nothing <span>could be found</span> 🥺</p>
        </div>
    </div>
</template>