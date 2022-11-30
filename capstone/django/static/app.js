const app = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            message: 'hello world',

            currentUser: {},
            csrfToken: '',
            userData: [],
            newUser: {
                "user_first_name" : "",
                "user_last_name": "",
                "user_age": "",
            }
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
        createUser() {
            
            axios({
                method: 'post',
                url: '/api/v1/sleep_app/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                },
                data: {
                    "user_first_name" : this.newUser.user_first_name,
                    "user_last_name": this.newUser.user_last_name,
                    "user_age": this.newUser.user_age,
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
                this.currentUser = response.data
            })
        }

    },
    created: function() {
        this.loadUserData()
        // this.loadCurrentUser()
    },
    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
      
       
    }
})