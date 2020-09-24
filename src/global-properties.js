import Vue from "vue";

import { timeTextFormat } from "@/filters/timeTextFormat";

Vue.filter("toTextDateTime", timeTextFormat);
