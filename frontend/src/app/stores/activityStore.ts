import { makeObservable, observable } from 'mobx'

class ActivityStore {
    title = ""

    constructor () {
        makeObservable(this, {
            title: observable
        })
    }
}

export default ActivityStore