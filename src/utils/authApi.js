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

    registration(postInquiry){
        return fetch(`${this._baseUrl}/signup`, {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body:postInquiry,
            }
        )
        .then(this._checkResponse);
    }

    authorization(postInquiry){
        return fetch(`${this._baseUrl}/signin`, {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body:postInquiry,
            }
        )
        .then(this._checkResponse);
    }

    tokenCheck(getInquiry){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${getInquiry}`
            }
        }
    )
    .then(this._checkResponse);
}
}

const authApi = new AuthApi({
    baseUrl: 'https://auth.nomoreparties.co',
});

export default authApi;