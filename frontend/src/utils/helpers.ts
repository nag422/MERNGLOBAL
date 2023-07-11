export const sleep = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));
export const LogOut = () => {
    localStorage.clear();
    window.location.replace("/");
}
export const capitalize = (title: string) => {
    return title.charAt(0).toUpperCase() + title.substring(1);
}