<script setup lang="ts">
import DocumentIcon from '@heroicons/vue/24/outline/DocumentIcon'

import type { TorrentFile } from '~~/types';



const props = defineProps<{
    item: TorrentFile
}>()
</script>

<template>
    <li
        class="torrent_item flex items-center overflow-hidden px-4 py-2 gap-2 hover:bg-opacity-10 hover:bg-gray-300 transition rounded-md cursor-pointer border-b border-b-gray-300 border-dashed">
        <div class="torrent_item__icon">
            <DocumentIcon class="w-8 h-8 text-yellow-300" />
        </div>
        <div class="torrent_item__body w-full  flex flex-wrap items-center justify-between">
            <div class="torrent_item__text">
                <p class="font-medium text-sm xs:text-lg "> {{ props.item.fileName }}</p>
            </div>
        </div>
    </li>
</template>