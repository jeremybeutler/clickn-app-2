export default class Event {
    constructor(event) {
        this._id = event._id
        this._users = event.users
        this._owner = event.owner
        this._capacity = event.capacity
        this._title = event.title
        this._description = event.description
        this._tags = event.tags
        this._group_type = event.group_type
        this._datetime_start = event.datetime_start
        this._datetime_end = event.datetime_end
        this._datetime_open = event.datetime_open
        this._datetime_close = event.datetime_close
        this._status = event.status
        this._latitude = event.location.coordinates[1]
        this._longitude = event.location.coordinates[0]
        this._conversation = event.conversation
        this._street_address = event.street_address
    }

    get id() {
        return this._id
    }
    get users() {
        return this._users
    }
    get owner() {
        return this._owner
    }
    get capacity() {
        return this._capacity
    }
    get title() {
        return this._title
    }
    get description() {
        return this._description
    }
    get tags() {
        return this._tags
    }
    get group_type() {
        return this._group_type
    }
    get datetime_start() {
        return this._datetime_start
    }
    get datetime_end() {
        return this._datetime_end
    }
    get datetime_open() {
        return this._datetime_open
    }
    get datetime_close() {
        return this._datetime_close
    }
    get status() {
        return this._status
    }
    get latitude() {
        return this._latitude
    }
    get longitude() {
        return this._longitude
    }
    get conversation() {
        return this._conversation
    }

    get street_address() {
        return this._street_address
    }

    set id(value) {
        this._id = value
    }
    set users(value) {
        this._users = value
    }
    set owner(value) {
        this._owner = value
    }
    set capacity(value) {
        this._capacity = value
    }
    set title(value) {
        this._title = value
    }
    set description(value) {
        this._description = value
    }
    set tags(value) {
        this._tags = value
    }
    set group_type(value) {
        this._group_type = value
    }
    set datetime_start(value) {
        this._datetime_start = value
    }
    set datetime_end(value) {
        this._datetime_end = value
    }
    set datetime_open(value) {
        this._datetime_open = value
    }
    set datetime_close(value) {
        this._datetime_close = value
    }
    set status(value) {
        this._status = value
    }
    set latitude(value) {
        this._latitude = value
    }
    set longitude(value) {
        this._longitude = value
    }
    set conversation(value) {
        this._conversation = value
    }

    set street_address(value) {
        this._street_address = this.street_address
    }
};