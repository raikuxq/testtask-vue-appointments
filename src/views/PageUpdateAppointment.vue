<template>
  <div class="update-appointment">
    <a-page-header @back="() => $router.go(-1)">
      <template slot="title">
        <h1 class="update-appointment__title">Update Appointment</h1>
      </template>
    </a-page-header>
    <div class="update-appointment__form">
      <form-appointment-data
        :current-date-timestamp="getAppointment.dateTimestamp"
        :current-description="getAppointment.description"
        :current-title="getAppointment.title"
        @confirm="sendForm"
      />
    </div>
  </div>
</template>

<script>
import FormAppointmentData from "@/components/appointment/forms/FormAppointmentData";
import { mapActions, mapState } from "vuex";

export default {
  name: "PageUpdateAppointment",
  components: {
    FormAppointmentData
  },
  computed: {
    ...mapState("appointments", ["appointments"]),
    getAppointment() {
      return this.appointments.find(
        appointment => appointment.id === this.$route.params.id
      );
    }
  },
  methods: {
    ...mapActions("appointments", ["updateAppointmentById"]),
    async sendForm({ title, description, fullDate }) {
      try {
        const data = {
          title,
          description,
          dateTimestamp: fullDate.valueOf()
        };

        await this.updateAppointmentById({
          id: this.$route.params.id,
          data
        });

        await this.$notification.success({
          message: "Appointment has been updated successfully"
        });

        await this.$router.push({ name: "PageHome" });
      } catch (e) {
        this.$notification.warning({
          message: "Cannot update appointment"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.update-appointment {
  &__form {
    margin: 30px 0;
    max-width: 495px;
  }
}
</style>
