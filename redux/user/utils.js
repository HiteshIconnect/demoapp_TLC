export const setTimeLogin=()=>{
    let now=new Date()
    now.setMinutes(now.getMinutes()+30)
    now=new Date(now)

    console.log('time to be stored is ',now)

    return now
}