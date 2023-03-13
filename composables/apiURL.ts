const url = 'http://imagetmdb.com/'
const apiUrl = 'http://localhost:7000/'



const apiURL = {
    originalImage: (imgPath:string) => `${url}t/p/original${imgPath}`,
    imagePoster: (imgPath:string) => `${url}t/p/w500${imgPath}`,
    imageW300: (imgPath:string) => `${url}t/p/w300${imgPath}`,
    videoURL: (videoPath:string) => `${apiUrl}${videoPath}`
}

export default apiURL