class AuthApi{
    constructor({baseUrl}){
       this._baseUrl = baseUrl;
    }

    _checkResponse(res){
        if(res.ok){  
            return res.json();
            }
            return Promise.reject(res.status)
    }

    _registration(){
        return fetch(`${this._baseUrl}/signup`, 

        )
        .then(this._checkResponse);
    }

    _authorization(){
        return fetch(`${this._baseUrl}/signin`, 

        )
        .then(this._checkResponse);
    }
}

const authApi = new AuthApi({
    baseUrl: 'https://auth.nomoreparties.co/',
});

export default authApi;