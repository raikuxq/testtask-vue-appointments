<template>
  <div class="appointment-container">
    <a-list
      :grid="getListGrid"
      :data-source="getFilteredAppointments"
      :pagination="paginationConfig"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <appointment-card
          :id="item.id"
          :title="item.title"
          :description="item.description"
          :date-timestamp="item.dateTimestamp"
          :is-completed="isItemComplete(item.status)"
          :is-expired="isItemExpired(item.dateTimestamp)"
          @action-update="goToUpdate(item.id)"
          @action-delete="confirmDelete(item.id)"
          @action-complete="confirmComplete(item.id)"
          @action-undo="confirmUndo(item.id)"
        />
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import AppointmentCard from "@/components/appointment/AppointmentCard";
import { APPOINTMENT_STATUS } from "@/store/appointments";

export default {
  name: "AppointmentContainer",
  components: {
    AppointmentCard
  },
  data() {
    return {
      CURRENT_TIMESTAMP: Date.now()
    };
  },
  computed: {
    ...mapGetters("appointments", ["getFilteredAppointments"]),
    getListGrid() {
      return { gutter: 16, xs: 1, lg: 2 };
    },
    paginationConfig() {
      return {
        pageSize: 6
      };
    }
  },
  methods: {
    ...mapActions("appointments", [
      "completeAppointmentById",
      "unCompleteAppointmentById",
      "deleteAppointmentById"
    ]),

    isItemComplete(status) {
      return status === APPOINTMENT_STATUS.COMPLETED;
    },

    isItemExpired(timestamp) {
      return timestamp < this.CURRENT_TIMESTAMP;
    },

    goToUpdate(id) {
      this.$router.push({ name: "PageUpdateAppointment", params: { id } });
    },

    /**
     * Delete status action
     * @param id - appointment ID
     */
    confirmDelete(id) {
      this.$confirm({
        icon: "delete",
        title: "Do you want to delete this appointment?",
        okType: "Danger",
        onOk: () =>
          new Promise((resolve, reject) => {
            try {
              this.deleteAppointmentById(id).then(() => {
                this.$notification.success({
                  message: "Appointment has been deleted successfully"
                });
                resolve();
              });
            } catch {
              this.$notification.warning({
                message: "Cannot delete this appointment"
              });
              reject();
            }
          })
      });
    },

    /**
     * Confirm status action
     * @param id - appointment ID
     */
    confirmComplete(id) {
      this.$confirm({
        icon: "check",
        title: "Do you want to complete this appointment?",
        onOk: () =>
          new Promise((resolve, reject) => {
            try {
              this.completeAppointmentById(id).then(() => {
                this.$notification.success({
                  message: "Appointment status has been changed successfully"
                });
                resolve();
              });
            } catch (e) {
              this.$notification.warning({
                message: "Cannot change status for this appointment"
              });
              reject(e);
            }
          })
      });
    },

    /**
     * Undo status action
     * @param id - appointment ID
     */
    confirmUndo(id) {
      this.$confirm({
        icon: "check",
        title: "Do you want to undo status this appointment?",
        onOk: () =>
          new Promise((resolve, reject) => {
            try {
              this.unCompleteAppointmentById(id).then(() => {
                this.$notification.success({
                  message: "Appointment status has been changed successfully"
                });
                resolve();
              });
            } catch (e) {
              this.$notification.warning({
                message: "Cannot change status for this appointment"
              });
              reject(e);
            }
          })
      });
    }
  }
};
</script>

<style lang="scss">
@import "~@/assets/styles/utils/grid.scss";
@import "~@/assets/styles/variables/variables.scss";

$gap: 16px;

.appointment-container {
  .ant-row {
    @include gridContainer($gap);
  }
  .ant-col {
    @media (min-width: $screen-md-min) {
      @include gridItem(2, $gap);
    }
    @media (max-width: $screen-md) {
      @include gridItem(1, $gap);
    }
    .ant-list-item {
      height: 100%;
    }
  }
}
</style>
