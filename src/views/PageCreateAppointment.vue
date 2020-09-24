<template>
  <div class="create-appointment">
    <a-page-header @back="() => $router.go(-1)">
      <template slot="title">
        <h1 class="create-appointment__title">Create Appointment</h1>
      </template>
    </a-page-header>
    <div class="create-appointment__form">
      <form-appointment-data @confirm="sendForm" />
    </div>
  </div>
</template>

<script>
import FormAppointmentData from "@/components/appointment/forms/FormAppointmentData";
import { mapActions } from "vuex";

export default {
  name: "PageCreateAppointment",
  components: {
    FormAppointmentData
  },
  methods: {
    ...mapActions("appointments", ["addAppointment"]),
    async sendForm({ title, description, fullDate }) {
      try {
        await this.addAppointment({
          title,
          description,
          dateTimestamp: fullDate.valueOf()
        });

        await this.$notification.success({
          message: "Appointment has been created successfully"
        });

        await this.$router.push({ name: "PageHome" });
      } catch (e) {
        this.$notification.warning({
          message: "Cannot create appointment"
        });
      }
    }
  }
};
</script>

<style lang="scss">
.create-appointment {
  &__form {
    margin: 30px 0;
    max-width: 495px;
  }
}
</style>
