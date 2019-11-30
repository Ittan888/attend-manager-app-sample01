export module EditStaffInitialDataProvider {
    export class Summon {
        data: any
        constructor() {
            this.data = {
                istaff: 0,
                name: '',
                age: 20,
            }
        }

        serveData(): any {
            return this.data
        }
    }
}