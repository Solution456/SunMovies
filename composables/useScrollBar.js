import OverlayScrollbars from 'overlayscrollbars'



const config = {
    overflowBehavior: {
        y:'scroll'
    },
}


const useScrollbar = (root) => {
    


    onMounted(() => {
        let scrollbars
        if(root?.value){
            scrollbars = OverlayScrollbars(root.value, config)
        }

        
    })



    

}

export {useScrollbar}