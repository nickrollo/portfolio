const app = Vue.createApp({
    delimiters: ['[[', ']]'],
    data(){
        return{
            csrfToken: '',
            currentUser: {},
            sleepLog: [], 
            averageHours: '',
            sleepX1: '',
            sleepX2: '',
            sleepX3: '',
            sleepX5: '',
            userAge: '',
            userGender: '',
            chartDates: [],
            chartHours: [],
            userSleepScore: '',
            userMemoji: '',
            userMood: '',
            textChest: [],
            currentTextIndex: 0,
            moodText: 'Let\'s learn some things...',
            moodSource:'',
            userSleepData: {
                "user_id": null,
                "sleep_hours": null,
                "date": null,
            },
            words: ["MIND", "BODY", "SOUL", "EMOTIONS", "FRIENDS", "FAMILY", "DRIVING", "WORK", "MOOD", "TASTE", "HEALTH"],
            word: 'MOOD',
            index: 0,
            sentence: "",
        }
    },

    mounted(){
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
        this.loadCurrentUser()
        

        setTimeout(() => {
            this.weightedSleepScore(this.sleepX1, this.sleepX2, this.sleepX3, this.sleepX5);
            this.createChart()
            this.loadTextChest()
            setInterval(this.showNextQuote, 6500);
          }, 2000);
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
        newWord(){
            setInterval(() => {
                // Update the input field with the current word
                this.word = this.words[this.index];
                this.index++;
                if (this.index >= this.words.length) {
                  setTimeout(() => {
                    this.index = 0;
                  }, 1000);
                }
              }, 1250);
        },
        arrangeSleepData(){
            this.sleepLog.sort((a, b) => {
                const dateA = new Date(a.date);
                const dateB = new Date(b.date);
                if (dateB < dateA) {
                  return -1;
                }
                else if (dateB > dateA) {
                  return 1;
                }
                else {
                  return 0;
                }
            });
        },
        createChart(){
            this.sleepLog.forEach(dataPoint => {
                this.chartDates.push(dataPoint.date);
                this.chartHours.push(dataPoint.sleep_hours);
            });
            console.log('5CD', this.chartDates);
            console.log('6CH', this.chartHours);
            const ctx = document.getElementById('myChart');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.chartDates.reverse(),
                    datasets: [{
                        label: 'Hours of Sleep',
                        data: this.chartHours.reverse(),
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
        },
        sleepScore(hours, age){
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
        calculateSleepScore(){
            this.averageHours = (this.sleepLog[0].sleep_hours + this.sleepLog[1].sleep_hours + this.sleepLog[2].sleep_hours) / 3;
            this.sleepX1 = this.sleepScore(this.sleepLog[0].sleep_hours, this.userAge);
            this.sleepX2 = this.sleepScore(this.sleepLog[1].sleep_hours, this.userAge);
            this.sleepX3 = this.sleepScore(this.sleepLog[2].sleep_hours, this.userAge);
            this.sleepX5 = this.sleepScore(this.averageHours, this.userAge);
            console.log('7x1', this.sleepX1);
            console.log('8x5', this.sleepX5);
        },
        weightedSleepScore(scorex1, scorex2, scorex3, scorex5) {
            const weightx1 = 0.35;
            const weightx2 = 0.25;
            const weightx3 = 0.2;
            const weightx5 = 0.2;
            
            this.userSleepScore = ((scorex1 * weightx1) + (scorex2 * weightx2) + (scorex3 * weightx3) + (scorex5 * weightx5));
            console.log('9USS', this.userSleepScore);
        },
        memojiOutput(male, totalSleepScore) {
            if (male === true) {
                if (totalSleepScore < 1.6) {
                    return ['https://media0.giphy.com/media/wE19ivfoD5fTHXemFu/giphy.gif', '0']
                }
                else if (totalSleepScore >= 1.6 && totalSleepScore < 2.44) {
                    return ['https://media1.giphy.com/media/H8cRORkJRICBfBUb6N/giphy.gif', '1']
                }
                else if (totalSleepScore >= 2.44 && totalSleepScore < 3.28) {
                    return ['https://media3.giphy.com/media/dQgl5JyyjHxABAqrWR/giphy.gif', '2']
                }
                else if (totalSleepScore >= 3.28 && totalSleepScore < 4.12) {
                    return ['https://media0.giphy.com/media/OCKPmZoJZSrQ9OW9GC/giphy.gif', '3']
                }
                else {
                    return ['https://media4.giphy.com/media/5mBCYxJ7PHidsZVRkf/giphy.gif', '4']
                }
            }
            else {
                if (totalSleepScore < 1.6) {
                    return ['https://media3.giphy.com/media/57AUZG8ZLvWkrzQYBh/giphy.gif', '0']
                }
                else if (totalSleepScore >= 1.6 && totalSleepScore < 2.44) {
                    return ['https://media1.giphy.com/media/7Vlz6G2Cqtvz3Z7KWB/giphy.gif', '1']
                }
                else if (totalSleepScore >= 2.44 && totalSleepScore < 3.28) {
                    return ['https://media2.giphy.com/media/Ja0CpU6AQzukz0xb6J/giphy.gif', '2']
                }
                else if (totalSleepScore >= 3.28 && totalSleepScore < 4.12) {
                    return ['https://media1.giphy.com/media/e34oyThs8eSqTlKus3/giphy.gif?cid=790b7611db0e8bf0a5bbbf2b6311c4cbaa63d59085c5acb6&rid=giphy.gif&ct=g', '3']
                }
                else {
                    return ['https://media2.giphy.com/media/576yXG0R6Lq94hwrdF/giphy.gif', '4']
                }
            }
        },
        loadCurrentUser(){
            axios({
                method: 'get',
                url: '/users/currentuser/'
            }).then(response => {
                this.currentUser = response.data;
                this.userAge = response.data.user_age;
                this.userGender = response.data.user_sex;
                this.sleepLog = response.data.sleeps;
                this.arrangeSleepData();
                console.log('1CU', this.currentUser);
                console.log('2gender', this.userGender);
                console.log('3sleep log', this.sleepLog);
                console.log('4age', this.userAge);
                this.calculateSleepScore();
                this.weightedSleepScore(this.sleepX1, this.sleepX2, this.sleepX3, this.sleepX5);
                this.userMemoji = this.memojiOutput(this.userGender, this.userSleepScore)[0]; 
                this.userMood = this.memojiOutput(this.userGender, this.userSleepScore)[1]; 
                console.log('10memoji', this.userMemoji);
                console.log('11mood', this.userMood);
            }) 
        },
        loadTextChest(){
            axios({
                method: 'get',
                url: 'api/v1/moods/'
            }).then(response => {
                this.textChest = response.data[this.userMood].quotes;
                console.log('mood', response.data);
                console.log('12', this.textChest);
                }
            )
        },
        showNextQuote() {
            if (this.currentTextIndex >= this.textChest.length - 1) {
              this.currentTextIndex = 0;
            } else {
              this.currentTextIndex++;
            }
            this.moodText = this.textChest[this.currentTextIndex].text;
            this.moodSource = this.textChest[this.currentTextIndex].source;
        },
        uploadSleepData(){
            axios({
                method: 'post',
                url: '/api/v1/sleeps/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                },
                data: {
                    "user_id": this.currentUser.id,
                    "sleep_hours": this.userSleepData.sleep_hours,
                    "date": this.userSleepData.date,
                }
            }).then( response => {
                console.log(response.data)
                window.location.href = '/';
            }).catch(error => {
                console.log(error.response)
            })
        },
        deleteSleepRecord(id) {
            axios({
                method: 'delete',
                url: `/api/v1/sleeps/${id}/`,
                headers: {
                    'X-CSRFToken': this.csrfToken
                }
            }).then(response => {
                // Remove the deleted sleep record from the sleepLog array
                window.location.href = '/account/';
                this.sleepLogDeleted = true;
            }).catch(error => {
                console.log(error.response);
            });
        },
    },
        created: function() {
            this.newWord(),
            setTimeout(function() {
                document.getElementById('loadingSpinner').style.display = 'none';
                document.getElementById('mainElement').style.display = 'block';
              }, 3000);
        }
})