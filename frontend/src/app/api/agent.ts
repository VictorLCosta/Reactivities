import axios, { AxiosError, AxiosResponse } from 'axios'
import { toast } from 'react-toastify';
import { history } from '../..';
import { PaginatedResult } from '../models/pagination';
import { Photo, Profile, UserActivity } from '../models/profile';
import { User, UserFormValues } from '../models/user';

import { Activity, ActivityFormValues } from './../models/activity';
import { store } from './../stores/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.interceptors.request.use(request => {
    const token = store.commonStore.token
    if (token) request.headers.Authorization = `Bearer ${token}`
    return request
})

axios.interceptors.response.use(async response => {
    if (process.env.NODE_ENV === 'development') await sleep(1000)
    const pagination = response.headers["pagination"]
    if (pagination) {
        response.data = new PaginatedResult(response.data, JSON.parse(pagination))
        return response as AxiosResponse<PaginatedResult<any>>
    }

    return response
}, (error: AxiosError) => {
    const {data, status, config, headers} = error.response!
    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data)
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found')
            }
            if (data.errors) {
                const modelStateErrors = []
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat()
            } else {
                toast.error(data)
            }
            break;

        case 401:
            if (status === 401 && headers['www-authenticate'].startsWith('Bearer error="invalid_token"')) {
                store.userStore.logout()
                toast.error('Session expired - please login again')
            }
            toast.error("unauthorised")
            break;

        case 404:
            history.push('/not-found')
            break;

        case 500:
            store.commonStore.setServerError(data)
            history.push('/server-error')
            break;
    }

    return Promise.reject(error)
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data

const requests = {
    get: <T> (url: string, params?: URLSearchParams) => axios.get<T>(url, { params: params }).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: (params: URLSearchParams) => requests.get<PaginatedResult<Activity[]>>("/activities", params),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: ActivityFormValues) => requests.post<void>("/activities", activity),
    update: (activity: ActivityFormValues) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`),
    attend: (id: string) => requests.post<void>(`/activities/${id}/attend`, {})
}

const Account = {
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user),
    fbLogin: (accessToken: string) => requests.post<User>(`/account/fbLogin?accessToken=${accessToken}`, {}),
    refreshToken: () => requests.post<User>('/account/refreshToken', {})
}

const Profiles = {
    get: (username: string) => requests.get<Profile>(`/profiles/${username}`),
    uploadPhoto: (file: Blob) => {
        let formData = new FormData()
        formData.append('File', file)

        return axios.post<Photo>('photos', formData, {
            headers: {"Content-type": 'multipart/form-data'}
        })
    },
    setMainPhoto: (publicId: string) => requests.post(`photos/${publicId}/setMain`, publicId),
    deletePhoto: (publicId: string) => requests.del(`photos/${publicId}`),
    edit: (profile: Partial<Profile>) => requests.put("/profiles/editProfile", profile),
    updateFollowing: (username: string) => requests.post(`/follow/${username}`, {}),
    listFollowings: (username: string, predicate: string) => requests.get<Profile[]>(`/follow/${username}?predicate=${predicate}`),
    listUserActivities: (username: string, predicate: string) => requests.get<UserActivity[]>(`/profiles/${username}/activities?predicate=${predicate}`)
}

const agent = {
    Activities,
    Account,
    Profiles
}

export default agent