export const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));
export const LogOut = () => {
    localStorage.clear();
    window.location.replace("/");
}
export const capitalize = (title: string) => {
    return title.charAt(0).toUpperCase() + title.substring(1);
}

export const decodeUrl = (encodedVal: string) => {
    if (encodedVal.length % 4) {
      encodedVal = encodedVal + "=".repeat(4 - (encodedVal.length % 4));
    }
    try{
      return JSON.parse(window.atob(encodedVal));
    }catch(err){
      return {error:true};
    }
    
  };