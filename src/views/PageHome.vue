<template>
  <div class="home">
    <a-page-header class="home__header">
      <template slot="title">
        <h1 class="home__title">List of Appointments</h1>
      </template>
      <template slot="extra">
        <div class="home__actions">
          <div class="home__actions-item">
            <appointment-filter />
          </div>
          <div class="home__actions-item">
            <a-button
              key="1"
              type="primary"
              icon="plus"
              @click="pushToPageCreate"
            >
              Add new
            </a-button>
          </div>
        </div>
      </template>
    </a-page-header>
    <appointment-container />
  </div>
</template>

<script>
import AppointmentContainer from "@/components/appointment/AppointmentContainer";
import AppointmentFilter from "@/components/appointment/AppointmentFilter";

export default {
  name: "PageHome",
  components: {
    AppointmentContainer,
    AppointmentFilter
  },
  methods: {
    pushToPageCreate() {
      this.$router.push({ name: "PageCreateAppointment" });
    }
  }
};
</script>

<style lang="scss">
.home {
  &__actions {
    display: flex;
    justify-content: space-between;
    &-item {
      margin-right: 12px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
