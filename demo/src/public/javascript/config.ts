interface creatConfig{
    timeout?:number,
    baseUrl?:string,
    headers?:any,
    transformRequest?:any
}

let config:creatConfig = Object.create(null);
config.timeout = 10000;
config.baseUrl = 'http://rap2api.taobao.org/app/mock/178159';
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