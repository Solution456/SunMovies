

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