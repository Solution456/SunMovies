
const apiURL = {
    originalImage: (imgPath:string) => `https://image.tmdb.org/t/p/original${imgPath}`,
    imagePoster: (imgPath:string) => `https://image.tmdb.org/t/p/w500${imgPath}`,
    imageW300: (imgPath:string) => `https://image.tmdb.org/t/p/w300${imgPath}`
}

export default apiURL