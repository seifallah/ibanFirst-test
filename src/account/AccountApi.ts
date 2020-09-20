const corsPath = "https://cors-anywhere.herokuapp.com/";
const apiPath= "api.ibanfirst.com/PublicAPI/";

const accountApi = {
    async get() {
        const response = await fetch(`${corsPath}platform.ibanfirst.com/js/dataTestDevFront.json`, {
            headers: {
                Accept: 'application/json'
            }
        });

        const json = await response.json();

        if (response.ok) {
            return json;
        } else {
            throw new Error(json['stack-trace']);
        }
    },
    async getRate(instrument:string) {
        const response = await fetch(`${corsPath}${apiPath}/Rate/${instrument}`, {
            headers: {
                Accept: 'application/json'
            }
        });

        const json = await response.json();

        if (response.ok) {
            return json;
        } else {
            throw new Error(json['stack-trace']);
        }
    },
}
export default accountApi;