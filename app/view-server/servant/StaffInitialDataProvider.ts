export module StaffInitialDataProvider {
    export class Summon {
        data: any
        constructor() {
            this.data = {
                name: '',
                age: 20,
            }
        }

        serveData(): any {
            return this.data
        }
    }
}