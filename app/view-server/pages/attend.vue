<template>
    <div class="attend">
        <h1>出勤管理</h1>
        <v-container>
            <v-row class="px-3 mb-5">
                <v-btn
                    v-if="!isThisWeek"
                    class="pl-3"
                    color="primary"
                    @click="isThisWeek = true"
                >
                    <v-icon small>keyboard_arrow_left</v-icon>
                    前の週
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    v-if="isThisWeek"
                    class="pr-3"
                    color="primary"
                    @click="isThisWeek = false"
                >
                    次の週
                    <v-icon small>keyboard_arrow_right</v-icon>
                </v-btn>
            </v-row>
            <v-card>
                <v-row>
                    <v-col class="pr-0" md="2">
                        <div class="pa-4">
                            <img src="/img/staff.svg" />
                        </div>
                        <v-divider></v-divider>
                        <div class="pa-3 pb-0">John Doe</div>
                    </v-col>
                    <v-divider vertical></v-divider>
                    <v-col class="pl-0 py-0">
                        <v-row class="container--fluid fill-height ml-0">
                            <v-col
                                class="px-0 py-1 attend_list"
                                v-for="(attend, iattend) in attendsSample"
                                :key="iattend"
                                v-if="iattend >= startDateIndex && iattend <= endDateIndex"
                            >
                                <div>{{attend}}</div>
                                <v-divider></v-divider>
                                <div></div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>

<script>
export default {
    middleware: 'authenticated',
    data() {
        return {
            isThisWeek: true,
            startDateIndex: 0,
            endDateIndex: 6,
            attendsSample: [
                '12/1(日)',
                '12/1(日)',
                '12/1(日)',
                '12/1(日)',
                '12/1(日)',
                '12/1(日)',
                '12/1(日)',
                '12/2(月)',
                '12/2(月)',
                '12/2(月)',
                '12/2(月)',
                '12/2(月)',
                '12/2(月)',
                '12/2(月)',
            ],
        }
    },
    methods: {},
    computed: {},
    watch: {
        isThisWeek(isThisWeek) {
            if(!isThisWeek){
                this.startDateIndex = 7
                this.endDateIndex = 13
            } else {
                this.startDateIndex = 0
                this.endDateIndex = 6
            }
        },
    },
}
</script>

<style lang="stylus" scoped>
.attend
    .attend_list
        border-right 1px solid rgba(0, 0, 0, 0.12)
        &:last-of-type, &:nth-of-type(7)
            border-right none
</style>
