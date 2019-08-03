interface creatConfig{
    timeout?:number,
    baseUrl?:string,
    headers?:any,
    transformRequest?:any
}

let config:creatConfig = Object.create(null);
config.timeout = 10000;
config.baseUrl = 'https://www.easy-mock.com/mock/5d439c9550ac9902ba740963/typescript';
config.headers = {
    "X-Requested-With":"XMLHttpRequest",
    "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
};
config.transformRequest = [
    function(data:object){
        let datastr:string = JSON.stringify(data)
        console.log('transformRequest',datastr)
        return datastr
    }
];

export default config