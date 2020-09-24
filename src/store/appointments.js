import Vue from "vue";

/**
 * @typedef Appointment
 * @property {String} id
 * @property {Number} dateTimestamp
 * @property {String} title
 * @property {String} description
 * @property {String} status
 */

export const APPOINTMENT_STATUS = {
  UNCOMPLETED: "UNCOMPLETED",
  COMPLETED: "COMPLETED"
};

export default {
  namespaced: true,

  state: {
    /** @type Array.<Appointment> */
    appointments: [],
    /** @type String */
    activeType: APPOINTMENT_STATUS.UNCOMPLETED
  },

  getters: {
    /**
     * Filtered appointments
     * @param state
     * @returns {*}
     */
    getFilteredAppointments(state) {
      return state.appointments
        .filter(appointment => {
          return appointment.status === state.activeType;
        })
        .sort((a, b) => {
          if (a.dateTimestamp > b.dateTimestamp) {
            return 1;
          } else {
            return -1;
          }
        });
    },

    /**
     * All filter options
     */
    getFilterOptions() {
      return [
        {
          text: "Uncompleted",
          value: APPOINTMENT_STATUS.UNCOMPLETED
        },
        {
          text: "Completed",
          value: APPOINTMENT_STATUS.COMPLETED
        }
      ];
    }
  },

  actions: {
    /**
     * Create new appointment
     * @param commit
     * @param appointment (title, description, dateTimestamp)
     */
    addAppointment({ commit }, appointment) {
      const generatedId = Date.now().toString(16);
      const defaultStatus = APPOINTMENT_STATUS.UNCOMPLETED;

      commit("ADD_APPOINTMENT", {
        id: generatedId,
        status: defaultStatus,
        ...appointment
      });
    },

    /**
     * Update appointment by ID
     * @param commit
     * @param {String} id
     * @param data (title, description, dateTimestamp)
     */
    updateAppointmentById({ commit }, { id, data }) {
      commit("UPDATE_APPOINTMENT_DATA_BY_ID", {
        id,
        ...data
      });
    },

    /**
     * Delete appointment by ID
     * @param commit
     * @param {String} id
     */
    deleteAppointmentById({ commit }, id) {
      commit("DELETE_APPOINTMENT_BY_ID", id);
    },

    /**
     * Set appointment complete status to completed by ID
     * @param commit
     * @param {String} id
     */
    completeAppointmentById({ commit }, id) {
      commit("UPDATE_APPOINTMENT_DATA_BY_ID", {
        id: id,
        status: APPOINTMENT_STATUS.COMPLETED
      });
    },

    /**
     * Set appointment complete status to uncompleted by ID
     * @param commit
     * @param {String} id
     */
    unCompleteAppointmentById({ commit }, id) {
      commit("UPDATE_APPOINTMENT_DATA_BY_ID", {
        id: id,
        status: APPOINTMENT_STATUS.UNCOMPLETED
      });
    },

    /**
     * Set active filter type
     * @param commit
     * @param {String} type
     */
    setActiveFilterType({ commit }, type) {
      commit("SET_ACTIVE_TYPE", type);
    }
  },

  mutations: {
    /**
     * @param state
     * @param payload
     * @constructor
     */
    ADD_APPOINTMENT(state, payload) {
      state.appointments.push(payload);
    },

    /**
     * @param state
     * @param id
     * @param title
     * @param description
     * @param dateTimestamp
     * @param status
     * @constructor
     */
    UPDATE_APPOINTMENT_DATA_BY_ID(
      state,
      { id, title, description, dateTimestamp, status }
    ) {
      const appointmentToUpdate = state.appointments.find(
        appointment => appointment.id === id
      );

      if (status) {
        Vue.set(appointmentToUpdate, "status", status);
      }
      if (title) {
        Vue.set(appointmentToUpdate, "title", title);
      }
      if (description) {
        Vue.set(appointmentToUpdate, "description", description);
      }
      if (dateTimestamp) {
        Vue.set(appointmentToUpdate, "dateTimestamp", dateTimestamp);
      }
    },

    /**
     * @param state
     * @param id
     * @constructor
     */
    DELETE_APPOINTMENT_BY_ID(state, id) {
      const appointmentToDeleteIndex = state.appointments.findIndex(
        appointment => appointment.id === id
      );

      Vue.delete(state.appointments, appointmentToDeleteIndex);
    },

    /**
     *
     * @param state
     * @param payload
     * @constructor
     */
    SET_ACTIVE_TYPE(state, payload) {
      state.activeType = payload;
    }
  }
};
