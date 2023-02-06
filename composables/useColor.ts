const image = (src:string) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.src = src + '?not-from-cache-please'
    img.width = 400
    img.height = 300

    return img
}


const getColor = (imageEl:HTMLImageElement, ratio:number) => {
    console.log('@@@@',imageEl)
    const canvas = document.createElement('canvas') as HTMLCanvasElement
    
    const width = canvas.width = imageEl.width
    const height = canvas.height = imageEl.height

    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    context.drawImage(imageEl,0,0)

    let data, length

    let i = -4, count = 0

    try{
        data = context.getImageData(0,0,width,height)
        length = data?.data.length
    } catch (err) {
        console.error(err)
        return {
            R:0,
            G:0,
            B:0
        }
    }

    let R,G,B 
    R = G = B = 0

    while ((i+= ratio * 4) < length) {
        ++count

        R += data.data[i]
        G += data.data[i+1]
        B += data.data[i+2]
    }

    R = ~~(R / count)
    G = ~~(G / count)
    B = ~~(B / count)


    return {
        R,
        G,
        B
    }
}


export const useColor = (src:string) => {

    const img = image(src)
    const {R,G,B} = getColor(img,4)

    return computed(() => `rgb(${R},${G},${B})`)

}
