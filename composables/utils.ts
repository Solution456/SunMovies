

export const debounce = (_fn:() => void, wait:number) => {
    let timer:ReturnType<typeof setTimeout>
    return (...args: any) => {
        if(timer) {
            clearTimeout(timer)
        }
        
        timer = setTimeout(() => {
            _fn.apply(this, args)
        },wait)

    }

}

export const useInterval = (
    callback: () => void,
    delay: number | null | false,
    immediate?: boolean
) => {
    const savedCallback = ref<Function>()

    savedCallback.value = callback


    if(delay === null || delay === false) return
    if(savedCallback.value !== undefined){
        const tick = () => (savedCallback.value as Function)()
        const id = setInterval(tick, delay)
        return () => clearInterval(id)
    }
    
}
