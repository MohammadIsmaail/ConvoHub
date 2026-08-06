const createResponse = (res:any,success:any,code:any,message:any,data:any,error:any)=>{
    return res.json({
        success,
        code,
        message,
        data,
        error
    });
};
export default createResponse;