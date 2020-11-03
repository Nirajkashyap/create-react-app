
import { ajax} from 'rxjs/ajax';
import {map,catchError, takeUntil, filter } from 'rxjs/operators';
import { of } from 'rxjs';


export function getCookie(cname) {
    const name = cname + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}



export function update_cache(address,selectedTileSource){
    const selectedTile = selectedTileSource;
    console.log('update_cache',selectedTile);

    if(selectedTile){
        if((!!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)) === true){
          const constLocal = localStorage.getItem("cache_address_"+selectedTile) !== null ? localStorage.getItem("cache_address_"+selectedTile) : "{}";

            const cacheAddress  =  JSON.parse( constLocal !== null ? constLocal : "{}" );
            let keyAddress = address.trim();
            keyAddress = keyAddress.replace(/ +?/g, '');
            keyAddress = keyAddress.replace(",", "");
            cacheAddress[keyAddress] = {value: address,time: Date.parse(new Date().toISOString()) };
            const checkDate = Date.parse(new Date().toISOString());
            for(const key of Object.keys(cacheAddress)){
                const tDate = cacheAddress[key].time;
                if((checkDate - tDate) > 24*60*60*1000){
                    // delete key
                    console.log(" greater than 24 hours" , key);
                    delete  cacheAddress[key];
                }
            }
            localStorage.setItem('cache_address_'+selectedTile, JSON.stringify(cacheAddress));
        }else {
            const cacheAddress = JSON.parse(getCookie("cache_address_"+selectedTile));
            let keyAddress = address.trim();
            keyAddress = keyAddress.replace(/ +?/g, '');
            keyAddress = keyAddress.replace(",", "");
            cacheAddress[keyAddress] = {value: address,time: Date.parse(new Date().toISOString()) };
            const checkDate = Date.parse(new Date().toISOString());
            for(const key of Object.keys(cacheAddress)){
                const tDate = cacheAddress[key].time;
                if((checkDate - tDate) > 24*60*60*1000){
                    // delete key
                    console.log(" greater than 24 hours" , key);
                    delete  cacheAddress[key];
                }
            }
            document.cookie = "cache_address_"+selectedTile+"="+JSON.stringify(cacheAddress)+";expires="+new Date(9999,0,0).toUTCString();
        }
    }else {
        
    }


};

window['update_cache'] =  update_cache;


export function getRequest(requestOptions , recievingFunction, recievingErrorFunction  = null, action$  , cancelAction = [] ){

    const requestOptionsObj = {
        crossDomain: true,
        method: 'GET',
        withCredentials: true
    };
    const mergedRequestOptions = Object.assign(requestOptionsObj,requestOptions);
    const cancelArray = ['CANCEL_ALL_XHR'].concat(cancelAction);

    return ajax(mergedRequestOptions).pipe(
        map(response => {
            // console.log(typeof  recievingFunction,  recievingFunction);
                let responseObj = []
                if(process.env.REACT_APP_API_URL === 'https://api.github.com'){
                   
                }else{
                    responseObj = response.response;
                }
                console.log(responseObj);

                return recievingFunction(responseObj);
            }
        ),
        takeUntil(action$.pipe(
            filter((action) => {
                return (cancelArray.indexOf(action.type) > -1)
            })
        )),
        catchError(err =>{
            console.log(err);

                if(typeof  recievingErrorFunction === 'function'){

                    return recievingErrorFunction(err);
                    // return of();
                }else{
                    return of();
                }



        })
    );
}

export function postRequest(requestOptions , recievingFunction, recievingErrorFunction  = null , action$ , cancelAction = [] ){

    const requestOptionsObj = {
        crossDomain: true,
        method: 'POST',
        withCredentials: true
    };
    const mergedRequestOptions = Object.assign(requestOptionsObj,requestOptions);
    const cancelArray = ['CANCEL_ALL_XHR'].concat(cancelAction);

    return ajax(mergedRequestOptions).pipe(
        map(response => {

            return recievingFunction(response.response);
        }),
        takeUntil(action$.pipe(
            filter((action) => {
                return (cancelArray.indexOf(action.type) > -1)
            })
        )),
        catchError((err) =>{



                if(typeof  recievingErrorFunction === 'function'){
                    console.log(err);
                    return recievingErrorFunction(err)
                }else{
                    return of();
                }


        })
    );
}



// expose api client
let apiClient;
apiClient = {};

Object.defineProperty(apiClient, "getRequest", {
    value: Object.freeze(getRequest),
    writable: false
});

Object.defineProperty(apiClient, "postRequest", {
    value: Object.freeze(postRequest),
    writable: false

});

Object.defineProperty(window, "apiClient", {
    value: Object.freeze(apiClient),
    writable: false

});


