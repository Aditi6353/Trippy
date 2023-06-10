import request from "./request";
const ENDPOINT ="api/user";
const card_details_fetch_url ="api/book/all";
const login=async(values)=>
{
    const url=`${ENDPOINT}/Login`;
    return request.post(url,values).then((res)=>{
        return res;
    });
};

const create=async(values)=>
{
    const data=JSON.stringify(values);
    console.log(data);
    const url=`${ENDPOINT}`;
    return request.post(url,data).then((res)=>{
        return res;
    });
};
const card_details_fetch=async()=>
{
    const url=`${card_details_fetch_url}`;
    return request.get(url).then((res)=>{
        return res;
    });
};
const authService=
{
    login,
    create,
    card_details_fetch,
};

export default authService;

