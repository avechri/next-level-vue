<!--suppress ES6ShorthandObjectProperty -->
<template>
  <div>
    <h1>Create an Event</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect label="Select a category" :options="categories" v-model="event.category"/>

      <h3>Name & describe your event</h3>
      <BaseInput label="Title" v-model="event.title" type="text" placeholder="Title" class="field"/>
      //placeholder&type is here because if we wanna have a dynamic input it should be in the parent

      <BaseInput label="Description" v-model="event.description"
                 type="text" placeholder="Description" class="field"/>

      <h3>Where is your event?</h3>
      <BaseInput label="Location" v-model="event.Location"
                 type="text" placeholder="Location" class="field"/>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
        />
      </div>

        <BaseSelect label="Select a time" :options="times" v-model="event.time" class="field"/>

      <input
        type="submit"
        class="button -fill-gradient"
        value="Submit"
      >
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker';
import { mapGetters, mapState } from 'vuex';
import NProgress from 'nprogress';
import BaseSelect from '@/components/BaseSelect.vue';

export default {
  data() {
    const times = [];
    for (let i = 0; i < 24; i += 1) {
      times.push(`${i}:00`);
    }
    return {
      times,
      event: this.createFreshEventObject(),
      categories: this.$store.state.categories,
    };
  },
  methods: {
    createEvent() {
      NProgress.start();
      this.$store.dispatch('event/createEvent', this.event)
        .then(() => this.$router.push({
          name: 'event-show',
          params: { id: this.event.id },
        }),
        this.event = this.createFreshEventObject)
        .catch(() => {
          NProgress.done();
        });
    },
    createFreshEventObject() {
      const { user } = this.$store.state.user.user;
      const id = Math.floor(Math.random() * 10000000);
      return {
        id,
        user,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: [],
      };
    },
  },
  computed: {
    getEvent() {
      return this.$store.getters['event/getEventByID'];
    },
    ...mapGetters('event', ['getEventById']), // import getters from user module
    catLength() {
      // efficient way of getting store state if used in multiple components
      return this.$store.getters.catLength;
    },
    ...mapState([
      'user',
    ]),
  },
  components: {
    BaseSelect,
    Datepicker,
  },
};
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
