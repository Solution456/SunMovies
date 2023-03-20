

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

export const throttle = (_fn:() => void, wait:number) => {
    let inThrottle: boolean,
    lastFn: ReturnType<typeof setTimeout>,
    lastTime: number;
  return function (this: any, ...args:any) {
    const context = this
    if (!inThrottle) {
      _fn.apply(context, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= wait) {
          _fn.apply(context, args);
          lastTime = Date.now();
        }
      }, Math.max(wait - (Date.now() - lastTime), 0));
    }
  };
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
