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
            userMemoji: "",
            mood: {},
            quote: "",
            quotes: [],
            currentQuoteIndex: 0,
        }
    },

    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
        this.loadCurrentUser()
        this.loadQuote()
        this.getQuotes();
        setInterval(this.showNextQuote, 5000);
        // this.sleepScore()

    },

    // watch: {
    //     userDates: {
    //         handler: function() {
    //             if (this.userDates.length >= 3) {
    //                 this.sleepScore()
    //             } 
    //         },
    //         deep: true
    //     }
    // },

    methods: {
        loadQuote(){
            axios({
                method: 'get',
                url: 'api/v1/quotes/'
            }).then(response => {
                this.mood = response.data
                console.log(response.data)
                const randomIndex = Math.floor(Math.random() * response.data.length);
                this.quote = response.data[randomIndex].text;
                console.log(this.quote)
                }
            )
        },
        showNextQuote() {
            // If the current quote index is at the end of the array, reset the index to 0
            if (this.currentQuoteIndex >= this.quotes.length - 1) {
              this.currentQuoteIndex = 0;
            } else {
              // Otherwise, increment the current quote index
              this.currentQuoteIndex++;
            }
      
            // Update the quote data property with the quote at the current index
            this.quote = this.quotes[this.currentQuoteIndex].text;
        },
        uploadSleepData(){
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
                        labels: this.userDates.reverse(),
                        datasets: [{
                        label: 'Hours of Sleep',
                        data: this.userHours.reverse(),
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
                let sleepScorex1 = this.sleepScore(this.userHours.reverse()[0], this.currentUser.user_age)
                let sleepScorex2 = this.sleepScore(this.userHours.reverse()[1], this.currentUser.user_age)
                let sleepScorex3 = this.sleepScore(this.userHours.reverse()[2], this.currentUser.user_age)
                console.log(sleepScorex1)
                console.log(sleepScorex2)
                console.log(sleepScorex3)
                let sleepAverage = (this.userHours.reverse()[0] + this.userHours.reverse()[1] + this.userHours.reverse()[2])/3
                let sleepAveragex5 = this.sleepScore(sleepAverage, this.currentUser.user_age)
                console.log(sleepAveragex5)
                console.log(sleepAverage)
                let userSleepScore = this.scoreGroup(sleepScorex1, sleepScorex2, sleepScorex3, sleepAveragex5, this.currentUser.user_sex)
                this.userMemoji = userSleepScore
                // this.loadQuote()
            })
        },
        sleepScore(hours, age){
            console.log('sleepscore', this.currentUser.user_age)
            if (hours >= 0 && hours < 5) {
                return 1
            }
            else if (hours >= 9) {
                return 5
            }
            else if (age >=18 && age <26) {
                if (hours >= 5 && hours < 7) {
                    return 2
                }
                else if (hours >= 7 && hours < 9) {
                    return 4
                }
            }
            else if (age >=26 && age <40) {
                if (hours >= 5 && hours < 7) {
                    return 2
                }
                else {
                    return 5
                }
            }
            else if (age >=40 && age <61) {
                if (hours >= 5 && hours < 7) {
                    return 3
                }
                else {
                    return 5
                }
            }
            else if (age >= 61) {
                if (hours >= 5 && hours < 7) {
                    return 3
                }
                else if (hours >= 7 && hours < 9) {
                    return 4
                }
                else {
                    return 5
                }
            }
            
        }, 
        scoreGroup(scorex1, scorex2, scorex3, scorex5, male) {
            const weightx1 = 0.35
            const weightx2 = 0.35
            const weightx3 = 0.35
            const weightx5 = 0.35

            let totalSleepScore = ((scorex1 * weightx1) + (scorex2 * weightx2) + (scorex3 * weightx3) + (scorex5 * weightx5))

            if (male === false) {
                if (totalSleepScore < 1.6) {
                    return ('https://media0.giphy.com/media/wE19ivfoD5fTHXemFu/giphy.gif')
                }
                else if (totalSleepScore >= 1.6 && totalSleepScore < 2.44) {
                    return ('https://media1.giphy.com/media/H8cRORkJRICBfBUb6N/giphy.gif')
                }
                else if (totalSleepScore >= 1.6 && totalSleepScore < 2.44) {
                    return ('https://media3.giphy.com/media/dQgl5JyyjHxABAqrWR/giphy.gif')
                }
                else if (totalSleepScore >= 1.6 && totalSleepScore < 2.44) {
                    return ('https://media0.giphy.com/media/OCKPmZoJZSrQ9OW9GC/giphy.gif')
                }
                else {
                    return ('https://media4.giphy.com/media/5mBCYxJ7PHidsZVRkf/giphy.gif')
                }
            }
            else {
                if (totalSleepScore < 1.6) {
                    return ('https://media3.giphy.com/media/57AUZG8ZLvWkrzQYBh/giphy.gif')
                }
                else if (totalSleepScore >= 1.6 && totalSleepScore < 2.44) {
                    return ('https://media1.giphy.com/media/7Vlz6G2Cqtvz3Z7KWB/giphy.gif')
                }
                else if (totalSleepScore >= 1.6 && totalSleepScore < 2.44) {
                    return ('https://media2.giphy.com/media/Ja0CpU6AQzukz0xb6J/giphy.gif')
                }
                else if (totalSleepScore >= 1.6 && totalSleepScore < 2.44) {
                    return ('https://media1.giphy.com/media/e34oyThs8eSqTlKus3/giphy.gif?cid=790b7611db0e8bf0a5bbbf2b6311c4cbaa63d59085c5acb6&rid=giphy.gif&ct=g')
                }
                else {
                    return ('https://media2.giphy.com/media/576yXG0R6Lq94hwrdF/giphy.gif')
                }
            }
        }
    }
})

    // created: function() {
    //     // this.loadUserData()
        
    // }