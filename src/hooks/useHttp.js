import {useState, useCallback} from "react";
const useHttp = () => {
    const [Error, setError] = useState(null);
    const sendRequest = useCallback(async (requestconfig,applyData) => {
        try{
            setError(null);
        const getresponse = await fetch(requestconfig.url, 
                {
                    method: requestconfig.method ?  requestconfig.method : 'GET',
                    body: requestconfig.body ? JSON.stringify(requestconfig.body) : null,
                    headers: requestconfig.headers ? requestconfig.headers : {}
                }
            );
            if (!getresponse.ok) {
                throw new Error('Request Failed!!!')
            }
            const data = await getresponse.json();
            applyData(data);
        } catch (error){

            setError(error.message || "Something Went Wrong");
        }
       
    } ,[])
    return {Error,sendRequest};
}
export default useHttp;

