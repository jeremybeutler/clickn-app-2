<template>
    <Page class="page" xmlns:maps="nativescript-google-maps-sdk">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Map"></Label>
        </ActionBar>

        <GridLayout class="page-content">
            <!-- <MapView /> -->
            <Mapbox
                accessToken="pk.eyJ1IjoiY2xpY2tuIiwiYSI6ImNqdzhyZWZhazF5ZWMzenMwM200d2YzYnEifQ.AJs2nD_1XKA288fboJuFSw"
                mapStyle="light"
                hideCompass="true"
                zoomLevel="10"
                showUserLocation="true"
                disableZoom="false"
                disableRotation="false"
                disableScroll="false"
                disableTilt="false"
                @mapReady="onMapReady($event)"
                @locationPermissionGranted="onMapReady($event)"
                ref="map"
            >
            </Mapbox>
            <GridLayout rows="auto" verticalAlignment="bottom" horizontalAlignment="center" marginBottom="10" v-if="showEventsPreview" >
            <ScrollView orientation="horizontal" scrollBarIndicatorVisible="false" ref="scrollView">
                <WrapLayout orientation="horizontal">
                    <template v-for="event in events" :v-bind:key="event.id">
                        <GridLayout class="eventCard" columns="275, 100" rows="40, auto, auto" marginBottom="15" marginLeft="8" marginRight="8" backgroundColor="white" >
                            <Label class="eventTitle" padding="5" :text="event.title" row="0" colSpan="2" />
                            <Label padding="5" :text="durationUntilDate(event.datetime_start)" row="1" colSpan="2" />
                            <Label padding="5" :text="event.description" row="2" colSpan="2" />
                            <!-- <GridLayout row="3" col="1" > -->
                                <Button row="3" col="1" text="Join" @tap="showEventPreviewModal(event)"></Button>
                            <!-- </GridLayout> -->
                        </GridLayout>
                    </template>
                </WrapLayout>
            </ScrollView>        
            </GridLayout>
        </GridLayout>
    </Page>
</template>

<script>
import axios from 'axios'
import Event from '../data/event'
import ViewEventModal from './ViewEventModal'
var moment = require('moment');
const geolocation = require("nativescript-geolocation");
const { Accuracy } = require("tns-core-modules/ui/enums");
var mapbox = require("nativescript-mapbox");
export default {
    data: () => {
        return {
            apiURL: 'http://10.0.2.2:3000',
            // apiURL: 'http://10.104.1.122:3000',
            scrollTimer: null,
            mapCenter: {
                latitude: null,
                longitude: null
            },
            mapRadius: null,
            events: [],
            showEventsPreview: false
        };
    },
    methods: {
        showEventPreviewModal(event) {
            this.$showModal(ViewEventModal, 
                { fullscreen: true, props: { event: event }}
            )
        },
        durationUntilDate(utcString) {
            return 'In ' + moment.duration(Date.parse(utcString) - Date.now(), 'milliseconds').humanize()
        },
        async selectEvent(eventId) {
            // let event = await axios.get('http://10.104.1.122:3000/events/' + eventId)
            // this.selectedEvent = new Event(event.data)
            const selectedEventIndex = this.events.map(e => e.id).indexOf(eventId);
            this.showEventsPreview = true
            let scrollOffset = 390 * selectedEventIndex
            let scrollView = this.$refs.scrollView.nativeView
            scrollView.scrollToHorizontalOffset(scrollOffset, true)
        },
        async onMapReady(args) {
            let self = this
            let markers = []
            // if no permission was granted previously this will open a user consent screen
            // await this.$refs.map.nativeView.requestFineLocationPermission();
            await this.getLocation();
            await args.map.setCenter({
                lat: this.mapCenter.latitude,
                lng: this.mapCenter.longitude,
                animated: true
            })
            let viewport = await args.map.getViewport()
            this.mapRadius = this.calculateViewportRadius(viewport)
            let qs = this.buildQueryString({
                status: "active",
                latitude: this.mapCenter.latitude,
                longitude: this.mapCenter.longitude,
                search_radius: this.mapRadius
            })
            let request = await axios.get(this.apiURL + '/events?' + qs)
            for (let key in request.data.events) {
                let event = new Event(request.data.events[key])
                let marker = {
                    id: event.id,
                    lat: event.latitude,
                    lng: event.longitude,
                    onTap: () => this.selectEvent(marker.id)
                }
                markers.push(marker)
                this.events.push(event)
            }
            await args.map.addMarkers(markers)
            this.setOnScrollListener();
        },
        async setOnScrollListener() {
            let self = this
            this.$refs.map.nativeView.setOnScrollListener((point) => {
                if(self.scrollTimer !== null) {
                    clearTimeout(self.scrollTimer);        
                }
                self.scrollTimer = setTimeout(async function() {
                    let center = await self.$refs.map.nativeView.getCenter();
                    self.mapCenter.latitude = center.lat;
                    self.mapCenter.longitude = center.lng;
                    self.getNearbyEvents();
                }, 1500);
            });
        },
        async getNearbyEvents() {
            console.log('getting events')
            let markers = []
            let qs = this.buildQueryString({
                status: "active",
                latitude: this.mapCenter.latitude,
                longitude: this.mapCenter.longitude,
                search_radius: this.mapRadius
            })
            let request = await axios.get(this.apiURL + '/events?' + qs)
            for (let key in request.data.events) {
                let event = new Event(request.data.events[key])
                if (this.events.some(e => e.id === event.id)) 
                    continue;

                let marker = {
                    id: event.id,
                    lat: event.latitude,
                    lng: event.longitude,
                    onTap: () => this.selectEvent(marker.id),
                }
                markers.push(marker)
                this.events.push(event)
            }
            await this.$refs.map.nativeView.addMarkers(markers)
            console.log(events)
        },
        async getLocation() {
            return new Promise(resolve => {
                geolocation.enableLocationRequest();
                geolocation
                .getCurrentLocation({
                    desiredAccuracy: Accuracy.high,
                    maximumAge: 5000,
                    timeout: 20000
                })
                .then(res => {
                    this.mapCenter.latitude = res.latitude
                    this.mapCenter.longitude = res.longitude
                    resolve(res)
                });
            })
        },
        calculateViewportRadius(viewport) {
            var R = 6371e3; // metres
            var φ1 = this.toRadians(viewport.bounds.south);
            var φ2 = this.toRadians(viewport.bounds.north);
            var Δφ = this.toRadians(viewport.bounds.north - viewport.bounds.south);
            var Δλ = this.toRadians(viewport.bounds.east - viewport.bounds.west);

            var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                    Math.cos(φ1) * Math.cos(φ2) *
                    Math.sin(Δλ/2) * Math.sin(Δλ/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c;
            return (d / 2);
        },
        toRadians(degrees) {
            var pi = Math.PI;
            return degrees * (pi/180);
        },
        buildQueryString(data) {
            if (typeof (data) === 'string') return data;
            
            var query = [];
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
                }
            }
            return query.join('&');
        }
    }
}
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "../app-variables";
// End custom common variables

// Custom styles
.eventTitle {
    font-size: 20em;
    color: black;
}

.eventCard {
    border-radius: 8
}

</style>