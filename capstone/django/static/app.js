const app = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            currentUser: {},
            csrfToken: '',
            userData: [],
            userSleepData: {
                "username": "",
                "user_first_name": "",
                "user_last_name": "",
                "user_age": "",
            },
            userDates: [],
            userHours: [],
            // labels: '',
            // datas: '',
        }
    },
    methods: {
        loadUserData(){
            axios({
                method: 'get',
                url: 'api/v1/sleep_app/'
            }).then(response => {
                this.userData = response.data
                console.log(response.data)
                }
            )
        },
        uploadSleepData() {
            
            axios({
                method: 'post',
                url: '/api/v1/sleep_app/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                },
                data: {
                    "username": this.userSleepData.username,
                    "user_first_name": this.userSleepData.user_first_name,
                    "user_last_name": this.userSleepData.user_last_name,
                    "user_age": this.userSleepData.user_age, 
                    
                }
            }).then( response => {
                this.loadUserData()
                console.log(response.data)
            }).catch(error => {
                console.log(error.response)
             
            })

        },
        loadCurrentUser(){
            axios({
                method: 'get',
                url: '/users/currentuser/'
            }).then(response => {
                console.log('CU', response.data)
                this.currentUser = response.data,
                this.currentUser.sleep_detail.forEach(sleep => {
                    this.userHours.push(sleep.sleep_hours)
                    this.userDates.push(sleep.date)
                });
                console.log('userHours', this.userHours)
                console.log('userDates', this.userDates)
                // labels = document.getElementById('userDates').value;
                // datas = document.getElementById('userHours').value;
                const ctx = document.getElementById('myChart');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: this.userDates,
                        datasets: [{
                        label: '# of Votes',
                        data: this.userHours,
                        borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true, 
                        scales: {
                        y: {
                            beginAtZero: true
                        }
                        }
                    }
                    });
                })
            },


    },
    created: function() {
        // this.loadUserData()
        this.loadCurrentUser()
    },
    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
 
        
       
        
       
    }
})