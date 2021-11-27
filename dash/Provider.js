import {
    fetchUtils,
    GET_LIST,
    GET_ONE,
    GET_MANY,
    GET_MANY_REFERENCE,
    CREATE,
    UPDATE,
    UPDATE_MANY,
    DELETE,
    DELETE_MANY,
} from 'react-admin';

import axios from 'axios';

/**
 * Maps react-admin queries to a simple REST API
 *
 * The REST dialect is similar to the one of FakeRest
 * @see https://github.com/marmelab/FakeRest
 * @example
 * GET_LIST     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?filter={ids:[123,456,789]}
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertDataRequestToHTTP = (type, resource, params) => {
        let url = '';
        let email_='';
        email_ = localStorage.getItem("email");
        
        var emm={email_e:email_}
        const options = {method: 'GET'};
        switch (type) {
            case GET_LIST: {
                const { page, perPage } = params.pagination;
                let { field, order } = params.sort;
                order = order==='ASC' ? 'DESC' : 'ASC';
                let filter = JSON.stringify(params.filter);
                //let calls = JSON.stringify([{'moduleName':'app','className':'Web','method':resource,'params':{data:{'page':page,'perPage':perPage,'order_by':field,'type_order':order,'filters':params.filter}}}]);
                url = `${apiUrl}/web/${resource}`;
                url += `?page=${page-1}&limit=${perPage}`;
                url += `&field=${field}&order=${order}`;
                url += `&filter=${filter}`;
                url += `&mail=${email_}`;
                //options.body = JSON.stringify(email_);
                try{
                    let addGL=Object.assign( params.data,emm); 
                    options.body = JSON.stringify(addGL);
                } catch (e) {
                    console.error(e); 
                }
                break;
            }
            case GET_ONE: {
                
                url = `${apiUrl}/web/${resource}/${params.id}`;
                url += `?mail=${email_}`;
                //options.body = JSON.stringify(email_);
                try{
                    let addGO=Object.assign( params.data,emm); 
                    options.body = JSON.stringify(addGO);
                } catch (e) {}
                break;
            }
            case GET_MANY: {
                /*
                const query = {
                    filter: JSON.stringify({ id: params.ids }),
                };
                url = `${apiUrl}/web/${resource}?${stringify(query)}`;*/
                url = `${apiUrl}/web/${resource}`;
                url += `?mail=${email_}`;
                //options.body = JSON.stringify(email_);
                try{
                let addG=Object.assign( params.data,emm); 
                options.body = JSON.stringify(addG);
                } catch (e) {}
                break;
            }
            case GET_MANY_REFERENCE: {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const filter = {
                    ...params.filter,
                    [params.target]: params.id,
                };

                const query = {
                    sort: JSON.stringify([field, order]),
                    range: JSON.stringify([
                        (page - 1) * perPage,
                        page * perPage - 1,
                    ]),

                };

                url = `${apiUrl}/web/${resource}`;
                url += `?filter=${JSON.stringify(filter)}`;
                url += `&mail=${email_}`;
                //ptions.body = JSON.stringify(email_);
                try{
                    let addGM=Object.assign( params.data,emm); 
                    options.body = JSON.stringify(addGM);
                } catch (e) {}
                break;
            }
            case UPDATE:
                //let addU=Object.assign( params.data,emm); 
                //console.log(addU);
                url = `${apiUrl}/web/${resource}/${params.id}`;
                url += `?mail=${email_}`;
                options.method = 'PUT';
                //options.body = JSON.stringify(addU);
                try{
                let addU=Object.assign( params.data,emm); 
                options.body = JSON.stringify(addU);
                } catch (e) {}
                break;
            case CREATE:
               // let addC=Object.assign( params.data,emm);  
                
               // console.log(addC);
                url = `${apiUrl}/web/${resource}`;
                url += `?mail=${email_}`;
                options.method = 'POST';
                //options.body = JSON.stringify(addC);
                try{
                let addC=Object.assign( params.data,emm); 
                options.body = JSON.stringify(addC);
                } catch (e) {}
            //    console.log(options.body);
                break;
            case DELETE:
                
               url = `${apiUrl}/web/${resource}/${params.id}`;
               options.method = 'DELETE';
               // options.body = JSON.stringify(params.data); 
               try{
                   let addD=Object.assign( params.data,emm); 
                   options.body = JSON.stringify(addD);
               } catch (e) {}
               break;
            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        //console.log("provide "+url +" " +options)
        return { url, options };
    };

    const convertFileToBase64 = file =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;

            reader.readAsDataURL(file.rawFile);
        });

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} Data response
     */
    const convertHTTPResponse = (response, type, resource, params) => {
        
        const json = response.data;
        let clean_data;
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                clean_data = json;
                return {
                    data: clean_data.resources,
                    total: clean_data.count
                };
            case CREATE:
                return { data: { ...params.data, id: json.id } };
            case GET_MANY:
                clean_data = json;
                return {
                    data: clean_data.resources,
                    total: clean_data.count
                };
            case GET_ONE:
                return {data: json};
            case UPDATE:
                return {data: json};
            case DELETE:
                return {data: json};
            default:
                return {data: json};
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    return async (type, resource, params) => {

        // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {
            return Promise.all(
                params.ids.map(id => {
                        console.log(`Update many ${id}`);
                        let _resource = `put_${resource}`;
                        params.data.id = id;
                        let calls = JSON.stringify([{
                            'moduleName': 'app',
                            'className': 'Web',
                            'method': _resource,
                            'params': {'data': {...params.data}}
                        }]);
                        let url = `${apiUrl}?calls=${calls}`;
                        console.log(url);
                        httpClient(url, {
                            method: 'GET'
                        });

                    }
                )
            ).then(responses => ({
                    data: responses.map(response => response),
                })
            );
        }
        // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/web/${resource}/${id}`, {
                        method: 'DELETE',
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json),
            }));
        }


        const {url, options} = convertDataRequestToHTTP(
            type,
            resource,
            params
        );

        let data = {};
        if (options.method === "POST" || options.method === "PUT") {
            console.log("POST or PUT");
            data = JSON.parse(options.body);
            console.log(data.image)
        }

        let image = data.image && (typeof data.image != 'string') ? await convertFileToBase64(params.data.image) : null;

        return axios({
            url,
            method: options.method,
            data: data.image ? {...data, image} : data
        })
            .then(response =>
                convertHTTPResponse(response, type, resource, params)
            );
    };


};
