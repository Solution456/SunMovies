

export const useDisplay = ()=> {


    const isMobile = ref(false)


    const onResize = throttle(() => {
        isMobile.value = window.innerWidth < 600
    },500)
    

    onMounted( ()=> {
        onResize()
        window.addEventListener('resize', onResize, {passive:true})
    })

    onUnmounted( ()=> {
        if (typeof window === 'undefined') return

        window.removeEventListener('resize', onResize)
            
        
    })

    return isMobile
}