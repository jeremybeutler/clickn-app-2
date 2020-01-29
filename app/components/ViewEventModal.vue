<template>
	<StackLayout>
		<GridLayout rows="auto" columns="*" style="margin-top: 10; margin-bottom: 20;" backgroundColor="white">
			<Label row="0" verticalAlignment="center" horizontalAlignment="center" class="h2" :text="event.title" />
			<Image row="1" verticalAlignment="center" horizontalAlignment="right" stretch="none" src.decode="font://&#xe870;" class="lnr" style="font-size: 10; margin-right: 15;" @tap="$modal.close()"></Image>
		</GridLayout> 
		<GridLayout rows="auto, auto, auto" columns="auto" style="margin-left: 35;">
			<GridLayout row="0" rows="auto, auto" columns="50, *" style="margin-bottom: 15;">
				<Image row="0" col="0" src.decode="font://&#xe864;" class="lnr" stretch="none" style="font-size: 10; margin-right: 18;" ></Image>
				<Label row="0" col="1" :text="durationUntilDate(this.event.datetime_start)" />
				<Label row="1" col="1" :text="convertUTCStringToDate(this.event.datetime_start)" />
			</GridLayout>
			<GridLayout row="1" rows="auto" columns="50, *" style="margin-bottom: 15;">
				<Image row="0" col="0" src.decode="font://&#xe833;" class="lnr" stretch="none" style="font-size: 10; margin-right: 18;" ></Image>
				<Label row="0" col="1" :text="formatStreetAddress(this.event.street_address)" />
			</GridLayout>
			<GridLayout row="2" rows="auto, auto" columns="50, *" style="margin-bottom: 15;">
				<Image row="0" col="0" src.decode="font://&#xe82b;" class="lnr" stretch="none" style="font-size: 10; margin-right: 18;" ></Image>
				<Label row="0" col="1" text="AVAILABLE SPACES" />
				<Label row="1" col="1" text="SLIDER" />
			</GridLayout>
		</GridLayout>
	</StackLayout>
	<!-- <FlexboxLayout> -->
		<!-- <Label class="h2" :text="event.title" />
		<Image stretch="none" src.decode="font://&#xf00d;" class="fa t-14" @tap="$modal.close()"></Image> -->
		<!-- <Label text="Label 1" width="100" height="50" backgroundColor="red"/>
		<Label text="Label 2" width="100" height="50" backgroundColor="green"/>
		<Label text="Label 3" width="100" height="50" backgroundColor="blue"/>
	</FlexboxLayout> -->
</template>

<script>
import axios from 'axios'
var moment = require('moment');
import Event from '../data/event'
export default {
	props: ['event'],
    data() {
        return {};
	},
	methods: {
		durationUntilDate(utcString) {
            return 'In ' + moment.duration(Date.parse(utcString) - Date.now(), 'milliseconds').humanize()
		},
		convertUTCStringToDate(utcString) {
			var dateString = moment(utcString).utc().format("dddd, MMMM Do YYYY, h:mm a");
			return dateString
		},
		formatStreetAddress(street_address) {
			return "Nearby " + this.event.street_address 
		}
	}
};
</script>

<style>
.closebutton {
	border-color: transparent;
    border-width: 1;
	background-color: transparent;
}
</style>
