<template>
    <div class="top">
        <h1>スタッフ一覧</h1>
        <v-container grid-list-xs>
            <v-row>
                <v-col md="2" v-for="(staff, istaff) in staffs" :key="staff.id">
                    <v-hover>
                        <template v-slot="{ hover }">
                            <v-card
                                class="staff_card"
                                :class="`elevation-${hover ? 9 : 3}`"
                                @click="editReady(istaff)"
                            >
                                <div class="pa-4">
                                    <img src="/img/staff.svg" />
                                </div>
                                <v-divider></v-divider>
                                <div class="pa-3">{{ staff.name }}</div>
                            </v-card>
                        </template>
                    </v-hover>
                </v-col>
                <v-col md="2">
                    <v-row class="fill-height" justify="center" align="center">
                        <v-btn
                            dark
                            fab
                            large
                            color="primary"
                            @click="isOpenAddStaffDialog = true"
                        >
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="isOpenAddStaffDialog" max-width="500">
            <v-card>
                <v-card-title primary-title>
                    新規スタッフ登録
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col md="4">
                            <v-row
                                class="fill-height"
                                justify="left"
                                align="center"
                            >
                                <img src="/img/staff.svg" alt="" width="100%" />
                            </v-row>
                        </v-col>
                        <v-col md="8">
                            <el-form
                                ref="form"
                                :model="form"
                                label-width="3rem"
                            >
                                <el-form-item label="名前">
                                    <el-input
                                        v-model="form.staff.name"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="年齢">
                                    <el-input-number
                                        v-model="form.staff.age"
                                        :min="20"
                                        :max="99"
                                    ></el-input-number>
                                    <span class="ml-2">歳</span>
                                </el-form-item>
                            </el-form>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-row class="pa-2" justify="center">
                        <v-btn color="error" @click="reset">キャンセル</v-btn>
                        <v-btn color="primary" @click="regist">登録</v-btn>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="isOpenEditStaffDialog" max-width="500">
            <v-card>
                <v-card-title primary-title>
                    {{currentEditStaff.name}}
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col md="4">
                            <v-row
                                class="fill-height"
                                justify="left"
                                align="center"
                            >
                                <img src="/img/staff.svg" alt="" width="100%" />
                            </v-row>
                        </v-col>
                        <v-col md="8">
                            <el-form
                                ref="form"
                                label-width="3rem"
                            >
                                <el-form-item label="名前">
                                    <el-input
                                        v-model="currentEditStaff.name"
                                    ></el-input>
                                </el-form-item>
                                <el-form-item label="年齢">
                                    <el-input-number
                                        v-model="currentEditStaff.age"
                                        :min="20"
                                        :max="99"
                                    ></el-input-number>
                                    <span class="ml-2">歳</span>
                                </el-form-item>
                            </el-form>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-row class="pa-2" justify="center">
                        <v-btn color="error" @click="remove">スタッフ削除</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="error" @click="editReset">キャンセル</v-btn>
                        <v-btn color="primary" @click="update">更新</v-btn>
                    </v-row>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </div>
</template>

<script>
import { StaffInitialDataProvider } from '~/servant/StaffInitialDataProvider'
import { EditStaffInitialDataProvider } from '~/servant/EditStaffInitialDataProvider'
import staffsGql from '~/apollo/queries/staffs'
import createStaffGql from '~/apollo/mutations/createStaff'
import updateStaffProfileGql from '~/apollo/mutations/updateStaffProfile'
import deleteStaffGql from '~/apollo/mutations/deleteStaff'

export default {
    middleware: 'authenticated',
    data() {
        const sidp = new StaffInitialDataProvider.Summon()
        const esidp = new EditStaffInitialDataProvider.Summon()

        return {
            isOpenAddStaffDialog: false,
            isOpenEditStaffDialog: false,
            currentEditStaff: esidp.serveData(),
            staffs: [],
            form: {
                staff: sidp.serveData(),
            },
        }
    },
    apollo: {
        staffs: {
            query: staffsGql,
        },
    },
    methods: {
        reset() {
            const sidp = new StaffInitialDataProvider.Summon()
            this.form.staff = sidp.serveData()
            this.isOpenAddStaffDialog = false
        },
        regist() {
            this.$apollo.mutate({
                mutation: createStaffGql,
                variables: {
                    authToken: this.$store.state.auth,
                    name: this.form.staff.name,
                    age: this.form.staff.age,
                },
                refetchQueries: [
                    {
                        query: staffsGql,
                    },
                ],
            })
            this.reset()
        },
        editReset(){
            const esidp = new EditStaffInitialDataProvider.Summon()
            this.currentEditStaff = esidp.serveData()
            this.isOpenEditStaffDialog = false
        },
        editReady(istaff){
            this.currentEditStaff = {
                istaff,
                name: this.staffs[istaff].name,
                age: this.staffs[istaff].age,
            }
            this.isOpenEditStaffDialog = true
        },
        update(){
            this.staffs[this.currentEditStaff.istaff].name = this.currentEditStaff.name
            this.staffs[this.currentEditStaff.istaff].age = this.currentEditStaff.age

            this.$apollo.mutate({
                mutation: updateStaffProfileGql,
                variables: {
                    authToken: this.$store.state.auth,
                    id: this.staffs[this.currentEditStaff.istaff].id,
                    name: this.currentEditStaff.name,
                    age: this.currentEditStaff.age,
                },
                refetchQueries: [
                    {
                        query: staffsGql,
                    },
                ],
            })

            this.editReset()
        },
        remove(){
            this.$apollo.mutate({
                mutation: deleteStaffGql,
                variables: {
                    authToken: this.$store.state.auth,
                    id: this.staffs[this.currentEditStaff.istaff].id,
                },
                refetchQueries: [
                    {
                        query: staffsGql,
                    },
                ],
            })

            this.editReset()
        }
    },
    computed: {},
}
</script>

<style lang="stylus" scoped>
.top
    .staff_card
        cursor pointer
</style>
