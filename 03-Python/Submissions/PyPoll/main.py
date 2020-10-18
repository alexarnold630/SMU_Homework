import os
import csv

csvpath = r"Resources/election_data.csv"
print(csvpath)

#inita total votes
totalVotes = 0

candidateDict = {}

with open(csvpath) as csvfile:
    csvreader = csv.reader(csvfile, delimiter=",")

    #Read header row first
    csv_header = next(csvreader)
    print(f"CSV Header: {csv_header}")

    for row in csvreader:
        #print(row)
        totalVotes = totalVotes + 1

        candidate = row[2]
        if row[2] in candidateDict.keys():
            candidateDict[candidate] +=1
        else:
            candidateDict[candidate]= 1

        
print(totalVotes)

print(candidateDict)

#THIS WORKS ONLY FOR KHAN
# percent_votes = candidateDict['Khan']/totalVotes
# print(percent_votes)

# loop to find percents for every candidate
percentDict = {}
for key in candidateDict.keys():
    percent = candidateDict[key]/totalVotes
    percentDict[key] = percent
   
listOfCandidates = []
for key in percentDict.keys():
    theString = key + ": " + str(round(percentDict[key]*100, 3)) + "% (" + str(candidateDict[key]) + ")"
    listOfCandidates.append(theString)
print(listOfCandidates)

finalString = "\n".join(listOfCandidates)

#https://www.geeksforgeeks.org/python-get-key-with-maximum-value-in-dictionary/
winner = max(candidateDict, key=candidateDict.get) #taken from internet
print(winner)

summaryString = f"""Election Results
-------------------------
Total Votes: {totalVotes}
-------------------------
{finalString}
-------------------------
Winner: {winner}
"""

#write to file
with open("poll_results.txt", "w") as file1:
    file1.write(summaryString)
