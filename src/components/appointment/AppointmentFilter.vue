 <template>
  <div class="appointment-filter">
    <a-select
      :default-value="activeType"
      placeholder="Select type"
      @change="updateFilter"
      class="appointment-filter-select"
    >
      <a-select-option
        v-for="opt in getFilterOptions"
        :value="opt.value"
        :key="opt.value"
      >
        {{ opt.text }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

export default {
  name: "AppointmentFilter",
  computed: {
    ...mapState("appointments", ["activeType"]),
    ...mapGetters("appointments", ["getFilterOptions"])
  },
  methods: {
    ...mapActions("appointments", ["setActiveFilterType"]),
    updateFilter(type) {
      this.setActiveFilterType(type);
    }
  }
};
</script>

<style lang="scss">
.appointment-filter-select {
  min-width: 160px;
}
</style>