const setItem = (key:string, vlaue:any)=>{
    localStorage.setItem(key, JSON.stringify(vlaue));
}   
const getItem = (key:string)=>{
    return JSON.parse(localStorage.getItem(key) as string);
}
const removeItem = (key:string)=>{
    localStorage.removeItem(key);
}
export {setItem, getItem, removeItem};