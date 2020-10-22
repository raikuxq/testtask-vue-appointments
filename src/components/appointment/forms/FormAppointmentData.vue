<template>
  <a-form layout="vertical" @submit.prevent="confirm">
    <!--  Datetime  -->
    <a-form-item label="Date and time">
      <div class="form-appointment-data__datetime">
        <div class="form-appointment-data__datetime-date">
          <a-date-picker v-model="date" format="DD MMMM YYYY" />
        </div>
        <div class="form-appointment-data__datetime-time">
          <a-time-picker v-model="time" use12-hours format="hh:mm a" />
        </div>
      </div>
    </a-form-item>

    <!--  Title  -->
    <a-form-item label="Title">
      <a-input
        v-model.trim="title"
        placeholder="Enter appointment title"
        allow-clear
      />
    </a-form-item>

    <!--  Description  -->
    <a-form-item label="Description">
      <a-textarea
        v-model.trim="description"
        allow-clear
        placeholder="Enter appointment description"
        :rows="5"
      />
    </a-form-item>

    <!--  Button  -->
    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        icon="check"
        :disabled="!isFormValid"
      >
        Confirm
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script>
import moment from "moment";
import { mapActions } from "vuex";

export default {
  name: "form-appointment-data",
  props: {
    currentTitle: {
      type: String,
      required: false,
      default: ""
    },
    currentDescription: {
      type: String,
      required: false,
      default: ""
    },
    currentDateTimestamp: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data() {
    return {
      title: "",
      description: "",
      date: null,
      time: null
    };
  },
  created() {
    const defaultDate = moment()
      .add(1, "days")
      .startOf("day")
      .unix();
    this.date = this.time = this.currentDateTimestamp
      ? moment(this.currentDateTimestamp)
      : moment.unix(defaultDate);
    this.description = this.currentDescription || "";
    this.title = this.currentTitle || "";
  },
  computed: {
    isFormValid() {
      return this.isTitleValid && this.isDateTimeValid;
    },
    isTitleValid() {
      return this.title.length > 0;
    },
    isDateTimeValid() {
      return this.fullDate.valueOf() > Date.now();
    },
    fullDate() {
      const { date, time } = this;

      const year = date.year();
      const month = date.month();
      const day = date.date();
      const hours = time.hours();
      const minutes = time.minutes();

      return new Date(year, month, day, hours, minutes);
    }
  },
  methods: {
    ...mapActions("appointments", ["addAppointment"]),

    confirm() {
      const { title, description, fullDate } = this;

      this.$emit("confirm", {
        title,
        description,
        fullDate
      });
    }
  }
};
</script>

<style lang="scss">
.form-appointment-data {
  &__datetime {
    display: flex;
    justify-content: space-between;

    &-date {
      flex-basis: 65%;
      margin-right: 12px;
    }

    &-time {
      flex-basis: 35%;
    }

    .ant-calendar-picker,
    .ant-time-picker {
      width: 100%;
    }
  }
}
</style>
