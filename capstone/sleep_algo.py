# Sleep Score Calculation
# Sleep Score will be determined from 5 factors: 
# HOURS of sleep - (1) Last Night (2) Night Before (3) 3 Nights Before
# Users Estimated HOURS of Sleep
# Age

# Weighted Average
# Sleep Last Night (X1) > Sleep 2 Nights Before (X2) > Sleep 3 Nights Before (X3) > Age (X4) > User Estimated/Average Hours (X5)

'''
Score for Hours of Sleep by Age Group (Age Score):

    Young Adult: 18-25 (Score: 5)
    0-4 Hours: 1
    4-6 Hours: 2
    7-9 Hours: 4
    9+ Hours: 5

    Adult: 26-40 (Score 4)
    0-4 Hours: 1
    4-6 Hours: 2
    7+ Hours: 5

    Middle-Aged: 40-60 (Score 3)
    0-4 Hours: 1
    4-6 Hours: 3
    7+ Hours: 5

    Older Adult: 60+ (Score 2)
    0-4 Hours: 1
    4-6 Hours: 3
    7-9 Hours: 4
    9+ Hours: 5

Score for User Estimated Average Hours of Sleep & Calculated Average After 3 Data Points:

    0-4 Hours: 1
    4-6 Hours: 2
    6-8 Hours: 4
    8+ Hours: 5

Weighted Averages:

If first entry or <3 data points, 
W1: .5
W2: 0
W3: 0
W4: NA
W5: .2

If 3 or more data points, 
W1: .4
W2: .3
W3: .2
W4: NA
W5: .1
'''

sleeplastnight = 10
sleeptwonights = 9
sleepthreenights = 8
age = 23
averagehours = 10
weight_x1 = 0.35
weight_x2 = 0.25
weight_x3 = 0.20
weight_x5 = 0.20

def sleep_hour_points(age, hours):
    if hours in range (0,5):
        return 1
    elif hours >= 9:
        return 5
    elif age in range (18, 26):
        if hours in range (5,7):
            return 2
        elif hours in range (7,9):
            return 4
    elif age in range (26, 40):
        if hours in range (5,7):
            return 2
        else:
            return 5
    elif age in range (40, 61):
        if hours in range (5, 7):
            return 3
        else:
            return 5
    elif age > 61:
        if hours in range (5,7):
            return 3
        elif hours in range (7, 9):
            return 4
        else:
            return 5

sleep_history = []
userbase = {
    "user1" : {
        "username" : "nrollo",
        "first_name" : "Nick", 
        "last_name" : "Rollolazo", 
        "age" : 21,
        "average_sleep_hours" : 6,
        "sleep_history" : [9, 9, 9],
    }
}

user_sleep_history = userbase["user1"].get("sleep_history")
user_age = userbase["user1"].get("age")
print(user_age)
print(user_sleep_history[-3])

def average(lst):
    return sum(lst) / len(lst)
sleep_avg = int(average(user_sleep_history))
print(sleep_avg)

sleep_score_x1 = sleep_hour_points(user_age, user_sleep_history[-1])
sleep_score_x2 = sleep_hour_points(user_age, user_sleep_history[-2])
sleep_score_x3 = sleep_hour_points(user_age, user_sleep_history[-3])
sleep_avg_x5 = sleep_hour_points(user_age, sleep_avg)
print(sleep_score_x1, "1st night")
print(sleep_score_x2, "2nd night")
print(sleep_score_x3, "3rd night")
print(sleep_avg_x5, "avg")

total_sleep_score = ((sleep_score_x1 * weight_x1) + (sleep_score_x2 * weight_x2) + (sleep_score_x3 * weight_x3) + (sleep_avg * weight_x5))

def score_group(score):
    if score <= 1.6:
        return("Very Bad")
    elif score >= 1.6 and score <= 2.44:
        return("Bad")
    elif score >= 2.44 and score <= 3.28:
        return("Neutral")
    elif score >= 3.28 and score <= 4.12:
        return("Good")
    else:
        return("Very Good")
print(total_sleep_score)
print(score_group(total_sleep_score))
