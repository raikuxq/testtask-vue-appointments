<template>
  <a-card class="appointment-card" :class="getStyleModifiers">
    <a-card-meta :title="title" :description="dateTimestamp | toTextDateTime" />

    <p class="appointment-card__content">
      {{ description }}
    </p>

    <template slot="actions">
      <a-tooltip title="Undo status" v-if="isCompleted">
        <a-icon type="undo" @click="emitUndo" />
      </a-tooltip>

      <a-tooltip title="Complete" v-else>
        <a-icon type="check" @click="emitComplete" />
      </a-tooltip>

      <a-tooltip title="Edit data">
        <a-icon type="edit" @click="emitUpdate" />
      </a-tooltip>

      <a-tooltip title="Delete appointment">
        <a-icon type="delete" @click="emitDelete" />
      </a-tooltip>
    </template>
  </a-card>
</template>

<script>
export default {
  name: "AppointmentCard",
  props: {
    title: {
      type: String,
      required: true
    },
    dateTimestamp: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    isCompleted: {
      type: Boolean,
      required: true
    },
    isExpired: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    getStyleModifiers() {
      return {
        "appointment-card_is-expired": this.isExpired,
        "appointment-card_is-completed": this.isCompleted
      };
    }
  },
  methods: {
    emitUpdate() {
      this.$emit("action-update");
    },
    emitComplete() {
      this.$emit("action-complete");
    },
    emitDelete() {
      this.$emit("action-delete");
    },
    emitUndo() {
      this.$emit("action-undo");
    }
  }
};
</script>

<style lang="scss">
.appointment-card {
  display: flex;
  flex-direction: column;
  height: 100%;

  .ant-card-body {
    flex-grow: 1;
  }

  &__content {
    border-top: 1px solid #e8e8e8;
    margin: 15px 0;
    padding: 10px 0 0;
  }

  &_is-expired {
    .ant-card-meta-title,
    .ant-card-meta-description {
      color: #cf4848;
    }
  }

  &_is-completed {
    .ant-card-meta-title,
    .ant-card-meta-description {
      color: #167a16;
    }
  }
}
</style>
