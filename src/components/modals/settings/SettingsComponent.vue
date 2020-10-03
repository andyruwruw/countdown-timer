<template>
  <v-card>
    <div class="d-flex">
      <div :class="$style['left-panel']">
        <div
          :class="$style['column']" 
          class="d-flex justify-space-between flex-column">
          <div>
            <p
              class="headline"
              :class="$style.title">
              Settings
            </p>
            
            <v-tabs
              v-model="tab"
              :vertical="true"
              background-color="transparent"
              class="settings-modal-tab">
              <v-tab>
                <v-icon left>mdi-account</v-icon>
                Account
              </v-tab>

              <v-tab>
                <v-icon left>mdi-format-color-fill</v-icon>
                Appearance
              </v-tab>
            </v-tabs>
          </div>

          <v-btn
            color="primary"
            :class="$style.save"
            :loading="saving"
            @click="save">
            Save
          </v-btn>
        </div>
      </div>

      <div :class="$style['right-panel']">
        <div v-if="tab === 0">
          <account-settings />
        </div>

        <div v-if="tab === 1">
          <appearance-settings @change="changeMade" />
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import AccountSettings from '@/components/modals/settings/AccountSettings.vue';
import AppearanceSettings from '@/components/modals/settings/AppearanceSettings.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Settings',
  components: {
    AccountSettings,
    AppearanceSettings,
  },
  data: () => ({
    tab: 0,
    tabs: [
      'Account',
      'Appearance',
    ],
    changes: {},
    saving: false,
  }),
  computed: {
    ...mapGetters('user', [
      'user',
    ]),
  },
  methods: {
    ...mapActions('user', [
      'changePreferences',
    ]),
    changeMade(change) {
      for (let key in change) {
        if (this.user[key] !== change[key]) {
          this.changes[key] = change[key];
        } else {
          delete this.changes[key];
        }
      }
    },
    async save() {
      this.saving = true;
      await this.changePreferences(this.changes);
      this.saving = false;
      this.$emit('close');
    },
    close() {
      this.$emit('close');
    },
  },
};
</script>

<style module>
.tab {
  padding: 5px 20px;
}

.title {
  color: black;
  padding: 0 18px;
  margin: 32px 0 18px;
}

.save {
  margin: 24px;
}

.left-panel {
  display: block;
  width: 30vw;
  max-width: 300px;
  background: rgb(236, 236, 236);
}

.left-panel .column {
  height: 100%;
}

.right-panel {
  padding: 32px;
  width: 800px;
  flex-grow: 2;
  height: 90vh;
  max-height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.right-panel::-webkit-scrollbar {
  width: 10px;
}

/* Track */
.right-panel::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.right-panel::-webkit-scrollbar-thumb {
  background: rgba(136, 136, 136, 0.322);
}

/* Handle on hover */
.right-panel::-webkit-scrollbar-thumb:hover {
  background: rgba(85, 85, 85, 0.507);
}
</style>

<style>
.v-tabs.settings-modal-tab .v-tabs-bar .v-slide-group__wrapper .v-tabs-bar__content .v-tab {
  justify-content: flex-start;
}

.v-tabs.settings-modal-tab .v-tabs-bar .v-slide-group__wrapper .v-tabs-bar__content .v-tab .v-icon {
  margin-right: 16px;
}
</style>
