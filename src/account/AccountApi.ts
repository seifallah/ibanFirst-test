const corsPath = "https://cors-anywhere.herokuapp.com/";
const apiPath= "api.ibanfirst.com/PublicAPI/";

interface IResponse  {
    status?:number,
    errorMessage?:string,
    accounts?:any
}

const accountApi = {
    async get() {
        let json:IResponse={};
        let response;
        try {
            response = await fetch(`${corsPath}platform.ibanfirst.com/js/dataTestDevFront.json`, {
                headers: {
                    Accept: 'application/json'
                }
            });
            json = await response.json();
        }
        catch (e) {
            const {status, statusText} = response;
            json.status =status;
            json.errorMessage = statusText;
        }
        return json;
    },
    async getRate(instrument:string) {
        let json:IResponse={};
        let response;
        try {
            response = await fetch(`${corsPath}${apiPath}/Rate/${instrument}`, {
                headers: {
                    Accept: 'application/json'
                }
            });
    
            json = await response.json();
        }
        catch(e) {
            const {status, statusText} = response;
            json.status =status;
            json.errorMessage = statusText;
        }
        return json;            
    },
}
export default accountApi;