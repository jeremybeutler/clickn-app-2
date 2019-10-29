<template lang="html">
    <BottomNavigation>
        <TabStrip>
            <TabStripItem>
                <!-- <Button> -->
                <!-- <Button class="nav-btn purple"> -->
                    <Label text="Create"></Label>
                    <Image src.decode="font://&#xf055;" class="fa t-36"></Image>
                <!-- </Button> -->
                <!-- </Button> -->
            </TabStripItem>
            <TabStripItem>
                <Label text="Map"></Label>
                <Image src.decode="font://&#xf279;" class="fa t-36"></Image>
            </TabStripItem>
            <TabStripItem>
                <Label text="Events"></Label>
                <Image src.decode="font://&#xf073;" class="fa t-36"></Image>
            </TabStripItem>
            <TabStripItem>
                <Label text="Clicks"></Label>
                <Image src.decode="font://&#xf076;" class="fa t-36"></Image>
            </TabStripItem>
        </TabStrip>

        <TabContentItem>
            <Frame>
                <CreateEvent />
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame>
                <Map />
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame>
                <Events />
            </Frame>
        </TabContentItem>

        <TabContentItem>
            <Frame>
                <Clicks />
            </Frame>
        </TabContentItem>

    </BottomNavigation>
</template>

<script>
import CreateEvent from "./CreateEvent.vue";
import Map from "./Map.vue";
import Events from "./Events.vue";
import Clicks from "./Clicks.vue";

export default {
  components: {
    CreateEvent,
    Map,
    Events,
    Clicks
  }
};
</script>

<style lang="scss">
// Start custom common variables
@import "../app-variables";
// End custom common variables

// Custom styles

</style>
